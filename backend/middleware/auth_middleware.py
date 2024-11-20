from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from model import User

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # Verify JWT is present and valid
        verify_jwt_in_request()
        
        # Get the current user's ID from the JWT
        current_user_id = get_jwt_identity()
        
        # Check if the user exists and is an admin
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        if user.role != 'admin':
            return jsonify({"error": "Admin access required"}), 403
        
        # If user is an admin, proceed with the route
        return fn(*args, **kwargs)
    
    return wrapper

def login_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # Verify JWT is present and valid
        verify_jwt_in_request()
        
        # Get the current user's ID from the JWT
        current_user_id = get_jwt_identity()
        
        # Check if the user exists
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # If user exists, proceed with the route
        return fn(*args, **kwargs)
    
    return wrapper