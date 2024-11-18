from flask import Flask
from model import db, Profile, Cohort, CohortMembership, Fundraiser, FundraiserContribution, Notification, Post, Comment, SuccessStory, SearchLog

app = Flask(__name__)

# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'  # Use SQLite for testing
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
