# from flask import Blueprint, request, jsonify
# from model import Post, Comment, db  # Import the database and models
# from Services.authService import token_required  # Assuming you have a token_required decorator for authentication

# post_routes = Blueprint('post_routes', __name__)

# # Get all posts
# @post_routes.route('/posts', methods=['GET'])
# def get_posts():
#     posts = Post.query.all()  # Retrieve all posts from the database
#     return jsonify([{
#         "id": post.id,
#         "content": post.body,
#         "username": post.profile.name,  # Assuming profile has a name field
#         "createdAt": post.created_at.isoformat(),
#         "upvotes": 0,  # Implement voting logic if needed
#         "downvotes": 0,  # Implement voting logic if needed
#         "comments": [{
#             "id": comment.id,
#             "content": comment.body,
#             "username": comment.profile.name,  # Assuming profile has a name field
#             "createdAt": comment.created_at.isoformat()
#         } for comment in post.comments]
#     } for post in posts]), 200

# # Create a new post
# @post_routes.route('/posts', methods=['POST'])
# @token_required  # Ensure that the user is authenticated
# def create_post():
#     data = request.json
#     new_post = Post(
#         title=data.get("title"),
#         body=data.get("content"),
#         profile_id=request.user.profile.id  # Assuming you have user info in the request
#     )
#     db.session.add(new_post)
#     db.session.commit()
#     return jsonify({
#         "id": new_post.id,
#         "content": new_post.body,
#         "username": request.user.profile.name,  # Assuming profile has a name field
#         "createdAt": new_post.created_at.isoformat(),
#         "upvotes": 0,
#         "downvotes": 0,
#         "comments": []
#     }), 201

# # Create a comment on a post
# @post_routes.route('/posts/<int:post_id>/comments', methods=['POST'])
# @token_required
# def create_comment(post_id):
#     data = request.json
#     post = Post.query.get_or_404(post_id)  # Get the post or return 404
#     comment = Comment(
#         body=data.get("content"),
#         post_id=post.id,
#         profile_id=request.user.profile.id  # Assuming you have user info in the request
#     )
#     db.session.add(comment)
#     db.session.commit()
#     return jsonify({
#         "id": comment.id,
#         "content": comment.body,
#         "username": request.user.profile.name,  # Assuming profile has a name field
#         "createdAt": comment.created_at.isoformat()
#     }), 201

# # Upvote a post
# @post_routes.route('/posts/<int:post_id>/upvote', methods=['POST'])
# def upvote_post(post_id):
#     post = Post.query.get_or_404(post_id)
#     # Implement your voting logic here
#     return jsonify({"message": "Post upvoted!"}), 200

# # Downvote a post
# @post_routes.route('/posts/<int:post_id>/downvote', methods=['POST'])
# def downvote_post(post_id):
#     post = Post.query.get_or_404(post_id)
#     # Implement your voting logic here
#     return jsonify({"message": "Post downvoted!"}), 200


from flask import Blueprint, request, jsonify
from model import Post 
from app import db

post_bp = Blueprint('post', __name__)

@post_bp.route('/', methods=['POST'])
def create_post():
    data = request.json
    new_post = Post(title=data['title'], content=data['content'], user_id=data['user_id'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Post created successfully'}), 201

@post_bp.route('/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    return jsonify(post.to_dict()), 200