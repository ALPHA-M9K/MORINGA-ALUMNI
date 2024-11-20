from flask import Blueprint, jsonify
from Services.notification_service import NotificationService,Notification
from routes import app

# Initialize Blueprint for notifications
notification_bp = Blueprint('notification_bp', __name__)

# Route to get all notifications for a user
@notification_bp.route('/notifications/<int:user_id>', methods=['GET'])
def get_notifications(user_id):
    notifications = NotificationService.get_user_notifications(user_id)
    return jsonify([{
        'id': n.id,
        'message': n.message,
        'created_at': n.created_at,
        'is_read': n.is_read
    } for n in notifications])

# Route to mark notification as read
@notification_bp.route('/notifications/mark_read/<int:notification_id>', methods=['POST'])
def mark_as_read(notification_id):
    notification = Notification.query.get(notification_id)
    if notification:
        notification.is_read = True
        db.session.commit()
        return jsonify({'message': 'Notification marked as read.'})
    return jsonify({'error': 'Notification not found.'}), 404
