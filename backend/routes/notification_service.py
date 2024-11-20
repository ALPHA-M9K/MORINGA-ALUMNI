from app.models import Notification, db
from app.services.email_service import send_email
from datetime import datetime


class NotificationService:
    @staticmethod
    def create_notification(user_id, title, message, method="email"):
        """
        Create and optionally send a notification to a user.
        
        Args:
            user_id (int): The ID of the user to notify.
            title (str): The title of the notification.
            message (str): The notification message.
            method (str): The method of notification ("email", "app", etc.).
        """
        # Store the notification in the database
        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
            method=method,
            created_at=datetime.utcnow(),
        )
        db.session.add(notification)
        db.session.commit()
        
        # Optionally send email notifications
        if method == "email":
            NotificationService.send_email_notification(user_id, title, message)

    @staticmethod
    def send_email_notification(user_id, title, message):
        """
        Send an email notification to a user.
        
        Args:
            user_id (int): The ID of the user to notify.
            title (str): The email subject.
            message (str): The email body.
        """
        # Get the user's email (assuming a User model exists with an email field)
        user = db.session.query(User).filter_by(id=user_id).first()
        if not user or not user.email:
            print(f"Failed to send email: User with ID {user_id} not found or has no email.")
            return
        
        # Use the email service to send the email
        send_email(to=user.email, subject=title, body=message)

    @staticmethod
    def get_user_notifications(user_id):
        """
        Retrieve notifications for a specific user.
        
        Args:
            user_id (int): The ID of the user.
        
        Returns:
            list: List of notifications for the user.
        """
        notifications = db.session.query(Notification).filter_by(user_id=user_id).all()
        return notifications
