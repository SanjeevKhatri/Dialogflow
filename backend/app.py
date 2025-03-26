from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow React app's origin

@app.route('/api/greeting')
def greeting():
    return jsonify({'message': 'Hi, I am Sanjeev'})

if __name__ == '__main__':
  app.run(debug=True, port=8000)