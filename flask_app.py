"""
Flask application for serving the React portfolio on PythonAnywhere.
Upload this file along with the 'dist' folder to your PythonAnywhere account.
"""
from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='dist', static_url_path='')

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
