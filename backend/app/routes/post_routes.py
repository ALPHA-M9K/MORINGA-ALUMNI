from flask import Blueprint, request, jsonify
from app.models.post import Post
from app import db

post_routes = Blueprint('post_routes', __name__)

@post_routes.route('/posts', methods=['POST'])
def create_post():
    data = request.json
    post = Post(content=data['content'], user_id=data['user_id'], group_id=data.get('group_id'))
    db.session.add(post)
    db.session.commit()
    return jsonify({"message": "Post created successfully"}), 201
