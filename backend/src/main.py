from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_socketio import SocketIO
from routes.login import login_bp
from routes.signup import signup_bp
from routes.constant_verify import TokenVerifyNamespace
from datetime import datetime
import os

def create_app():
    app = Flask(__name__, static_folder=None)

    # Basic config - replace with environment variables in production
    app.config["MONGO_URI"] = os.environ.get("MONGO_URI", "mongodb://localhost:27017/mydatabase")
    app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "dev_jwt_secret_change_me")

    # SMTP config for sending OTP email
    app.config["SMTP_HOST"] = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    app.config["SMTP_PORT"] = int(os.environ.get("SMTP_PORT", 587))
    app.config["SMTP_USER"] = os.environ.get("SMTP_USER")  # no default here for safety
    app.config["SMTP_PASS"] = os.environ.get("SMTP_PASS")
    app.config["SMTP_USE_TLS"] = os.environ.get("SMTP_USE_TLS", "True").lower() in ("1", "true", "yes")
    app.config["SMTP_SENDER"] = os.environ.get("SMTP_SENDER", app.config["SMTP_USER"])

    # Init CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Init PyMongo
    mongo = PyMongo(app)
    app.mongo = mongo  # Attach to app so models can access current_app.mongo

    # Register blueprints
    app.register_blueprint(login_bp)
    app.register_blueprint(signup_bp)

    # Create socketio instance attached to app
    socketio = SocketIO(app, cors_allowed_origins="*")

    # Register the socketio namespace
    socketio.on_namespace(TokenVerifyNamespace('/verifyconstant'))

    # Simple root route for health-check
    @app.route("/health")
    def health():
        return {"status": "ok", "time": datetime.utcnow().isoformat()}

    # Attach socketio to app for access in main block
    app.socketio = socketio

    return app

if __name__ == "__main__":
    app = create_app()
    # Use socketio.run() instead of app.run() for websocket support
    app.socketio.run(app, debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
