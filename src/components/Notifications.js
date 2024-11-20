import React, { useState } from "react";
import "../App.css";

function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "John Doe liked your post", read: false },
    { id: 2, message: "Jane Smith started following you", read: true },
    { id: 3, message: "Your post was shared by Mike", read: false },
    { id: 4, message: "Anna commented on your photo", read: true },
    { id: 5, message: "You have a new message from Mark", read: false },
    { id: 6, message: "Your profile was updated successfully", read: true },
    { id: 7, message: "You have a new friend request", read: false },
  ]);

  
  const toggleReadStatus = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification
      )
    );
  };

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  );
  const readNotifications = notifications.filter(
    (notification) => notification.read
  );

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>

      <div className="notifications-container">
        <div className="notifications-list unread">
          <h3>Unread Notifications</h3>
          {unreadNotifications.length > 0 ? (
            unreadNotifications.map((notification) => (
              <div
                key={notification.id}
                className="notification-item unread"
                onClick={() => toggleReadStatus(notification.id)}
              >
                <p>{notification.message}</p>
              </div>
            ))
          ) : (
            <p>No unread notifications</p>
          )}
        </div>

        <div className="notifications-list read">
          <h3>Read Notifications</h3>
          {readNotifications.length > 0 ? (
            readNotifications.map((notification) => (
              <div
                key={notification.id}
                className="notification-item read"
                onClick={() => toggleReadStatus(notification.id)}
              >
                <p>{notification.message}</p>
              </div>
            ))
          ) : (
            <p>No read notifications</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;

