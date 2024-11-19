from flask import Blueprint, request, jsonify
from model import db, Profile

# Create a blueprint for user-related routes
user_routes = Blueprint('user_routes', __name__)

# Route to create a new user (profile)
@user_routes.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    try:
        new_user = Profile(
            name=data.get('name'),
            bio=data.get('bio'),
            location=data.get('location'),
            skills=data.get('skills'),
            interests=data.get('interests')
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully!", "user": new_user.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Route to fetch all users
@user_routes.route('/users', methods=['GET'])
def get_users():
    users = Profile.query.all()
    return jsonify([{
        "id": user.id,
        "name": user.name,
        "bio": user.bio,
        "location": user.location,
        "skills": user.skills,
        "interests": user.interests
    } for user in users]), 200

# Route to get a specific user by ID
@user_routes.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = Profile.query.get(user_id)
    if user:
        return jsonify({
            "id": user.id,
            "name": user.name,
            "bio": user.bio,
            "location": user.location,
            "skills": user.skills,
            "interests": user.interests
        }), 200
    else:
        return jsonify({"error": "User not found"}), 404

# Route to update a user's profile
@user_routes.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    user = Profile.query.get(user_id)
    if user:
        try:
            user.name = data.get('name', user.name)
            user.bio = data.get('bio', user.bio)
            user.location = data.get('location', user.location)
            user.skills = data.get('skills', user.skills)
            user.interests = data.get('interests', user.interests)
            db.session.commit()
            return jsonify({"message": "User updated successfully!"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "User not found"}), 404

# Route to delete a user
@user_routes.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = Profile.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully!"}), 200
    else:
        return jsonify({"error": "User not found"}), 404
