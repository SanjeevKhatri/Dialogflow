# to expose an api
from flask import Flask, request, jsonify
from google.cloud import dialogflow
import os
import uuid
import json

app = Flask(__name__)

# Set up Google Cloud credentials
# You would typically set this via environment variable:
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "path/to/your-project-credentials.json"

# Dialogflow project configuration
PROJECT_ID = "your-dialogflow-project-id"  # Replace with your Dialogflow project ID
LANGUAGE_CODE = "en-US"

@app.route('/api/dialogflow', methods=['POST'])
def dialogflow_webhook():
    # Get request data
    data = request.json
    message = data.get('message', '')
    session_id = data.get('session_id', str(uuid.uuid4()))

    # Call Dialogflow API
    response_text = detect_intent_text(PROJECT_ID, session_id, message, LANGUAGE_CODE)

    # Return response
    return jsonify({
        "response": response_text,
        "session_id": session_id
    })

def detect_intent_text(project_id, session_id, text, language_code):
    """
    Returns the result of detect intent with texts as inputs.
    Using the same session_id between requests allows continuation of the conversation.
    """
    try:
        session_client = dialogflow.SessionsClient()
        session = session_client.session_path(project_id, session_id)

        text_input = dialogflow.TextInput(text=text, language_code=language_code)
        query_input = dialogflow.QueryInput(text=text_input)

        response = session_client.detect_intent(
            request={"session": session, "query_input": query_input}
        )

        # Get the fulfillment text from the response
        fulfillment_text = response.query_result.fulfillment_text

        # You can also access intent and other response data
        # intent = response.query_result.intent.display_name
        # confidence = response.query_result.intent_detection_confidence

        return fulfillment_text
    except Exception as e:
        print(f"Error in Dialogflow API call: {e}")
        return "I'm sorry, I couldn't process your request at the moment."

if __name__ == '__main__':
    app.run(debug=True)