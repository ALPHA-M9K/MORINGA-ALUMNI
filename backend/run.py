# # app.py or run.py
# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy
# from werkzeug.security import generate_password_hash
# import os

# app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# # Database Configuration
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Database.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SECRET_KEY'] = 'your_secret_key'

# db = SQLAlchemy(app)

# # User Model
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(255), nullable=False)
#     first_name = db.Column(db.String(50), nullable=False)
#     last_name = db.Column(db.String(50), nullable=True)

# # Authentication Routes
# @app.route('/api/auth/register', methods=['POST'])
# def register():
#     data = request.get_json()
    
#     # Validate input
#     if not data:
#         return jsonify({'error': 'No input data provided'}), 400
    
#     # Check if user exists
#     existing_user = User.query.filter_by(email=data.get('email')).first()
#     if existing_user:
#         return jsonify({'error': 'User already exists'}), 409
    
#     # Create new user
#     hashed_password = generate_password_hash(data.get('password'))
#     new_user = User(
#         email=data.get('email'),
#         password=hashed_password,
#         first_name=data.get('first_name', ''),
#         last_name=data.get('last_name', '')
#     )
    
#     try:
#         db.session.add(new_user)
#         db.session.commit()
        
#         return jsonify({
#             'message': 'Registration successful',
#             'user': {
#                 'id': new_user.id,
#                 'email': new_user.email,
#                 'first_name': new_user.first_name,
#                 'last_name': new_user.last_name
#             }
#         }), 201
    
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'error': str(e)}), 500

# # Other routes (login, logout, etc.) would be similar

# if __name__ == '__main__':
#     with app.app_context():
#         db.create_all()
#     app.run(debug=True, host='0.0.0.0', port=5000)

# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy
# from werkzeug.security import generate_password_hash, check_password_hash
# import jwt
# import datetime
# import os

# app = Flask(__name__)

# # CORS Configuration - CRITICAL
# CORS(app, resources={
#     r"/api/*": {
#         "origins": [
#             "http://localhost:3000",  # React app URL
#             "http://127.0.0.1:3000"   # Add alternative localhost
#         ],
#         "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
#         "allow_headers": ["Content-Type", "Authorization"]
#     }
# }, supports_credentials=True)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Database.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_secret_key')

# db = SQLAlchemy(app)

# # User Model
# class User(db.Model):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(255), nullable=False)
#     first_name = db.Column(db.String(50), nullable=True)
#     last_name = db.Column(db.String(50), nullable=True)
#     role = db.Column(db.String(20), nullable=False, default='user')
#     created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

#     def set_password(self, password):
#         """Set hashed password"""
#         self.password = generate_password_hash(password)

#     def check_password(self, raw_password):
#         """Check if provided password is correct"""
#         return check_password_hash(self.password, raw_password)

#     def to_dict(self):
#         """Convert user to dictionary for JSON serialization"""
#         return {
#             'id': self.id,
#             'email': self.email,
#             'first_name': self.first_name,
#             'last_name': self.last_name,
#             'role': self.role
#         }

# # Profile Model
# class Profile(db.Model):
#     __tablename__ = 'profiles'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
#     name = db.Column(db.String(100), nullable=False)
    
#     # Relationship with User
#     user = db.relationship('User', backref=db.backref('profile', uselist=False))

#     def to_dict(self):
#         """Convert profile to dictionary"""
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'name': self.name
#         }

# # Token generation function
# def generate_token(user):
#     """Generate JWT token for user"""
#     try:
#         payload = {
#             'user_id': user.id,
#             'email': user.email,
#             'role': user.role,
#             'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
#         }
#         return jwt.encode(
#             payload, 
#             app.config['SECRET_KEY'], 
#             algorithm='HS256'
#         )
#     except Exception as e:
#         print(f"Token generation error: {str(e)}")
#         return None

# # Add OPTIONS route for preflight requests
# @app.route('/api/auth/login', methods=['OPTIONS'])
# @app.route('/api/auth/register', methods=['OPTIONS'])
# def handle_options():
#     response = jsonify()
#     response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
#     response.headers.add('Access-Control-Allow-Methods', 'POST')
#     response.headers.add('Access-Control-Allow-Credentials', 'true')
#     return response

# @app.route('/api/auth/login', methods=['POST'])
# def login():
#     data = request.get_json()
    
#     # Validate input
#     if not data or not data.get('email') or not data.get('password'):
#         return jsonify({'error': 'Invalid credentials'}), 400
    
#     # Find user by email
#     user = User.query.filter_by(email=data.get('email')).first()
    
#     # Check password
#     if not user or not user.check_password(data.get('password')):
#         return jsonify({'error': 'Invalid credentials'}), 401
    
#     # Generate token
#     token = generate_token(user)
    
#     # Prepare user data (including profile if exists)
#     user_data = user.to_dict()
#     if user.profile:
#         user_data['profile'] = user.profile.to_dict()
    
#     return jsonify({
#         'user': user_data,
#         'token': token
#     }), 200

