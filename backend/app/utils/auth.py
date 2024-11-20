import jwt
from flask import request, jsonify, current_app
from functools import wraps
from datetime import datetime, timedelta

def generate_token(user_id):
    """Generate a JWT token."""
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(hours=24)
    }
    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm="HS256")
    return token

def decode_token(token):
    """Decode a JWT token."""
    try:
        decoded = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
        return decoded
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def login_required(func):
    """Decorator to protect routes."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Authorization token is required"}), 401
        
        token = token.split(" ")[1] if " " in token else token
        decoded = decode_token(token)
        if not decoded:
            return jsonify({"error": "Invalid or expired token"}), 401

        request.user_id = decoded.get('user_id')
        return func(*args, **kwargs)
    return wrapper
