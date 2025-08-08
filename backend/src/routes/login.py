from flask import Blueprint, request, jsonify
from models.users import User

login_bp = Blueprint("login", __name__)

@login_bp.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = User.find_by_email(email)
    if not user or not user.is_active:
        return jsonify({"message": "Invalid email or user not active"}), 401

    if not user.check_password(password):
        return jsonify({"message": "Invalid password"}), 401

    # Generate new JWT token, which also updates user's token/token_exp fields and saves
    token = user.generate_jwt()

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {"id": user.id, "name": user.name, "email": user.email}
    }), 200
