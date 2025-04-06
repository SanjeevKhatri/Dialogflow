import os
import logging
from logging.handlers import RotatingFileHandler
from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import dialogflow_v2 as dialogflow
import json
from dotenv import load_dotenv
import sqlite3
from datetime import datetime

# Create logs directory if it doesn't exist
logs_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'logs')
os.makedirs(logs_dir, exist_ok=True)

# Set up logging with rotation
log_file = os.path.join(logs_dir, 'app.log')
file_handler = RotatingFileHandler(log_file, maxBytes=10*1024*1024, backupCount=5)  # 10MB per file, keep 5 backups
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))

# Configure root logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(file_handler)

# Also log to console for development
console_handler = logging.StreamHandler()
console_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
logger.addHandler(console_handler)

# Load environment variables
load_dotenv()

# Database setup
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'chat_data.db')

def init_db():
    """Initialize the database and create tables if they don't exist"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Create chat_sessions table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS chat_sessions (
        session_id TEXT PRIMARY KEY,
        created_at TEXT NOT NULL
    )
    ''')

    # Create chat_messages table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS chat_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        message TEXT NOT NULL,
        response TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (session_id) REFERENCES chat_sessions (session_id)
    )
    ''')

    conn.commit()
    conn.close()
    logging.info("Database initialized successfully")

# Load and parse the JSON string from environment variable
json_str = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_JSON")

try:
    # Verify we have valid JSON credentials
    if not json_str:
        logging.error("GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable not set")
        raise ValueError("Missing credentials")

    creds_dict = json.loads(json_str)

    # Write credentials to temp file
    with open("dialogflow_credentials.json", "w") as f:
        f.write(json_str)

    # Set Google credentials path
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./dialogflow_credentials.json"
    logging.info("Successfully loaded and set credentials")
except Exception as e:
    logging.error(f"Error loading credentials: {e}")
    raise

app = Flask(__name__)
# Configure CORS - make sure this matches your frontend domain exactly
CORS(app, origins=["https://sanjeevkhatri.com", "http://localhost:3000", "https://dialogflow-4rev.onrender.com"], supports_credentials=True)

# Dialogflow project ID
DIALOGFLOW_PROJECT_ID = "test-ikwf"  # Your project ID
DIALOGFLOW_LANGUAGE_CODE = "en"

def detect_intent_texts(session_id, text, language_code=DIALOGFLOW_LANGUAGE_CODE):
    """Returns the result of detect intent with texts as inputs."""
    try:
        session_client = dialogflow.SessionsClient()
        session_path = session_client.session_path(DIALOGFLOW_PROJECT_ID, session_id)

        # Log session path
        logging.info(f"Session path: {session_path}")

        text_input = dialogflow.TextInput(text=text, language_code=language_code)
        query_input = dialogflow.QueryInput(text=text_input)

        response = session_client.detect_intent(
            session=session_path,
            query_input=query_input
        )

        # Log Dialogflow response details
        logging.info(f"Query text: {response.query_result.query_text}")
        logging.info(f"Intent detected: {response.query_result.intent.display_name}")
        logging.info(f"Intent confidence: {response.query_result.intent_detection_confidence}")
        logging.info(f"Fulfillment text: {response.query_result.fulfillment_text}")

        return response.query_result.fulfillment_text
    except Exception as e:
        logging.error(f"Error in detect_intent_texts: {e}")
        raise

def store_chat_data(session_id, user_message, bot_response):
    """Store chat data in the database"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        timestamp = datetime.now().isoformat()

        # Check if session exists and create if it doesn't
        cursor.execute("SELECT session_id FROM chat_sessions WHERE session_id = ?", (session_id,))
        if not cursor.fetchone():
            cursor.execute("INSERT INTO chat_sessions (session_id, created_at) VALUES (?, ?)",
                          (session_id, timestamp))

        # Store the message and response
        cursor.execute("""
            INSERT INTO chat_messages (session_id, message, response, timestamp)
            VALUES (?, ?, ?, ?)
        """, (session_id, user_message, bot_response, timestamp))

        conn.commit()
        conn.close()
        logging.info(f"Chat data stored for session {session_id}")
    except Exception as e:
        logging.error(f"Error storing chat data: {e}")
        # Don't raise here - we don't want to fail the request if storage fails

