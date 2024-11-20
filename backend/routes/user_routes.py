from flask import Flask, request, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)

# File path for storing user data
DATA_FILE = os.path.join(os.path.dirname(__file__), 'users.json')

# Load user data from file
def load_users():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as file:
        return json.load(file)

# Save user data to file
def save_users(users):
    with open(DATA_FILE, 'w') as file:
        json.dump(users, file, indent=4)

# Add a new user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    if not data or 'username' not in data or 'email' not in data:
        return jsonify({'error': 'Username and email are required'}), 400

    users = load_users()
    new_user = {
        'id': len(users),
        'username': data['username'],
        'email': data['email'],
        'bio': data.get('bio', ''),
        'location': data.get('location', ''),
        'skills': data.get('skills', []),  # Array of skills
        'interests': data.get('interests', []),  # Array of interests
        'joined_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Time the user joined
    }
    users.append(new_user)
    save_users(users)
    return jsonify({'message': 'User created successfully', 'user': new_user}), 201

# Get all users
@app.route('/users', methods=['GET'])
def get_all_users():
    users = load_users()
    return jsonify(users)

# Get user by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    users = load_users()
    if user_id < 0 or user_id >= len(users):
        return jsonify({'error': 'User not found'}), 404
    return jsonify(users[user_id])

# Update user profile
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    users = load_users()
    if user_id < 0 or user_id >= len(users):
        return jsonify({'error': 'User not found'}), 404

    data = request.json
    if not data:
        return jsonify({'error': 'Invalid input'}), 400

    # Update fields
    user = users[user_id]
    user['bio'] = data.get('bio', user['bio'])
    user['location'] = data.get('location', user['location'])
    user['skills'] = data.get('skills', user['skills'])
    user['interests'] = data.get('interests', user['interests'])

    save_users(users)
    return jsonify({'message': 'User profile updated successfully', 'user': user})

# Run the Flask app (only if running this file directly)
if __name__ == '__main__':
    app.run(debug=True)
