# app.py
from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from flask_restful import Api
from models import db, User, Group, Post, Fundraiser, Notification
from resourses import UserListResource, UserResource, GroupListResource,GroupResource, PostListResource, PostResource, FundraiserListResource, FundraiserResource, DonateResource, RegistrationResource,LoginResource


# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure database
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-here')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///moringa.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
CORS(app)
api = Api(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)


db.init_app(app)



# Login endpoint
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    
    if user and user.check_password(data.get('password')):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user_id': user.id,
            'username': user.username
        })
    return jsonify({'error': 'Invalid credentials'}), 401

# Basic error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# Basic routes
@app.route('/')
def home():
    return jsonify({'message': 'Welcome to Moringa Alumni API'})




# Register resources
api.add_resource(UserListResource, '/api/users')
api.add_resource(UserResource, '/api/users/<int:user_id>')
api.add_resource(GroupListResource, '/api/groups')
api.add_resource(GroupResource, '/api/groups/<int:group_id>')
api.add_resource(PostListResource, '/api/posts')
api.add_resource(PostResource, '/api/posts/<int:post_id>')
api.add_resource(FundraiserListResource, '/api/fundraisers')
api.add_resource(FundraiserResource, '/api/fundraisers/<int:fundraiser_id>')
api.add_resource(DonateResource, '/api/fundraisers/<int:fundraiser_id>/donate')
api.add_resource(LoginResource, '/api/auth/login')
api.add_resource(RegistrationResource, '/api/auth/register')



if __name__ == '__main__':
    app.run(debug=True)