@app.route("/api/dialogflow", methods=["POST"])
def chat():
    try:
        # Verify we have valid JSON data
        if not request.is_json:
            logging.error("Invalid request: Not JSON")
            return jsonify({"response": "Invalid request format"}), 400

        data = request.json
        session_id = data.get("session_id", "default-session")
        user_message = data.get("message", "")

        # Log the incoming request data
        logging.info(f"Received message: '{user_message}' for session: {session_id}")

        if not user_message:
            return jsonify({"response": "I didn't understand that."})

        # Get the bot's response from Dialogflow
        bot_response = detect_intent_texts(session_id, user_message)

        # Store the chat data in the database
        store_chat_data(session_id, user_message, bot_response)

        # Log the response from the bot
        logging.info(f"Bot response: {bot_response}")

        # Make sure we're returning a valid JSON response
        return jsonify({"response": bot_response if bot_response else "I'm not sure how to respond to that."})
    except Exception as e:
        # Log any error that occurred during processing
        logging.error(f"Error processing request: {e}")
        # Return a proper JSON response even on error
        return jsonify({"response": f"Sorry, I encountered an error: {str(e)}"}), 500

@app.route("/api/chat-history", methods=["GET"])
def get_chat_history():
    """Endpoint to retrieve chat history"""
    try:
        session_id = request.args.get("session_id")
        limit = request.args.get("limit", 100, type=int)

        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row  # This enables column access by name
        cursor = conn.cursor()

        if session_id:
            # Get history for a specific session
            cursor.execute("""
                SELECT message, response, timestamp
                FROM chat_messages
                WHERE session_id = ?
                ORDER BY timestamp DESC LIMIT ?
            """, (session_id, limit))
        else:
            # Get all chat history, grouped by session
            cursor.execute("""
                SELECT cm.session_id, cs.created_at,
                       COUNT(cm.id) as message_count,
                       MAX(cm.timestamp) as last_activity
                FROM chat_sessions cs
                LEFT JOIN chat_messages cm ON cs.session_id = cm.session_id
                GROUP BY cs.session_id
                ORDER BY last_activity DESC
            """)

        results = [dict(row) for row in cursor.fetchall()]
        conn.close()

        return jsonify({"success": True, "data": results})
    except Exception as e:
        logging.error(f"Error retrieving chat history: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/chat-session", methods=["GET"])
def get_chat_session():
    """Endpoint to retrieve a specific chat session with all messages"""
    try:
        session_id = request.args.get("session_id")

        if not session_id:
            return jsonify({"success": False, "error": "Session ID is required"}), 400

        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        # Get session info
        cursor.execute("""
            SELECT session_id, created_at
            FROM chat_sessions
            WHERE session_id = ?
        """, (session_id,))

        session = cursor.fetchone()
        if not session:
            return jsonify({"success": False, "error": "Session not found"}), 404

        session_data = dict(session)

        # Get all messages for the session
        cursor.execute("""
            SELECT id, message, response, timestamp
            FROM chat_messages
            WHERE session_id = ?
            ORDER BY timestamp ASC
        """, (session_id,))

        messages = [dict(row) for row in cursor.fetchall()]
        session_data['messages'] = messages

        conn.close()

        return jsonify({"success": True, "data": session_data})
    except Exception as e:
        logging.error(f"Error retrieving chat session: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/test", methods=["GET"])
def test():
    """Simple endpoint to test if API is working"""
    return jsonify({"status": "ok", "message": "API is running"})

if __name__ == "__main__":
    # Initialize the database before starting the app
    init_db()

    port = int(os.environ.get("PORT", 8000))
    logging.info(f"Starting Flask app on port {port} with project ID: {DIALOGFLOW_PROJECT_ID}")
    app.run(host='0.0.0.0', port=port, debug=False)