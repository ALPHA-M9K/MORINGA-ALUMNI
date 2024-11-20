from flask import Blueprint, request, jsonify
from app.models.user import User
from app import db, bcrypt
from flask_jwt_extended import create_access_token

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.json
    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()

    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        token = create_access_token(identity=user.id)
        return jsonify({"access_token": token}), 200
    return jsonify({"message": "Invalid credentials"}), 401
