# resources.py
from flask_restful import Resource, reqparse, abort, fields, marshal_with
from models import User, Group, Post, Fundraiser, Notification
from models import db
from flask_jwt_extended import jwt_required, get_jwt_identity,create_access_token
from datetime import datetime
from datetime import timedelta

# Request parsers
user_parser = reqparse.RequestParser()
user_parser.add_argument('username', type=str, required=True, help='Username is required')
user_parser.add_argument('email', type=str, required=True, help='Email is required')
user_parser.add_argument('password', type=str, required=True, help='Password is required')

group_parser = reqparse.RequestParser()
group_parser.add_argument('name', type=str, required=True, help='Group name is required')
group_parser.add_argument('description', type=str, required=True, help='Description is required')
group_parser.add_argument('is_private', type=bool, default=False)

post_parser = reqparse.RequestParser()
post_parser.add_argument('content', type=str, required=True, help='Content is required')
post_parser.add_argument('group_id', type=int)

fundraiser_parser = reqparse.RequestParser()
fundraiser_parser.add_argument('title', type=str, required=True, help='Title is required')
fundraiser_parser.add_argument('description', type=str, required=True, help='Description is required')
fundraiser_parser.add_argument('target_amount', type=float, required=True, help='Target amount is required')
fundraiser_parser.add_argument('end_date', type=str, required=True, help='End date is required')
fundraiser_parser.add_argument('group_id', type=int, required=True, help='Group ID is required')

donation_parser = reqparse.RequestParser()
donation_parser.add_argument('amount', type=float, required=True, help='Amount is required')


# Request parsers
login_parser = reqparse.RequestParser()
login_parser.add_argument('username', type=str, required=True, help='Username is required')
login_parser.add_argument('password', type=str, required=True, help='Password is required')

registration_parser = reqparse.RequestParser()
registration_parser.add_argument('username', type=str, required=True, help='Username is required')
registration_parser.add_argument('email', type=str, required=True, help='Email is required')
registration_parser.add_argument('password', type=str, required=True, help='Password is required')
registration_parser.add_argument('confirm_password', type=str, required=True, help='Password confirmation is required')



# Response fields
user_fields = {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String,
    'created_at': fields.DateTime
}

group_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'is_private': fields.Boolean,
    'admin_id': fields.Integer,
    'created_at': fields.DateTime
}

post_fields = {
    'id': fields.Integer,
    'content': fields.String,
    'user_id': fields.Integer,
    'group_id': fields.Integer,
    'created_at': fields.DateTime
}

fundraiser_fields = {
    'id': fields.Integer,
    'title': fields.String,
    'description': fields.String,
    'target_amount': fields.Float,
    'current_amount': fields.Float,
    'end_date': fields.DateTime,
    'group_id': fields.Integer,
    'created_at': fields.DateTime
}

class LoginResource(Resource):
    def post(self):
        args = login_parser.parse_args()
        
        user = User.query.filter_by(username=args['username']).first()
        if not user or not user.check_password(args['password']):
            return {'message': 'Invalid username or password'}, 401
        
        # Create access token with 1 day expiration
        access_token = create_access_token(
            identity=user.id,
            expires_delta=timedelta(days=1)
        )
        
        return {
            'message': 'Login successful',
            'access_token': access_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }

class RegistrationResource(Resource):
    def post(self):
        args = registration_parser.parse_args()
        
        # Validate password confirmation
        if args['password'] != args['confirm_password']:
            return {'message': 'Passwords do not match'}, 400
            
        # Check if username already exists
        if User.query.filter_by(username=args['username']).first():
            return {'message': 'Username already exists'}, 400
            
        # Check if email already exists
        if User.query.filter_by(email=args['email']).first():
            return {'message': 'Email already exists'}, 400
        
        # Create new user
        user = User(
            username=args['username'],
            email=args['email']
        )
        user.set_password(args['password'])
        
        # Save to database
        try:
            db.session.add(user)
            db.session.commit()
            
            # Create access token for automatic login
            access_token = create_access_token(
                identity=user.id,
                expires_delta=timedelta(days=1)
            )
            
            return {
                'message': 'Registration successful',
                'access_token': access_token,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }, 201
            
        except Exception as e:
            db.session.rollback()
            return {'message': 'Error creating user'}, 500



# User resources
class UserResource(Resource):
    @marshal_with(user_fields)
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        return user

    @jwt_required()
    @marshal_with(user_fields)
    def put(self, user_id):
        if user_id != get_jwt_identity():
            abort(403, message="Not authorized")
        args = user_parser.parse_args()
        user = User.query.get_or_404(user_id)
        user.username = args['username']
        user.email = args['email']
        if args['password']:
            user.set_password(args['password'])
        db.session.commit()
        return user

    @jwt_required()
    def delete(self, user_id):
        if user_id != get_jwt_identity():
            abort(403, message="Not authorized")
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully'}