# @app.route('/api/auth/register', methods=['POST'])
# def register():
#     data = request.get_json()
    
#     # Validate input
#     if not data or not data.get('email') or not data.get('password'):
#         return jsonify({'error': 'Invalid registration data'}), 400
    
#     # Check if user already exists
#     existing_user = User.query.filter_by(email=data.get('email')).first()
#     if existing_user:
#         return jsonify({'error': 'User already exists'}), 409
    
#     # Create new user
#     new_user = User(
#         email=data.get('email'),
#         first_name=data.get('first_name', ''),
#         last_name=data.get('last_name', ''),
#         role=data.get('role', 'user')  # Default to 'user' if not specified
#     )
#     new_user.set_password(data.get('password'))
    
#     # Create associated profile
#     new_profile = Profile(
#         user=new_user,
#         name=f"{new_user.first_name} {new_user.last_name}".strip(),
#     )
    
#     # Save user and profile to database
#     try:
#         db.session.add(new_user)
#         db.session.add(new_profile)
#         db.session.commit()
        
#         # Generate token
#         token = generate_token(new_user)
        
#         return jsonify({
#             'user': {
#                 **new_user.to_dict(),
#                 'profile': new_profile.to_dict()
#             },
#             'token': token
#         }), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({
#             'error': 'Registration failed', 
#             'details': str(e)
#         }), 500

# # Seed initial admin user
# def create_admin_user():
#     with app.app_context():
#         admin_email = 'admin@example.com'
#         admin_password = 'admin_password'
        
#         # Check if admin user already exists
#         existing_admin = User.query.filter_by(email=admin_email).first()
#         if not existing_admin:
#             admin_user = User(
#                 email=admin_email,
#                 first_name='Admin',
#                 last_name='User',
#                 role='admin'
#             )
#             admin_user.set_password(admin_password)
            
#             admin_profile = Profile(
#                 user=admin_user,
#                 name='Admin User'
#             )
            
#             db.session.add(admin_user)
#             db.session.add(admin_profile)
#             db.session.commit()
#             print("Admin user created successfully")

# # Run configuration
# if __name__ == '__main__':
#     with app.app_context():
#         # Create all database tables
#         db.create_all()
        
#         # Create admin user if not exists
#         create_admin_user()
    
#     app.run(debug=True, host='0.0.0.0', port=5000)

# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy
# from werkzeug.security import generate_password_hash, check_password_hash
# import jwt
# import datetime
# import os

# app = Flask(__name__)

# # CORS Configuration
# CORS(app, resources={
#     r"/api/*": {
#         "origins": [
#             "http://localhost:3000",  # React app URL
#             "http://127.0.0.1:3000"   # Add alternative localhost
#         ],
#         "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
#         "allow_headers": ["Content-Type", "Authorization"]
#     }
# }, supports_credentials=True)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Database.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_secret_key')

# db = SQLAlchemy(app)

# # User Model
# class User(db.Model):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(255), nullable=False)
#     first_name = db.Column(db.String(50), nullable=True)
#     last_name = db.Column(db.String(50), nullable=True)
#     role = db.Column(db.String(20), nullable=False, default='user')
#     created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

#     def set_password(self, password):
#         """Set hashed password"""
#         self.password = generate_password_hash(password)

#     def check_password(self, raw_password):
#         """Check if provided password is correct"""
#         return check_password_hash(self.password, raw_password)

#     def to_dict(self):
#         """Convert user to dictionary for JSON serialization"""
#         return {
#             'id': self.id,
#             'email': self.email,
#             'first_name': self.first_name,
#             'last_name': self.last_name,
#             'role': self.role
#         }

# # Profile Model
# class Profile(db.Model):
#     __tablename__ = 'profiles'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
#     name = db.Column(db.String(100), nullable=False)
    
#     # Relationship with User
#     user = db.relationship('User', backref=db.backref('profile', uselist=False))
#     def to_dict(self):
#         """Convert profile to dictionary"""
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'name': self.name
#         }

# # Token generation function
# def generate_token(user):
#     """Generate JWT token for user"""
#     try:
#         payload = {
#             'user_id': user.id,
#             'email': user.email,
#             'role': user.role,
#             'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
#         }
#         return jwt.encode(
#             payload, 
#             app.config['SECRET_KEY'], 
#             algorithm='HS256'
#         )
#     except Exception as e:
#         print(f"Token generation error: {str(e)}")
#         return None

# # Add OPTIONS route for preflight requests
# @app.route('/api/auth/login', methods=['OPTIONS'])
# @app.route('/api/auth/register', methods=['OPTIONS'])
# @app.route('/api/cohort/create', methods=['OPTIONS'])
# @app.route('/api/cohort/join', methods=['OPTIONS'])
# def handle_options():
#     response = jsonify()
#     response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
#     response.headers.add('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
#     response.headers.add('Access-Control-Allow-Credentials', 'true')
#     return response

# @app.route('/api/auth/login', methods=['POST'])
# def login():
#     data = request.get_json()
    
