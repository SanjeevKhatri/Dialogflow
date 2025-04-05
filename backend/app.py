import os
import logging
from logging.handlers import RotatingFileHandler
from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import dialogflow_v2 as dialogflow
import json
from dotenv import load_dotenv

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
CORS(app, origins=["https://sanjeevkhatri.com", "http://localhost:3000"], supports_credentials=True)

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

        # Log the response from the bot
        logging.info(f"Bot response: {bot_response}")

        # Make sure we're returning a valid JSON response
        return jsonify({"response": bot_response if bot_response else "I'm not sure how to respond to that."})
    except Exception as e:
        # Log any error that occurred during processing
        logging.error(f"Error processing request: {e}")
        # Return a proper JSON response even on error
        return jsonify({"response": f"Sorry, I encountered an error: {str(e)}"}), 500

@app.route("/api/test", methods=["GET"])
def test():
    """Simple endpoint to test if API is working"""
    return jsonify({"status": "ok", "message": "API is running"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    logging.info(f"Starting Flask app on port {port} with project ID: {DIALOGFLOW_PROJECT_ID}")
    app.run(host='0.0.0.0', port=port, debug=False)