from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv
from .routes.users import users_bp
from .routes.groups import groups_bp
from .routes.cart import cart_bp
from .routes.products import products_bp

# Load environment variables
load_dotenv(os.path.join("config", ".env"))

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(users_bp)
app.register_blueprint(groups_bp)
app.register_blueprint(cart_bp)
app.register_blueprint(products_bp)

# Health Check Route
@app.route('/health')
def health():
    return jsonify({"status": "healthy"}), 200

# Run the app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)