import bcrypt
from datetime import datetime
from sqlalchemy import MetaData, Enum, Text, types, func, Column, Float, ForeignKey, Integer, String, DateTime
from flask_sqlalchemy import SQLAlchemy

metadata = MetaData()

db = SQLAlchemy(metadata=metadata)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    posts = db.relationship('Post', backref='author', lazy=True)
    notifications = db.relationship('Notification', backref='user', lazy=True)
    administered_groups = db.relationship('Group', backref='admin', lazy=True)
    
    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

    def to_dict(self, include_relationships=False):
        data = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
        if include_relationships:
            data.update({
                'posts': [post.to_dict() for post in self.posts],
                'notifications': [notification.to_dict() for notification in self.notifications],
                'administered_groups': [group.to_dict() for group in self.administered_groups]
            })
        return data

class Group(db.Model):
    __tablename__ = 'groups'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    is_private = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    admin_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Relationships
    posts = db.relationship('Post', backref='group', lazy=True)
    fundraisers = db.relationship('Fundraiser', backref='group', lazy=True)

    def to_dict(self, include_relationships=False):
        data = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'is_private': self.is_private,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'admin_id': self.admin_id
        }
        if include_relationships:
            data.update({
                'posts': [post.to_dict() for post in self.posts],
                'fundraisers': [fundraiser.to_dict() for fundraiser in self.fundraisers],
                'admin': self.admin.to_dict() if self.admin else None
            })
        return data

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=True)

    def to_dict(self, include_relationships=False):
        data = {
            'id': self.id,
            'content': self.content,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'user_id': self.user_id,
            'group_id': self.group_id
        }
        if include_relationships:
            data.update({
                'author': self.author.to_dict() if self.author else None,
                'group': self.group.to_dict() if self.group else None
            })
        return data

class Fundraiser(db.Model):
    __tablename__ = 'fundraisers'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    target_amount = db.Column(db.Float, nullable=False)
    current_amount = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)

    def to_dict(self, include_relationships=False):
        data = {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'target_amount': self.target_amount,
            'current_amount': self.current_amount,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'group_id': self.group_id
        }
        if include_relationships:
            data.update({
                'group': self.group.to_dict() if self.group else None
            })
        return data

class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_read = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self, include_relationships=False):
        data = {
            'id': self.id,
            'message': self.message,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'is_read': self.is_read,
            'user_id': self.user_id
        }
        if include_relationships:
            data.update({
                'user': self.user.to_dict() if self.user else None
            })
        return data
        
        
# Association tables for many-to-many relationships
group_members = db.Table('group_members',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('group_id', db.Integer, db.ForeignKey('groups.id'), primary_key=True),
    db.Column('joined_at', db.DateTime, default=datetime.utcnow)
)

fundraiser_donations = db.Table('fundraiser_donations',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('fundraiser_id', db.Integer, db.ForeignKey('fundraisers.id'), primary_key=True),
    db.Column('amount', db.Float, nullable=False),
    db.Column('donated_at', db.DateTime, default=datetime.utcnow)
)