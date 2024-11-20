# from flask import Blueprint, request, jsonify
# from app import db, bcrypt
# from model import User
# from auth_service import generate_token
# import jwt
# import datetime

# auth_bp = Blueprint('auth', __name__)

# @auth_bp.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()
    
#     existing_user = User.query.filter_by(email=data['email']).first()
#     if existing_user:
#         return jsonify({'message': 'User already exists'}), 400
    
#     hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    
#     new_user = User(
#         email=data['email'],
#         password=hashed_password,
#         first_name=data['first_name'],
#         last_name=data['last_name']
#     )
    
#     db.session.add(new_user)
#     db.session.commit()
    
#     token = generate_token(new_user)
    
#     return jsonify({
#         'message': 'User registered successfully',
#         'token': token
#     }), 201

# @auth_bp.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     user = User.query.filter_by(email=data['email']).first()
    
#     if user and bcrypt.check_password_hash(user.password, data['password']):
#         token = generate_token(user)
#         return jsonify({
#             'message': 'Login successful',
#             'token': token
#         }), 200
    
#     return jsonify({'message': 'Invalid credentials'}), 401
# app/routes/auth.py
from flask import Blueprint, request, jsonify, make_response
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from backend.routes import db
from models import User
import jwt
import datetime
import os

auth_bp = Blueprint('auth', __name__)

def generate_token(user):
    """Generate JWT token for a user"""
    token = jwt.encode({
        'user_id': user.id,
        'email': user.email,
        'role': user.role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, os.getenv('SECRET_KEY', 'your_secret_key'), algorithm='HS256')
    return token

def token_required(f):
    """Decorator to require authentication"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')
        
        if not token:
            return jsonify({'message': 'Authentication token is missing'}), 401
        
        try:
            data = jwt.decode(token, os.getenv('SECRET_KEY', 'your_secret_key'), algorithms=['HS256'])
            current_user = User.query.filter_by(id=data['user_id']).first()
            
            if not current_user:
                return jsonify({'message': 'User not found'}), 401
            
            return f(current_user, *args, **kwargs)
        
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
    
    return decorated

@auth_bp.route('/register', methods=['POST'])
@cross_origin()
def register():
    data = request.get_json()
    
    # Validate input
    if not data:
        return jsonify({'error': 'No input data provided'}), 400
    
    # Check if user exists
    existing_user = User.query.filter_by(email=data.get('email')).first()
    if existing_user:
        return jsonify({'error': 'User already exists'}), 409
    
    # Create new user
    hashed_password = generate_password_hash(data.get('password'), method='pbkdf2:sha256')
    new_user = User(
        email=data.get('email'),
        password=hashed_password,
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        role=data.get('role', 'user')
    )
    
    try:
        db.session.add(new_user)
        db.session.commit()
        
        # Generate token
        token = generate_token(new_user)
        
        # Create response with token in cookie and as JSON
        response = make_response(jsonify({
            'message': 'Registration successful',
            'user': {
                'id': new_user.id,
                'email': new_user.email,
                'first_name': new_user.first_name,
                'last_name': new_user.last_name,
                'role': new_user.role
            }
        }), 201)
        
        # Set token in HTTP-only cookie
        response.set_cookie('token', token, httponly=True, secure=True, samesite='Lax')
        
        return response
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    
    # Validate input
    if not data:
        return jsonify({'error': 'No input data provided'}), 400
    
    # Find user
    user = User.query.filter_by(email=data.get('email')).first()
    
    # Check credentials
    if user and check_password_hash(user.password, data.get('password')):
        # Generate token
        token = generate_token(user)
        
        # Create response
        response = make_response(jsonify({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.role
            }
        }), 200)
        
        # Set token in HTTP-only cookie
        response.set_cookie('token', token, httponly=True, secure=True, samesite='Lax')
        
        return response
    
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/logout', methods=['POST'])
@cross_origin()
def logout():
    # Clear the token cookie
    response = make_response(jsonify({'message': 'Logout successful'}), 200)
    response.delete_cookie('token')
    return response

@auth_bp.route('/me', methods=['GET'])
@cross_origin()
@token_required
def get_current_user(current_user):
    return jsonify({
        'id': current_user.id,
        'email': current_user.email,
        'first_name': current_user.first_name,
        'last_name': current_user.last_name,
        'role': current_user.role
    }), 200