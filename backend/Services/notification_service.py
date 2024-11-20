from datetime import datetime
from model import db, Notification, User

class NotificationService:
    @staticmethod
    def create_notification(user_id, message, method="app"):
        """
        Create a notification and optionally specify a notification method.
        
        Args:
            user_id (int): The ID of the user to notify.
            message (str): The notification message.
            method (str): The method of notification ("app", etc.). Default is "app".
        """
        try:
            # Store the notification in the database
            notification = Notification(
                user_id=user_id,
                message=message,
                created_at=datetime.utcnow()
            )
            db.session.add(notification)
            db.session.commit()
            print(f"Notification created for user {user_id}")
        except Exception as e:
            print(f"Error creating notification: {e}")
            db.session.rollback()

    @staticmethod
    def get_user_notifications(user_id):
        """
        Retrieve notifications for a specific user.
        
        Args:
            user_id (int): The ID of the user.
        
        Returns:
            list: List of notifications for the user.
        """
        try:
            notifications = Notification.query.filter_by(user_id=user_id).all()
            return notifications
        except Exception as e:
            print(f"Error retrieving notifications for user {user_id}: {e}")
            return []
