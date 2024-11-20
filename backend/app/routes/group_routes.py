from flask import Blueprint, request, jsonify
from app.models.group import Group
from app import db

group_routes = Blueprint('group_routes', __name__)

@group_routes.route('/groups', methods=['POST'])
def create_group():
    data = request.json
    group = Group(
        name=data['name'],
        description=data['description'],
        is_private=data.get('is_private', False),
        admin_id=data['admin_id']
    )
    db.session.add(group)
    db.session.commit()
    return jsonify({"message": "Group created successfully"}), 201
