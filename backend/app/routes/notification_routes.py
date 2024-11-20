from flask import Blueprint, jsonify
from app.models.notification import Notification

notification_routes = Blueprint('notification_routes', __name__)

@notification_routes.route('/notifications', methods=['GET'])
def get_notifications():
    notifications = Notification.query.all()
    return jsonify([{"id": n.id, "message": n.message, "user_id": n.user_id} for n in notifications])
