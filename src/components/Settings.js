import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "../App.css";

function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [languages, setLanguages] = useState("English");
  const [communication, setCommunication] = useState("Email");
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [notificationPreference, setNotificationPreference] =
    useState("follow");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "John Doe liked your post", timestamp: new Date() },
    {
      id: 2,
      message: "Jane Smith started following you",
      timestamp: new Date(),
    },
    { id: 3, message: "Your post was shared by Mike", timestamp: new Date() },
  ]);
  const [isPremium, setIsPremium] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  const handleLanguageChange = (event) => {
    setLanguages(event.target.value);
    localStorage.setItem("language", event.target.value);
  };

  const handleCommunicationChange = (event) => {
    setCommunication(event.target.value);
    localStorage.setItem("communication", event.target.value);
  };

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;
    if (name === "receiveNotifications") {
      setReceiveNotifications(checked);
    }
  };

  const handleNotificationPreferenceChange = (event) => {
    setNotificationPreference(event.target.value);
  };

  const handleUpgradeToPremium = () => {
    
    setIsPremium(true); 
    alert("You've upgraded to Premium!");
  };

  const handleLogout = () => {
    alert("Logged out");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLanguage = localStorage.getItem("language");
    const savedCommunication = localStorage.getItem("communication");

    if (savedTheme) setIsDarkMode(savedTheme === "dark");
    if (savedLanguage) setLanguages(savedLanguage);
    if (savedCommunication) setCommunication(savedCommunication);
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="settings-button">
        ⚙️
      </button>

      {isOpen && (
        <div className="settings-dropdown">
          <div className="settings-content">
            <h3 className="settings-title">Settings</h3>

            <div className="setting-section">
              <h4 className="setting-title">Theme</h4>
              <label className="setting-option">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  className="form-checkbox"
                />
                <span>Dark Mode</span>
              </label>
            </div>

            <div className="setting-section">
              <h4 className="setting-title">Language</h4>
              <select
                value={languages}
                onChange={handleLanguageChange}
                className="setting-select"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>

            <div className="setting-section">
              <h4 className="setting-title">Communication Preference</h4>
              <select
                value={communication}
                onChange={handleCommunicationChange}
                className="setting-select"
              >
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Phone">Phone</option>
              </select>
            </div>

            <div className="setting-section">
              <h4 className="setting-title">Notification Preferences</h4>
              <label className="setting-option">
                <input
                  type="checkbox"
                  name="receiveNotifications"
                  checked={receiveNotifications}
                  onChange={handleNotificationChange}
                  className="form-checkbox"
                />
                <span>Receive Notifications</span>
              </label>
              {receiveNotifications && (
                <div className="notification-preferences">
                  <label className="setting-option">
                    <input
                      type="radio"
                      value="follow"
                      checked={notificationPreference === "follow"}
                      onChange={handleNotificationPreferenceChange}
                      className="form-radio"
                    />
                    <span>From People I Follow</span>
                  </label>
                  <label className="setting-option">
                    <input
                      type="radio"
                      value="anyone"
                      checked={notificationPreference === "anyone"}
                      onChange={handleNotificationPreferenceChange}
                      className="form-radio"
                    />
                    <span>From Anyone</span>
                  </label>
                </div>
              )}
            </div>

            {/* Notifications Display */}
            <div className="setting-section">
              <h4 className="setting-title">Notifications</h4>
              <div className="notifications-box">
                {notifications.map((notification) => (
                  <div key={notification.id} className="notification-item">
                    {notification.message}
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade to Premium Section */}
            <div className="setting-section">
              <h4 className="setting-title">Upgrade to Premium</h4>
              <Link to="/payment-plans">
                <button className="upgrade-button">Upgrade Now</button>
              </Link>
              {isPremium && <p>You are a Premium member now!</p>}
            </div>

            {/* Logout Button */}
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
