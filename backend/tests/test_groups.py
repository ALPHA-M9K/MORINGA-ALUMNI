import unittest
from app import create_app, db
from app.models.group import Group
from app.models.user import User

class TestGroups(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()
            # Create a sample user to act as an admin
            admin = User(username="admin_user", email="admin@example.com")
            admin.set_password("password123")
            db.session.add(admin)
            db.session.commit()
            self.admin_id = admin.id

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_create_group(self):
        """Test creating a new group."""
        with self.app.app_context():
            response = self.client.post('/groups', json={
                "name": "Tech Enthusiasts",
                "description": "A group for tech lovers.",
                "is_private": False,
                "admin_id": self.admin_id
            })
            self.assertEqual(response.status_code, 201)
            self.assertIn(b"Group created successfully", response.data)

    def test_get_groups(self):
        """Test retrieving groups."""
        with self.app.app_context():
            # Add a group directly to the database
            group = Group(name="Dev Circle", description="Developers community", admin_id=self.admin_id)
            db.session.add(group)
            db.session.commit()

            response = self.client.get('/groups')
            self.assertEqual(response.status_code, 200)
            self.assertIn(b"Dev Circle", response.data)

if __name__ == "__main__":
    unittest.main()
