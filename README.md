# Dialogflow

To Run in Local,

For Python,
To create virtual environment: python3 -m venv venv
To get in virtual environment: source venv/bin/activate
To install dependencies: pip install -r requirements.txt
To run main file: python3 app.py

For React,
To install dependencies: npm install
To Build the app: npm run build

To Run in Cloud (Render),
Build: pip install -r ./backend/requirements.txt
Start: gunicorn -w 4 -b 0.0.0.0:8000 backend.app:app

