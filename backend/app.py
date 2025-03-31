from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
# CORS(app, origins=["http://localhost:3000"])  # Allow React app's origin
CORS(app, origins=["https://dialogflow-ui.onrender.com/"])  # Allow React app's origin

@app.route('/api/greeting')
def greeting():
    return jsonify({'message': 'Hi, I am Sanjeev'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))  # Use Render's assigned port
    app.run(host='0.0.0.0', port=port)