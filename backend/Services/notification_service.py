from datetime import datetime
from model import db, Notification, User
from Services.email_service import send_email  # Assuming you have an email service

class NotificationService:
    @staticmethod
    def create_notification(user_id, message, method="email"):
        """
        Create and optionally send a notification to a user.
        
        Args:
            user_id (int): The ID of the user to notify.
            message (str): The notification message.
            method (str): The method of notification ("email", "app", etc.).
        """
        # Store the notification in the database
        notification = Notification(
            user_id=user_id,
            message=message,
            created_at=datetime.utcnow()
        )
        db.session.add(notification)
        db.session.commit()

        # Optionally send email notifications
        if method == "email":
            NotificationService.send_email_notification(user_id, message)

    @staticmethod
    def send_email_notification(user_id, message):
        """
        Send an email notification to a user.
        
        Args:
            user_id (int): The ID of the user to notify.
            message (str): The email body.
        """
        # Get the user's email (assuming a User model exists with an email field)
        user = User.query.get(user_id)
        if user and user.email:
            send_email(to=user.email, subject="New Notification", body=message)
        else:
            print(f"User {user_id} not found or has no email.")

    @staticmethod
    def get_user_notifications(user_id):
        """
        Retrieve notifications for a specific user.
        
        Args:
            user_id (int): The ID of the user.
        
        Returns:
            list: List of notifications for the user.
        """
        notifications = Notification.query.filter_by(user_id=user_id).all()
        return notifications