class UserListResource(Resource):
    @marshal_with(user_fields)
    def get(self):
        return User.query.all()

    def post(self):
        args = user_parser.parse_args()
        if User.query.filter_by(username=args['username']).first():
            abort(400, message="Username already exists")
        if User.query.filter_by(email=args['email']).first():
            abort(400, message="Email already exists")
        
        user = User(username=args['username'], email=args['email'])
        user.set_password(args['password'])
        db.session.add(user)
        db.session.commit()
        return {'message': 'User created successfully', 'id': user.id}

# Group resources
class GroupResource(Resource):
    @marshal_with(group_fields)
    def get(self, group_id):
        return Group.query.get_or_404(group_id)

    @jwt_required()
    @marshal_with(group_fields)
    def put(self, group_id):
        group = Group.query.get_or_404(group_id)
        if group.admin_id != get_jwt_identity():
            abort(403, message="Not authorized")
        args = group_parser.parse_args()
        group.name = args['name']
        group.description = args['description']
        group.is_private = args['is_private']
        db.session.commit()
        return group

    @jwt_required()
    def delete(self, group_id):
        group = Group.query.get_or_404(group_id)
        if group.admin_id != get_jwt_identity():
            abort(403, message="Not authorized")
        db.session.delete(group)
        db.session.commit()
        return {'message': 'Group deleted successfully'}

class GroupListResource(Resource):
    @marshal_with(group_fields)
    def get(self):
        return Group.query.all()

    @jwt_required()
    def post(self):
        args = group_parser.parse_args()
        group = Group(
            name=args['name'],
            description=args['description'],
            is_private=args['is_private'],
            admin_id=get_jwt_identity()
        )
        db.session.add(group)
        db.session.commit()
        return {'message': 'Group created successfully', 'id': group.id}

# Post resources
class PostResource(Resource):
    @marshal_with(post_fields)
    def get(self, post_id):
        return Post.query.get_or_404(post_id)

    @jwt_required()
    @marshal_with(post_fields)
    def put(self, post_id):
        post = Post.query.get_or_404(post_id)
        if post.user_id != get_jwt_identity():
            abort(403, message="Not authorized")
        args = post_parser.parse_args()
        post.content = args['content']
        db.session.commit()
        return post

    @jwt_required()
    def delete(self, post_id):
        post = Post.query.get_or_404(post_id)
        if post.user_id != get_jwt_identity():
            abort(403, message="Not authorized")
        db.session.delete(post)
        db.session.commit()
        return {'message': 'Post deleted successfully'}

class PostListResource(Resource):
    @marshal_with(post_fields)
    def get(self):
        return Post.query.all()

    @jwt_required()
    def post(self):
        args = post_parser.parse_args()
        post = Post(
            content=args['content'],
            user_id=get_jwt_identity(),
            group_id=args['group_id']
        )
        db.session.add(post)
        db.session.commit()
        return {'message': 'Post created successfully', 'id': post.id}

# Fundraiser resources
class FundraiserResource(Resource):
    @marshal_with(fundraiser_fields)
    def get(self, fundraiser_id):
        return Fundraiser.query.get_or_404(fundraiser_id)

    @jwt_required()
    @marshal_with(fundraiser_fields)
    def put(self, fundraiser_id):
        fundraiser = Fundraiser.query.get_or_404(fundraiser_id)
        group = Group.query.get_or_404(fundraiser.group_id)
        if group.admin_id != get_jwt_identity():
            abort(403, message="Not authorized")
        args = fundraiser_parser.parse_args()
        fundraiser.title = args['title']
        fundraiser.description = args['description']
        fundraiser.target_amount = args['target_amount']
        fundraiser.end_date = datetime.strptime(args['end_date'], '%Y-%m-%d')
        db.session.commit()
        return fundraiser

class FundraiserListResource(Resource):
    @marshal_with(fundraiser_fields)
    def get(self):
        return Fundraiser.query.all()

    @jwt_required()
    def post(self):
        args = fundraiser_parser.parse_args()
        group = Group.query.get_or_404(args['group_id'])
        if group.admin_id != get_jwt_identity():
            abort(403, message="Not authorized")
        fundraiser = Fundraiser(
            title=args['title'],
            description=args['description'],
            target_amount=args['target_amount'],
            end_date=datetime.strptime(args['end_date'], '%Y-%m-%d'),
            group_id=args['group_id']
        )
        db.session.add(fundraiser)
        db.session.commit()
        return {'message': 'Fundraiser created successfully', 'id': fundraiser.id}

# Donation endpoint
class DonateResource(Resource):
    @jwt_required()
    def post(self, fundraiser_id):
        fundraiser = Fundraiser.query.get_or_404(fundraiser_id)
        args = donation_parser.parse_args()
        fundraiser.current_amount += args['amount']
        db.session.commit()
        return {'message': 'Donation successful', 'current_amount': fundraiser.current_amount}

