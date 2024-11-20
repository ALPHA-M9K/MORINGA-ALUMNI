from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from .config import Config

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Register Blueprints
    from .routes import auth_routes, user_routes, group_routes, post_routes, notification_routes
    app.register_blueprint(auth_routes)
    app.register_blueprint(user_routes)
    app.register_blueprint(group_routes)
    app.register_blueprint(post_routes)
    app.register_blueprint(notification_routes)

    return app