#     # Validate input
#     if not data or not data.get('email') or not data.get('password'):
#         return jsonify({'error': 'Invalid credentials'}), 400
    
#     # Find user by email
#     user = User.query.filter_by(email=data.get('email')).first()
    
#     # Check password
#     if not user or not user.check_password(data.get('password')):
#         return jsonify({'error': 'Invalid credentials'}), 401
    
#     # Generate token
#     token = generate_token(user)
    
#     # Prepare user data (including profile if exists)
#     user_data = user.to_dict()
#     if user.profile:
#         user_data['profile'] = user.profile.to_dict()
    
#     return jsonify({
#         'user': user_data,
#         'token': token
#     }), 200

# @app.route('/api/auth/register', methods=['POST'])
# def register():
#     data = request.get_json()
    
#     # Validate input
#     if not data or not data.get('email') or not data.get('password'):
#         return jsonify({'error': 'Invalid registration data'}), 400
    
#     # Check if user already exists
#     existing_user = User.query.filter_by(email=data.get('email')).first()
#     if existing_user:
#         return jsonify({'error': 'User  already exists'}), 409
    
#     # Create new user
#     new_user = User(
#         email=data.get('email'),
#         first_name=data.get('first_name', ''),
#         last_name=data.get('last_name', ''),
#         role=data.get('role', 'user')  # Default to 'user' if not specified
#     )
#     new_user.set_password(data.get('password'))
    
#     # Create associated profile
#     new_profile = Profile(
#         user=new_user,
#         name=f"{new_user.first_name} {new_user.last_name}".strip(),
#     )
    
#     # Save user and profile to database
#     try:
#         db.session.add(new_user)
#         db.session.add(new_profile)
#         db.session.commit()
        
#         # Generate token
#         token = generate_token(new_user)
        
#         return jsonify({
#             'user': {
#                 **new_user.to_dict(),
#                 'profile': new_profile.to_dict()
#             },
#             'token': token
#         }), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({
#             'error': 'Registration failed', 
#             'details': str(e)
#         }), 500

# # Seed initial admin user
# def create_admin_user():
#     with app.app_context():
#         admin_email = 'admin@example.com'
#         admin_password = 'admin_password'
        
#         # Check if admin user already exists
#         existing_admin = User.query.filter_by(email=admin_email).first()
#         if not existing_admin:
#             admin_user = User(
#                 email=admin_email,
#                 first_name='Admin',
#                 last_name='User ',
#                 role='admin'
#             )
#             admin_user.set_password(admin_password)
            
#             admin_profile = Profile(
#                 user=admin_user,
#                 name='Admin User'
#             )
            
#             db.session.add(admin_user)
#             db.session.add(admin_profile)
#             db.session.commit()
#             print("Admin user created successfully")

# # Run configuration
# if __name__ == '__main__':
#     with app.app_context():
#         # Create all database tables
#         db.create_all()
        
#         # Create admin user if not exists
#         create_admin_user()
    
#     app.run(debug=True, host='0.0.0.0', port=5000) 

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os

# Flask app configuration
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///MoringaAlumni.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_secret_key')

db = SQLAlchemy(app)

CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "http://127.0.0.1:3000"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
}, supports_credentials=True)

# User model for authentication
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    role = db.Column(db.String(20), nullable=False, default='user')
    skills = db.Column(db.String(200), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, raw_password):
        return check_password_hash(self.password, raw_password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'role': self.role,
            'skills': self.skills,
            'created_at': self.created_at
        }

# Profile model for extended user data
class Profile(db.Model):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    user = db.relationship('User', backref=db.backref('profile', uselist=False))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name
        }

# JWT Token Generation
def generate_token(user):
    payload = {
        'user_id': user.id,
        'email': user.email,
        'role': user.role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }
    return jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')

# Authentication routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Invalid registration data'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'User already exists'}), 409

    new_user = User(
        email=data['email'],
        first_name=data.get('first_name', ''),
        last_name=data.get('last_name', ''),
        role=data.get('role', 'user'),
        skills=data.get('skills', '')
    )
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_dict()), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get('email')).first()

    if not user or not user.check_password(data.get('password')):
        return jsonify({'error': 'Invalid credentials'}), 401

    token = generate_token(user)
    return jsonify({'user': user.to_dict(), 'token': token}), 200

# Alumni management routes
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    new_user = User(
        name=data['name'], 
        role=data['role'], 
        skills=data['skills']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

@app.route('/api/users', methods=['GET'])
def get_users():
    query = request.args.get('q', '').lower()
    if query:
        users = User.query.filter(
            (User.first_name.ilike(f'%{query}%')) |
            (User.last_name.ilike(f'%{query}%')) |
            (User.skills.ilike(f'%{query}%'))
        ).all()
    else:
        users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.role = data.get('role', user.role)
    user.skills = data.get('skills', user.skills)
    db.session.commit()
    return jsonify(user.to_dict())

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return '', 204

# Initialize the database and run the app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
