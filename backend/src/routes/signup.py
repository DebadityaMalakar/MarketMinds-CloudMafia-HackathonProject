from flask import Blueprint, request, jsonify, current_app
from models.users import User
from datetime import datetime
from bson import ObjectId
import smtplib
from email.message import EmailMessage

signup_bp = Blueprint("signup", __name__)


def _send_email(to_email: str, subject: str, body: str):
    host = current_app.config.get("SMTP_HOST")
    port = current_app.config.get("SMTP_PORT", 587)
    user = current_app.config.get("SMTP_USER")
    password = current_app.config.get("SMTP_PASS")
    use_tls = current_app.config.get("SMTP_USE_TLS", True)
    sender = current_app.config.get("SMTP_SENDER", user)

    if not host or not user or not password:
        current_app.logger.error("SMTP not configured properly")
        return False

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = to_email
    msg.set_content(body)

    try:
        server = smtplib.SMTP(host, port, timeout=10)
        if use_tls:
            server.starttls()
        server.login(user, password)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        current_app.logger.exception("Failed to send email: %s", e)
        return False


@signup_bp.route("/api/auth/send-otp", methods=["POST"])
def send_otp():
    data = request.get_json() or {}

    name = data.get("name")  # required if creating new user
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")

    if not email:
        return jsonify({"message": "Email is required"}), 400

    existing = User.find_by_email(email)
    if existing:
        if existing.is_active:
            return jsonify({"message": "User with this email already exists"}), 409
        else:
            # Pending user: regenerate OTP
            existing.set_otp()
            sent = _send_email(
                to_email=existing.email,
                subject="Your OTP for MarketMinds",
                body=f"Your signup OTP is: {existing.otp}. It will expire at {existing.otp_expiry} UTC."
            )
            if not sent:
                return jsonify({"message": "Failed to send OTP email"}), 500
            return jsonify({"message": "OTP resent to email"}), 200

    # User doesn't exist, require name and password
    if not name or not password:
        return jsonify({"message": "Name and password are required to start signup"}), 400

    pending_user = User.create_pending(name=name, email=email, phone=phone, password=password)
    sent = _send_email(
        to_email=email,
        subject="Your OTP for MarketMinds",
        body=f"Your signup OTP is: {pending_user.otp}. It will expire at {pending_user.otp_expiry} UTC."
    )
    if not sent:
        # Remove pending user if email fails
        current_app.mongo.db[User.collection_name].delete_one({"_id": ObjectId(pending_user.id)})
        return jsonify({"message": "Failed to send OTP email"}), 500

    return jsonify({"message": "OTP sent to email"}), 200


@signup_bp.route("/api/auth/signup", methods=["POST"])
def signup():
    data = request.get_json() or {}

    email = data.get("email")
    otp = data.get("otp")

    if not email or not otp:
        return jsonify({"message": "Email and OTP are required"}), 400

    pending = User.find_pending_by_email(email)
    if not pending:
        return jsonify({"message": "No pending signup found for this email"}), 400

    if not pending.verify_otp(otp):
        return jsonify({"message": "Invalid or expired OTP"}), 400

    # Activate user and generate JWT token which sets token/token_exp on user and saves
    pending.set_active()
    token = pending.generate_jwt()

    return jsonify({
        "message": "Signup complete",
        "token": token,
        "user": {"id": pending.id, "name": pending.name, "email": pending.email}
    }), 200
