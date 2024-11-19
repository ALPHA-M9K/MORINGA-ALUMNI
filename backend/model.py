from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    role = db.Column(db.String(20), nullable=False, default='user')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship with Profile
    profile = db.relationship('Profile', uselist=False, back_populates='user')

    def set_password(self, password):
        """Set hashed password"""
        self.password = generate_password_hash(password)

    def check_password(self, raw_password):
        """Check if provided password is correct"""
        return check_password_hash(self.password, raw_password)

    def to_dict(self):
        """Convert user to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'role': self.role
        }

# Extend the existing Profile model to link with User
class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    bio = db.Column(db.Text)
    location = db.Column(db.String)
    skills = db.Column(db.Text)
    interests = db.Column(db.Text)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship with User
    user = db.relationship('User', back_populates='profile')

    # Existing relationships
    posts = db.relationship('Post', backref='profile', lazy=True)
    success_stories = db.relationship('SuccessStory', backref='profile', lazy=True)
    fundraisers = db.relationship('Fundraiser', backref='profile', lazy=True)
    notifications = db.relationship('Notification', backref='profile', lazy=True)
    cohort_memberships = db.relationship('CohortMembership', backref='profile', lazy=True)

    def to_dict(self):
        """Convert profile to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'bio': self.bio,
            'location': self.location,
            'skills': self.skills,
            'interests': self.interests,
            'joined_at': self.joined_at.isoformat() if self.joined_at else None
        }
    
# Cohorts Model
class Cohort(db.Model):
    __tablename__ = 'cohorts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    description = db.Column(db.Text)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    admin_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=False)

    memberships = db.relationship('CohortMembership', backref='cohort', lazy=True)


# Cohort Membership Model
class CohortMembership(db.Model):
    __tablename__ = 'cohort_memberships'

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=False)
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohorts.id'), nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)


# Fundraisers Model
class Fundraiser(db.Model):
    __tablename__ = 'fundraisers'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    goal_amount = db.Column(db.Numeric, nullable=False)
    raised_amount = db.Column(db.Numeric, default=0)
    created_by = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    contributors = db.relationship('FundraiserContribution', backref='fundraiser', lazy=True)


# Fundraiser Contribution Model
class FundraiserContribution(db.Model):
    __tablename__ = 'fundraiser_contributions'

    id = db.Column(db.Integer, primary_key=True)
    fundraiser_id = db.Column(db.Integer, db.ForeignKey('fundraisers.id'), nullable=False)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=False)
    amount = db.Column(db.Numeric, nullable=False)
    contributed_at = db.Column(db.DateTime, default=datetime.utcnow)


# Notifications Model
class Notification(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# Posts Model
class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    comments = db.relationship('Comment', backref='post', lazy=True)


# Comments on Posts
class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# Success Stories Model
class SuccessStory(db.Model):
    __tablename__ = 'success_stories'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    story = db.Column(db.Text, nullable=False)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# Search Model (optional as logs or keywords)
class SearchLog(db.Model):
    __tablename__ = 'search_logs'

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=True)
    query = db.Column(db.String, nullable=False)
    searched_at = db.Column(db.DateTime, default=datetime.utcnow)
