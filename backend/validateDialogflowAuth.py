# To validate dialogflow authentication
from google.cloud import dialogflow

import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./dialogflow_credentials.json"

def test_auth():
    client = dialogflow.SessionsClient()
    print("Authentication successful!")

test_auth()
