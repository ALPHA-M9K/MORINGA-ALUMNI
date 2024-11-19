import React from "react";

function Notifications() {
  const notifications = [
    { id: 1, message: "John Doe liked your post" },
    { id: 2, message: "Jane Smith started following you" },
    { id: 3, message: "Your post was shared by Mike" },
    { id: 4, message: "Anna commented on your photo" },
    { id: 5, message: "You have a new message from Mark" },
    { id: 6, message: "Your profile was updated successfully" },
    { id: 7, message: "You have a new friend request" },
  ];

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>

      {/* Notifications list */}
      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <p>{notification.message}</p>
            </div>
          ))
        ) : (
          <p>No notifications</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
