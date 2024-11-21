from datetime import datetime, timedelta
from app import app, db
from models import User, Group, Post, Fundraiser, Notification
import bcrypt

def seed_database():
    # Clear existing data
    db.drop_all()
    db.create_all()

    # Create 5 users
    users = [
        User(
            username="john_doe",
            email="john@example.com",
            created_at=datetime.utcnow()
        ),
        User(
            username="jane_smith",
            email="jane@example.com",
            created_at=datetime.utcnow()
        ),
        User(
            username="mike_wilson",
            email="mike@example.com",
            created_at=datetime.utcnow()
        ),
        User(
            username="sarah_brown",
            email="sarah@example.com",
            created_at=datetime.utcnow()
        ),
        User(
            username="alex_green",
            email="alex@example.com",
            created_at=datetime.utcnow()
        )
    ]

    # Set passwords for all users
    for user in users:
        user.set_password("password123")
        db.session.add(user)

    db.session.commit()

    # Create 5 groups
    groups = [
        Group(
            name="Tech Alumni",
            description="Group for technology graduates",
            is_private=False,
            admin_id=users[0].id,
            created_at=datetime.utcnow()
        ),
        Group(
            name="Business Network",
            description="Network for business professionals",
            is_private=True,
            admin_id=users[1].id,
            created_at=datetime.utcnow()
        ),
        Group(
            name="Data Science Hub",
            description="Community for data scientists",
            is_private=False,
            admin_id=users[2].id,
            created_at=datetime.utcnow()
        ),
        Group(
            name="Design Circle",
            description="Group for design enthusiasts",
            is_private=False,
            admin_id=users[3].id,
            created_at=datetime.utcnow()
        ),
        Group(
            name="Entrepreneurship Club",
            description="Platform for entrepreneurs",
            is_private=True,
            admin_id=users[4].id,
            created_at=datetime.utcnow()
        )
    ]

    for group in groups:
        db.session.add(group)

    db.session.commit()

    # Create 5 posts
    posts = [
        Post(
            content="Excited to share my latest tech project!",
            user_id=users[0].id,
            group_id=groups[0].id,
            created_at=datetime.utcnow()
        ),
        Post(
            content="Looking for business collaboration opportunities",
            user_id=users[1].id,
            group_id=groups[1].id,
            created_at=datetime.utcnow()
        ),
        Post(
            content="New data analysis techniques workshop next week",
            user_id=users[2].id,
            group_id=groups[2].id,
            created_at=datetime.utcnow()
        ),
        Post(
            content="Design thinking workshop registration open",
            user_id=users[3].id,
            group_id=groups[3].id,
            created_at=datetime.utcnow()
        ),
        Post(
            content="Startup funding workshop this weekend",
            user_id=users[4].id,
            group_id=groups[4].id,
            created_at=datetime.utcnow()
        )
    ]

    for post in posts:
        db.session.add(post)

    db.session.commit()

    # Create 5 fundraisers
    fundraisers = [
        Fundraiser(
            title="Tech Innovation Fund",
            description="Supporting innovative tech projects",
            target_amount=10000.0,
            current_amount=5000.0,
            group_id=groups[0].id,
            end_date=datetime.utcnow() + timedelta(days=30),
            created_at=datetime.utcnow()
        ),
        Fundraiser(
            title="Business Mentorship Program",
            description="Funding for mentorship initiatives",
            target_amount=15000.0,
            current_amount=7500.0,
            group_id=groups[1].id,
            end_date=datetime.utcnow() + timedelta(days=45),
            created_at=datetime.utcnow()
        ),
        Fundraiser(
            title="Data Science Scholarship",
            description="Supporting aspiring data scientists",
            target_amount=20000.0,
            current_amount=10000.0,
            group_id=groups[2].id,
            end_date=datetime.utcnow() + timedelta(days=60),
            created_at=datetime.utcnow()
        ),
        Fundraiser(
            title="Design Workshop Series",
            description="Funding for design education",
            target_amount=8000.0,
            current_amount=3000.0,
            group_id=groups[3].id,
            end_date=datetime.utcnow() + timedelta(days=30),
            created_at=datetime.utcnow()
        ),
        Fundraiser(
            title="Startup Seed Fund",
            description="Supporting early-stage startups",
            target_amount=25000.0,
            current_amount=12500.0,
            group_id=groups[4].id,
            end_date=datetime.utcnow() + timedelta(days=90),
            created_at=datetime.utcnow()
        )
    ]

    for fundraiser in fundraisers:
        db.session.add(fundraiser)

    db.session.commit()

    # Create 5 notifications
    notifications = [
        Notification(
            message="Welcome to Tech Alumni group!",
            user_id=users[0].id,
            is_read=False,
            created_at=datetime.utcnow()
        ),
        Notification(
            message="Your post received 10 likes",
            user_id=users[1].id,
            is_read=True,
            created_at=datetime.utcnow()
        ),
        Notification(
            message="New donation received for your fundraiser",
            user_id=users[2].id,
            is_read=False,
            created_at=datetime.utcnow()
        ),
        Notification(
            message="Workshop registration confirmed",
            user_id=users[3].id,
            is_read=True,
            created_at=datetime.utcnow()
        ),
        Notification(
            message="New member joined your group",
            user_id=users[4].id,
            is_read=False,
            created_at=datetime.utcnow()
        )
    ]

    for notification in notifications:
        db.session.add(notification)

    db.session.commit()

    print("Database seeded successfully!")

if __name__ == '__main__':
    with app.app_context():
        seed_database()