# models/user.py
import string
import secrets
from datetime import datetime, timedelta

from flask import current_app
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
import jwt


class User:
    collection_name = "users"

    def __init__(
        self,
        name,
        email,
        phone=None,
        password=None,
        otp=None,
        salt=None,
        password_hash=None,
        is_active=False,
        otp_expiry=None,
        token=None,
        token_exp=None,
        created_at=None,
        _id=None,
    ):
        self.id = str(_id) if _id else None
        self.name = name
        self.email = email
        self.phone = phone
        self.otp = otp
        self.otp_expiry = otp_expiry
        self.token = token
        self.token_exp = token_exp
        self.created_at = created_at or datetime.utcnow()
        self.is_active = is_active

        # salt and password hash handling
        self.salt = salt or self._generate_salt()
        if password:
            # store hash of password + salt
            self.password_hash = generate_password_hash(password + self.salt)
        else:
            self.password_hash = password_hash

    @staticmethod
    def _collection():
        return current_app.mongo.db[User.collection_name]

    @staticmethod
    def _generate_salt(length: int = 16) -> str:
        alphabet = string.ascii_letters + string.digits
        return "".join(secrets.choice(alphabet) for _ in range(length))

    @staticmethod
    def _generate_otp(length: int = 6) -> str:
        digits = string.digits
        return "".join(secrets.choice(digits) for _ in range(length))

    @classmethod
    def create_pending(cls, name, email, phone, password, otp_ttl_minutes: int = 10):
        otp = cls._generate_otp()
        otp_expiry = datetime.utcnow() + timedelta(minutes=otp_ttl_minutes)
        salt = cls._generate_salt()
        password_hash = generate_password_hash(password + salt)

        doc = {
            "name": name,
            "email": email,
            "phone": phone,
            "password_hash": password_hash,
            "salt": salt,
            "otp": otp,
            "otp_expiry": otp_expiry,
            "is_active": False,
            "token": None,
            "token_exp": None,
            "created_at": datetime.utcnow(),
        }
        result = cls._collection().insert_one(doc)
        return cls(
            name=name,
            email=email,
            phone=phone,
            otp=otp,
            salt=salt,
            password_hash=password_hash,
            otp_expiry=otp_expiry,
            is_active=False,
            token=None,
            token_exp=None,
            created_at=doc["created_at"],
            _id=result.inserted_id,
        )

    def save(self):
        doc = {
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "password_hash": self.password_hash,
            "salt": self.salt,
            "otp": self.otp,
            "otp_expiry": self.otp_expiry,
            "is_active": self.is_active,
            "token": self.token,
            "token_exp": self.token_exp,
            "created_at": self.created_at,
        }

        if self.id:
            self._collection().update_one({"_id": ObjectId(self.id)}, {"$set": doc})
        else:
            res = self._collection().insert_one(doc)
            self.id = str(res.inserted_id)
        return self

    @classmethod
    def _from_db(cls, data):
        if not data:
            return None
        return cls(
            name=data.get("name"),
            email=data.get("email"),
            phone=data.get("phone"),
            otp=data.get("otp"),
            salt=data.get("salt"),
            password_hash=data.get("password_hash"),
            is_active=data.get("is_active", False),
            otp_expiry=data.get("otp_expiry"),
            token=data.get("token"),
            token_exp=data.get("token_exp"),
            created_at=data.get("created_at"),
            _id=data.get("_id"),
        )

    @classmethod
    def find_by_email(cls, email):
        data = cls._collection().find_one({"email": email})
        return cls._from_db(data) if data else None

    @classmethod
    def find_by_id(cls, user_id):
        data = cls._collection().find_one({"_id": ObjectId(user_id)})
        return cls._from_db(data) if data else None

    @classmethod
    def find_pending_by_email(cls, email):
        data = cls._collection().find_one({"email": email, "is_active": False})
        return cls._from_db(data) if data else None

    def check_password(self, password_plain: str) -> bool:
        if not self.password_hash:
            return False
        return check_password_hash(self.password_hash, password_plain + self.salt)

    def set_active(self):
        self.is_active = True
        self.otp = None
        self.otp_expiry = None
        return self.save()

    def set_otp(self, ttl_minutes: int = 10):
        self.otp = self._generate_otp()
        self.otp_expiry = datetime.utcnow() + timedelta(minutes=ttl_minutes)
        self.save()
        return self.otp

    def verify_otp(self, otp_value: str) -> bool:
        if not self.otp or not self.otp_expiry:
            return False
        if datetime.utcnow() > self.otp_expiry:
            return False
        return secrets.compare_digest(str(self.otp), str(otp_value))

    # ---- JWT helpers ----
    def generate_jwt(self, expires_hours: int = 24*30*3) -> str:
        secret = current_app.config.get("JWT_SECRET_KEY")
        if not secret:
            raise RuntimeError("JWT_SECRET_KEY not configured in app.config")

        payload = {
            "user_id": self.id,
            "email": self.email,
            "exp": datetime.utcnow() + timedelta(hours=expires_hours),
            "iat": datetime.utcnow(),
        }
        token = jwt.encode(payload, secret, algorithm="HS256")
        if isinstance(token, bytes):
            token = token.decode("utf-8")

        # Store token and expiration in user and save
        self.token = token
        self.token_exp = payload["exp"]
        self.save()

        return token

    @staticmethod
    def decode_jwt(token: str):
        secret = current_app.config.get("JWT_SECRET_KEY")
        if not secret:
            raise RuntimeError("JWT_SECRET_KEY not configured in app.config")
        try:
            payload = jwt.decode(token, secret, algorithms=["HS256"])
            return payload
        except jwt.ExpiredSignatureError:
            raise
        except Exception:
            raise
