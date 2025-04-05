import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import dialogflow_v2 as dialogflow
import json
from dotenv import load_dotenv

# Load and parse the JSON string
load_dotenv()
json_str = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_JSON")
creds_dict = json.loads(json_str)

# Optional: write to temp file if a file path is needed
with open("dialogflow_credentials.json", "w") as f:
    f.write(json_str)

# Set up logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)
# CORS(app, origins=["http://localhost:3000"])
CORS(app, origins=["https://sanjeevkhatri.com"])
# CORS(app, origins=['https://sanjeevkhatri.com.np', 'https://sanjeevkhatri.com', 'http://localhost:3000'])

# Set Google credentials path
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./dialogflow_credentials.json"

# Dialogflow project ID
DIALOGFLOW_PROJECT_ID = "test-ikwf"  # Verify this ID is correct
DIALOGFLOW_LANGUAGE_CODE = "en"

def detect_intent_texts(session_id, text, language_code=DIALOGFLOW_LANGUAGE_CODE):
    """Returns the result of detect intent with texts as inputs. Using the same `session_id` between requests allows continuation of the conversation."""
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
    data = request.json
    session_id = data.get("session_id", "default-session")
    user_message = data.get("message", "")

    # Log the incoming request data
    logging.info(f"Received message: '{user_message}' for session: {session_id}")

    if not user_message:
        return jsonify({"response": "I didn't understand that."})

    try:
        # Get the bot's response from Dialogflow
        bot_response = detect_intent_texts(session_id, user_message)

        # Log the response from the bot
        logging.info(f"Bot response: {bot_response}")

        return jsonify({"response": bot_response if bot_response else "I'm not sure how to respond to that."})
    except Exception as e:
        # Log any error that occurred during processing
        logging.error(f"Error processing request: {e}")
        return jsonify({"response": f"Sorry, I encountered an error: {str(e)}"}), 500

@app.route("/api/test", methods=["GET"])
def test():
    """Simple endpoint to test if API is working"""
    return jsonify({"status": "ok", "message": "API is running"})

if __name__ == "__main__":
    logging.info(f"Starting Flask app on port 8000 with project ID: {DIALOGFLOW_PROJECT_ID}")
    app.run(host='0.0.0.0', port=8000, debug=True)
