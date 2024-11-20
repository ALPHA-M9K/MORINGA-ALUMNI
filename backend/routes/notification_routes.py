from flask import Flask, request, jsonify
from model import db
from Services.notification_service import NotificationService

app = Flask(__name__)

@app.route('/notifications', methods=['POST'])
def create_notification():
    """
    Endpoint to create a notification for a user.
    Request Body:
    {
        "user_id": int,
        "message": str
    }
    """
    data = request.get_json()
    user_id = data.get('user_id')
    message = data.get('message')

    if not user_id or not message:
        return jsonify({"error": "user_id and message are required"}), 400

    try:
        NotificationService.create_notification(user_id, message)
        return jsonify({"message": "Notification created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/notifications/<int:user_id>', methods=['GET'])
def get_notifications(user_id):
    """
    Endpoint to retrieve notifications for a specific user.
    URL Parameter:
    - user_id (int): The ID of the user.

    Response:
    [
        {
            "id": int,
            "user_id": int,
            "message": str,
            "created_at": str
        }
    ]
    """
    try:
        notifications = NotificationService.get_user_notifications(user_id)
        notifications_list = [
            {
                "id": n.id,
                "user_id": n.user_id,
                "message": n.message,
                "created_at": n.created_at.isoformat()
            }
            for n in notifications
        ]
        return jsonify(notifications_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
