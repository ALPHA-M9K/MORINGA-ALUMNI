# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
# from flask_cors import CORS
# from flask_mail import Mail
# from flask_marshmallow import Marshmallow


# db = SQLAlchemy()
# bcrypt = Bcrypt()
# ma = Marshmallow()
# mail = Mail()

# def create_app(config_class=Config):
#     app = Flask(__name__)
#     app.config.from_object(config_class)

#     # Initialize extensions
#     db.init_app(app)
#     bcrypt.init_app(app)
#     ma.init_app(app)
#     mail.init_app(app)
#     CORS(app)

#     # Register Blueprints
#     from .routes.auth_routes import auth_bp
#     from .routes.user_routes import user_bp
#     from .routes.cohort_routes import cohort_bp
#     from .routes.group_routes import group_bp
#     from .routes.post_routes import post_bp
#     from .routes.fundraiser_routes import fundraiser_bp

#     app.register_blueprint(auth_bp, url_prefix='/api/auth')
#     app.register_blueprint(user_bp, url_prefix='/api/users')
#     app.register_blueprint(cohort_bp, url_prefix='/api/cohorts')
#     app.register_blueprint(group_bp, url_prefix='/api/groups')
#     app.register_blueprint(post_bp, url_prefix='/api/posts')
#     app.register_blueprint(fundraiser_bp, url_prefix='/api/fundraisers')

#     return app
# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os 
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///Database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.getenv('SECRET_KEY', 'your_secret_key')

db = SQLAlchemy(app)

# Register blueprints
from auth import auth_bp
app.register_blueprint(auth_bp, url_prefix='/api/auth')

# Create database tables
with app.app_context():
    db.create_all()
    