from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize the database
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')  # Load configuration from config.py
    CORS(app)  # Enable CORS

    db.init_app(app)  # Initialize the database with the app

    # Register blueprints for routes
    from routes.auth_routes import auth_bp
    from routes.user_routes import user_bp
    from routes.cohort_routes import cohort_bp
    from routes.group_routes import group_bp
    from routes.post_routes import post_bp
    from routes.fundraiser_routes import fundraiser_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(cohort_bp, url_prefix='/api/cohorts')
    app.register_blueprint(group_bp, url_prefix='/api/groups')
    app.register_blueprint(post_bp, url_prefix='/api/posts')
    app.register_blueprint(fundraiser_bp, url_prefix='/api/fundraisers')

    return app