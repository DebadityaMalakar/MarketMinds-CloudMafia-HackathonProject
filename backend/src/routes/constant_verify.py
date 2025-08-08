from flask import Blueprint, current_app
from flask_socketio import Namespace, emit, disconnect
from models.users import User
from datetime import datetime
import jwt

constant_verify_bp = Blueprint("constant_verify", __name__)

class TokenVerifyNamespace(Namespace):
    def on_connect(self):
        emit('request_token', {'message': 'Please send your token for verification'})

    def on_send_token(self, data):
        token = data.get('token')
        if not token:
            emit('verification_failed', {'message': 'No token provided'})
            disconnect()
            return
        
        valid, message = self.verify_token(token)
        if valid:
            emit('verification_success', {'message': message})
        else:
            emit('verification_failed', {'message': message})
            disconnect()

    def on_verify_token_periodic(self, data):
        token = data.get('token')
        if not token:
            emit('verification_failed', {'message': 'No token provided'})
            disconnect()
            return
        
        valid, message = self.verify_token(token)
        if valid:
            emit('verification_success', {'message': message})
        else:
            emit('verification_failed', {'message': message})
            disconnect()

    def verify_token(self, token):
        secret = current_app.config.get("JWT_SECRET_KEY")
        if not secret:
            return False, "JWT secret key not configured"

        try:
            payload = jwt.decode(token, secret, algorithms=["HS256"])
            user_id = payload.get("user_id")
            if not user_id:
                return False, "Invalid token payload"

            user = User.find_by_id(user_id)
            if not user:
                return False, "User not found"

            if user.token != token:
                return False, "Token mismatch"

            if not user.token_exp or datetime.utcnow() > user.token_exp:
                return False, "Token expired"

            return True, "Token is valid"

        except jwt.ExpiredSignatureError:
            return False, "Token expired"
        except Exception as e:
            return False, f"Token invalid: {str(e)}"

# You must register this namespace with your socketio server in main.py like so:
# socketio.on_namespace(TokenVerifyNamespace('/verifyconstant'))
