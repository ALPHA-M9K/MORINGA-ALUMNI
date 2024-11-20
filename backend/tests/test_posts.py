import unittest
from app import create_app, db
from app.models.post import Post
from app.models.user import User
from app.models.group import Group

class TestPosts(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()
            # Create a sample user
            user = User(username="post_user", email="user@example.com")
            user.set_password("password123")
            db.session.add(user)
            db.session.commit()
            self.user_id = user.id

            # Create a sample group
            group = Group(name="Tech Enthusiasts", description="A group for tech lovers.", admin_id=user.id)
            db.session.add(group)
            db.session.commit()
            self.group_id = group.id

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_create_post(self):
        """Test creating a new post."""
        with self.app.app_context():
            response = self.client.post('/posts', json={
                "content": "This is a test post.",
                "user_id": self.user_id,
                "group_id": self.group_id
            })
            self.assertEqual(response.status_code, 201)
            self.assertIn(b"Post created successfully", response.data)

    def test_get_posts(self):
        """Test retrieving posts."""
        with self.app.app_context():
            # Add a post directly to the database
            post = Post(content="Welcome to the group!", user_id=self.user_id, group_id=self.group_id)
            db.session.add(post)
            db.session.commit()

            response = self.client.get('/posts')
            self.assertEqual(response.status_code, 200)
            self.assertIn(b"Welcome to the group!", response.data)

if __name__ == "__main__":
    unittest.main()
