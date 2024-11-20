// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import "../App.css";

// // function Settings() {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [isDarkMode, setIsDarkMode] = useState(false);
// //   const [communication, setCommunication] = useState("Email");
// //   const [receiveNotifications, setReceiveNotifications] = useState(true);
// //   const [notificationFrequency, setNotificationFrequency] =
// //     useState("Immediate");
// //   const [notificationPriority, setNotificationPriority] = useState("High");
// //   const [isPremium, setIsPremium] = useState(false);
// //   const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false); // State for 2FA
// //   const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number input
// //   const [isPhoneNumberSubmitted, setIsPhoneNumberSubmitted] = useState(false); // State to track phone number submission
// //   const [currentTime, setCurrentTime] = useState(
// //     new Date().toLocaleTimeString()
// //   ); 

// //   const toggleDropdown = () => {
// //     setIsOpen(!isOpen);
// //   };

// //   const toggleTheme = () => {
// //     const newTheme = isDarkMode ? "light" : "dark";
// //     setIsDarkMode(!isDarkMode);
// //     document.body.className = newTheme;
// //     localStorage.setItem("theme", newTheme);
// //   };

// //   const handleCommunicationChange = (event) => {
// //     setCommunication(event.target.value);
// //     localStorage.setItem("communication", event.target.value);
// //   };

// //   const handleNotificationChange = (event) => {
// //     const { name, checked } = event.target;
// //     if (name === "receiveNotifications") {
// //       setReceiveNotifications(checked);
// //     }
// //   };

// //   const handleNotificationFrequencyChange = (event) => {
// //     setNotificationFrequency(event.target.value);
// //   };

// //   const handleNotificationPriorityChange = (event) => {
// //     setNotificationPriority(event.target.value);
// //   };

// //   const handleUpgradeToPremium = () => {
// //     setIsPremium(true);
// //     alert("You've upgraded to Premium!");
// //   };

// //   const handleLogout = () => {
// //     alert("Logged out");
// //   };

// //   const handleTwoFactorToggle = () => {
// //     setIsTwoFactorEnabled(!isTwoFactorEnabled); 
// //   };

// //   const handlePhoneNumberChange = (event) => {
// //     setPhoneNumber(event.target.value);
// //   };

// //   const handlePhoneNumberSubmit = () => {
// //     setIsPhoneNumberSubmitted(true); 
// //   };

  
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setCurrentTime(new Date().toLocaleTimeString());
// //     }, 1000);

    
// //     return () => clearInterval(interval);
// //   }, []);

// //   useEffect(() => {
// //     const savedTheme = localStorage.getItem("theme");
// //     const savedCommunication = localStorage.getItem("communication");

// //     if (savedTheme) setIsDarkMode(savedTheme === "dark");
// //     if (savedCommunication) setCommunication(savedCommunication);

// //     document.body.className = isDarkMode ? "dark" : "light";
// //   }, [isDarkMode]);

// //   return (
// //     <div className="relative">
// //       {/* Display Current Time at the top of the settings page */}
// //       <div className="current-time">
// //         <p>{currentTime}</p>
// //       </div>

// //       <button onClick={toggleDropdown} className="settings-button">
// //         ⚙️
// //       </button>

// //       {isOpen && (
// //         <div className="settings-dropdown">
// //           <div className="settings-content">
// //             <h3 className="settings-title">Settings</h3>
// //             <div className="setting-section">
// //               <h4 className="setting-title">Theme</h4>
// //               <label className="setting-option">
// //                 <input
// //                   type="checkbox"
// //                   checked={isDarkMode}
// //                   onChange={toggleTheme}
// //                   className="form-checkbox"
// //                 />
// //                 <span>Dark Mode</span>
// //               </label>
// //             </div>
// //             {/* Language is fixed to English */}
// //             <div className="setting-section">
// //               <h4 className="setting-title">Language</h4>
// //               <p>English</p>
// //             </div>
// //             <div className="setting-section">
// //               <h4 className="setting-title">Communication Preference</h4>
// //               <select
// //                 value={communication}
// //                 onChange={handleCommunicationChange}
// //                 className="setting-select"
// //               >
// //                 <option value="Email">Email</option>
// //                 <option value="SMS">SMS</option>
// //               </select>
// //               {/* Conditional input for phone number based on communication preference */}
// //               {communication === "SMS" && !isPhoneNumberSubmitted && (
// //                 <div className="phone-number-input">
// //                   <label className="setting-label">Phone Number</label>
// //                   <input
// //                     type="tel"
// //                     value={phoneNumber}
// //                     onChange={handlePhoneNumberChange}
// //                     placeholder="Enter your phone number"
// //                     className="phone-input"
// //                   />
// //                   <button
// //                     onClick={handlePhoneNumberSubmit}
// //                     className="submit-button"
// //                   >
// //                     Submit
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //             <div className="setting-section">
// //               <h4 className="setting-title">Notification Preferences</h4>
// //               <label className="setting-option">
// //                 <input
// //                   type="checkbox"
// //                   name="receiveNotifications"
// //                   checked={receiveNotifications}
// //                   onChange={handleNotificationChange}
// //                   className="form-checkbox"
// //                 />
// //                 <span>Receive Notifications</span>
// //               </label>
// //               {receiveNotifications && (
// //                 <div className="notification-preferences">
// //                   <div className="setting-section">
// //                     <h4 className="setting-title">Notification Frequency</h4>
// //                     <select
// //                       value={notificationFrequency}
// //                       onChange={handleNotificationFrequencyChange}
// //                       className="setting-select"
// //                     >
// //                       <option value="Immediate">Immediate</option>
// //                       <option value="Daily">Daily</option>
// //                       <option value="Weekly">Weekly</option>
// //                     </select>
// //                     <p>
// //                       <strong>About:</strong> Choose how frequently you would
// //                       like to receive notifications. "Immediate" will send you
// //                       notifications as soon as they occur, "Daily" will send you
// //                       a summary of all notifications once a day, and "Weekly"
// //                       will send you a summary at the end of each week.
// //                     </p>
// //                   </div>
// //                   <div className="setting-section">
// //                     <h4 className="setting-title">Notification Priority</h4>
// //                     <select
// //                       value={notificationPriority}
// //                       onChange={handleNotificationPriorityChange}
// //                       className="setting-select"
// //                     >
// //                       <option value="High">High</option>
// //                       <option value="Medium">Medium</option>
// //                       <option value="Low">Low</option>
// //                     </select>
// //                     <p>
// //                       <strong>About:</strong> Choose the priority of the
// //                       notifications you want to receive. "High" notifications
// //                       are the most important and will be highlighted, "Medium"
// //                       will include regular notifications, and "Low" will include
// //                       less urgent notifications.
// //                     </p>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //             {/* Upgrade to Premium Section */}
// //             {" "}
// //             <div className="setting-section">
// //               {" "}
// //               <h4 className="setting-title">Upgrade to Premium</h4>
// //             {" "}
// //               <Link to="/payment-plans">
// //                 {" "}
// //                 <button className="upgrade-button">Upgrade Now</button>
// //                 {" "}
// //               </Link>{" "}
// //               {isPremium && <p>You are a Premium member now!</p>}
// //             {" "}
// //             </div>
// //             {/* Two-Factor Authentication Section */}
// //             <div className="setting-section">
// //               <h4 className="setting-title">Privacy Settings</h4>
// //               <label className="setting-option">
// //                 <input
// //                   type="checkbox"
// //                   checked={isTwoFactorEnabled}
// //                   onChange={handleTwoFactorToggle}
// //                   className="form-checkbox"
// //                 />
// //                 <span>Enable Two-Factor Authentication (2FA)</span>
// //               </label>
// //               {isTwoFactorEnabled && (
// //                 <div className="two-factor-info">
// //                   <p>
// //                     <strong>Two-Factor Authentication (2FA)</strong> adds an
// //                     extra layer of security to your account. Once enabled, you
// //                     will be required to verify your identity using a mobile
// //                     application (e.g., Google Authenticator or Authy) before
// //                     accessing your account.
// //                   </p>
// //                   <h5>Steps to Set Up 2FA:</h5>
// //                   <ol>
// //                     <li>
// //                       Download a 2FA app like Google Authenticator or Authy on
// //                       your mobile device.
// //                     </li>
// //                     <li>
// //                       Open the app and scan the QR code provided below to link
// //                       it with your account.
// //                     </li>
// //                     <li>
// //                       After linking, enter the verification code provided by the
// //                       app to complete the setup.
// //                     </li>
// //                   </ol>
// //                   <p>
// //                     Notification frequency is set to: {notificationFrequency}.
// //                   </p>
// //                   <p>
// //                     Priority for notifications is set to: {notificationPriority}
// //                     .
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //             {/* Logout Button */}
// //             <div className="setting-section">
// //               <button onClick={handleLogout} className="logout-button">
// //                 Logout
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Settings;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../App.css";

// function Settings() {
//   const [isOpen, setIsOpen] = useState(true); // Ensure dropdown is always open
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [communication, setCommunication] = useState("Email");
//   const [receiveNotifications, setReceiveNotifications] = useState(true);
//   const [notificationFrequency, setNotificationFrequency] =
//     useState("Immediate");
//   const [notificationPriority, setNotificationPriority] = useState("High");
//   const [isPremium, setIsPremium] = useState(false);
//   const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isPhoneNumberSubmitted, setIsPhoneNumberSubmitted] = useState(false);
//   const [currentTime, setCurrentTime] = useState(
//     new Date().toLocaleTimeString()
//   );

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const toggleTheme = () => {
//     const newTheme = isDarkMode ? "light" : "dark";
//     setIsDarkMode(!isDarkMode);
//     document.body.className = newTheme;
//     localStorage.setItem("theme", newTheme);
//   };

//   const handleCommunicationChange = (event) => {
//     setCommunication(event.target.value);
//     localStorage.setItem("communication", event.target.value);
//   };

//   const handleNotificationChange = (event) => {
//     const { name, checked } = event.target;
//     if (name === "receiveNotifications") {
//       setReceiveNotifications(checked);
//     }
//   };

//   const handleNotificationFrequencyChange = (event) => {
//     setNotificationFrequency(event.target.value);
//   };

//   const handleNotificationPriorityChange = (event) => {
//     setNotificationPriority(event.target.value);
//   };

//   const handleUpgradeToPremium = () => {
//     setIsPremium(true);
//     alert("You've upgraded to Premium!");
//   };

//   const handleLogout = () => {
//     alert("Logged out");
//   };

//   const handleTwoFactorToggle = () => {
//     setIsTwoFactorEnabled(!isTwoFactorEnabled);
//   };

//   const handlePhoneNumberChange = (event) => {
//     setPhoneNumber(event.target.value);
//   };

//   const handlePhoneNumberSubmit = () => {
//     setIsPhoneNumberSubmitted(true);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     const savedCommunication = localStorage.getItem("communication");

//     if (savedTheme) setIsDarkMode(savedTheme === "dark");
//     if (savedCommunication) setCommunication(savedCommunication);

//     document.body.className = isDarkMode ? "dark" : "light";
//   }, [isDarkMode]);

//   return (
//     <div className="relative">
//       <div className="current-time">
//         <p>{currentTime}</p>
//       </div>

//       {/* Always show the dropdown */}
//       {isOpen && (
//         <div className="settings-dropdown">
//           <div className="settings-content">
//             <h3 className="settings-title">Settings</h3>
//             <div className="setting-section">
//               <h4 className="setting-title">Theme</h4>
//               <label className="setting-option">
//                 <input
//                   type="checkbox"
//                   checked={isDarkMode}
//                   onChange={toggleTheme}
//                   className="form-checkbox"
//                 />
//                 <span>Dark Mode</span>
//               </label>
//             </div>
//             <div className="setting-section">
//               <h4 className="setting-title">Language</h4>
//               <p>English</p>
//             </div>
//             <div className="setting-section">
//               <h4 className="setting-title">Communication Preference</h4>
//               <select
//                 value={communication}
//                 onChange={handleCommunicationChange}
//                 className="setting-select"
//               >
//                 <option value="Email">Email</option>
//                 <option value="SMS">SMS</option>
//               </select>
//               {communication === "SMS" && !isPhoneNumberSubmitted && (
//                 <div className="phone-number-input">
//                   <label className="setting-label">Phone Number</label>
//                   <input
//                     type="tel"
//                     value={phoneNumber}
//                     onChange={handlePhoneNumberChange}
//                     placeholder="Enter your phone number"
//                     className="phone-input"
//                   />
//                   <button
//                     onClick={handlePhoneNumberSubmit}
//                     className="submit-button"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               )}
//             </div>
//             <div className="setting-section">
//               <h4 className="setting-title">Notification Preferences</h4>
//               <label className="setting-option">
//                 <input
//                   type="checkbox"
//                   name="receiveNotifications"
//                   checked={receiveNotifications}
//                   onChange={handleNotificationChange}
//                   className="form-checkbox"
//                 />
//                 <span>Receive Notifications</span>
//               </label>
//               {receiveNotifications && (
//                 <div className="notification-preferences">
//                   <div className="setting-section">
//                     <h4 className="setting-title">Notification Frequency</h4>
//                     <select
//                       value={notificationFrequency}
//                       onChange={handleNotificationFrequencyChange}
//                       className="setting-select"
//                     >
//                       <option value="Immediate">Immediate</option>
//                       <option value="Daily">Daily</option>
//                       <option value="Weekly">Weekly</option>
//                     </select>
//                   </div>
//                   <div className="setting-section">
//                     <h4 className="setting-title">Notification Priority</h4>
//                     <select
//                       value={notificationPriority}
//                       onChange={handleNotificationPriorityChange}
//                       className="setting-select"
//                     >
//                       <option value="High">High</option>
//                       <option value="Medium">Medium</option>
//                       <option value="Low">Low</option>
//                     </select>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="setting-section">
//               <h4 className="setting-title">Upgrade to Premium</h4>
//               <Link to="/payment-plans">
//                 <button className="upgrade-button">Upgrade Now</button>
//               </Link>
//               {isPremium && <p>You are a Premium member now!</p>}
//             </div>
//             <div className="setting-section">
//               <h4 className="setting-title">Privacy Settings</h4>
//               <label className="setting-option">
//                 <input
//                   type="checkbox"
//                   checked={isTwoFactorEnabled}
//                   onChange={handleTwoFactorToggle}
//                   className="form-checkbox"
//                 />
//                 <span>Enable Two-Factor Authentication (2FA)</span>
//               </label>
//               {isTwoFactorEnabled && (
//                 <div className="two-factor-info">
//                   <p>
//                     <strong>Two-Factor Authentication (2FA)</strong> adds an
//                     extra layer of security to your account. Once enabled, you
//                     will be required to verify your identity using a mobile
//                     application.
//                   </p>
//                 </div>
//               )}
//             </div>
//             <div className="setting-section">
//               <button onClick={handleLogout} className="logout-button">
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Settings;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Settings() {
  const [isOpen, setIsOpen] = useState(true); // Ensure dropdown is always open
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [communication, setCommunication] = useState("Email");
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [notificationFrequency, setNotificationFrequency] =
    useState("Immediate");
  const [notificationPriority, setNotificationPriority] = useState("High");
  const [isPremium, setIsPremium] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberSubmitted, setIsPhoneNumberSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
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

  const handleNotificationFrequencyChange = (event) => {
    setNotificationFrequency(event.target.value);
  };

  const handleNotificationPriorityChange = (event) => {
    setNotificationPriority(event.target.value);
  };

  const handleUpgradeToPremium = () => {
    setIsPremium(true);
    alert("You've upgraded to Premium!");
  };

  const handleLogout = () => {
    alert("Logged out");
  };

  const handleTwoFactorToggle = () => {
    setIsTwoFactorEnabled(!isTwoFactorEnabled);
    if (!isPhoneNumberSubmitted) {
      alert("Please provide your phone number for 2FA.");
    }
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhoneNumberSubmit = () => {
    setIsPhoneNumberSubmitted(true);
    alert("Phone number submitted for 2FA.");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedCommunication = localStorage.getItem("communication");

    if (savedTheme) setIsDarkMode(savedTheme === "dark");
    if (savedCommunication) setCommunication(savedCommunication);

    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  const getFrequencyDescription = () => {
    switch (notificationFrequency) {
      case "Immediate":
        return "You will receive notifications as soon as they happen.";
      case "Daily":
        return "You will receive a summary of notifications once a day.";
      case "Weekly":
        return "You will receive a summary of notifications once a week.";
      default:
        return "";
    }
  };

  const getPriorityDescription = () => {
    switch (notificationPriority) {
      case "High":
        return "You will receive all updates and important alerts.";
      case "Medium":
        return "You will receive standard notifications.";
      case "Low":
        return "Only critical alerts will be sent.";
      default:
        return "";
    }
  };

  return (
    <div className="relative">
      <div className="current-time">
        <p>{currentTime}</p>
      </div>

      {isOpen && (
        <div className="settings-dropdown">
          <div className="settings-content">
            <h3 className="settings-title">Settings</h3>

            {/* Theme Section */}
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

            {/* Communication Section */}
            <div className="setting-section">
              <h4 className="setting-title">Communication Preference</h4>
              <select
                value={communication}
                onChange={handleCommunicationChange}
                className="setting-select"
              >
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
              </select>
              {communication === "SMS" && !isPhoneNumberSubmitted && (
                <div className="phone-number-input">
                  <label className="setting-label">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter your phone number"
                    className="phone-input"
                  />
                  <button
                    onClick={handlePhoneNumberSubmit}
                    className="submit-button"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>

            {/* Notification Preferences */}
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
                  <div className="setting-section">
                    <h4 className="setting-title">Notification Frequency</h4>
                    <select
                      value={notificationFrequency}
                      onChange={handleNotificationFrequencyChange}
                      className="setting-select"
                    >
                      <option value="Immediate">Immediate</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                    </select>
                    <p>
                      <em>{getFrequencyDescription()}</em>
                    </p>
                  </div>
                  <div className="setting-section">
                    <h4 className="setting-title">Notification Priority</h4>
                    <select
                      value={notificationPriority}
                      onChange={handleNotificationPriorityChange}
                      className="setting-select"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <p>
                      <em>{getPriorityDescription()}</em>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Premium Upgrade */}
            <div className="setting-section">
              <h4 className="setting-title">Upgrade to Premium</h4>
              <Link to="/payment-plans">
                <button className="upgrade-button">Upgrade Now</button>
              </Link>
              {isPremium && <p>You are a Premium member now!</p>}
            </div>

            {/* 2FA Section */}
            <div className="setting-section">
              <h4 className="setting-title">Privacy Settings</h4>
              <label className="setting-option">
                <input
                  type="checkbox"
                  checked={isTwoFactorEnabled}
                  onChange={handleTwoFactorToggle}
                  className="form-checkbox"
                />
                <span>Enable Two-Factor Authentication (2FA)</span>
              </label>
              {isTwoFactorEnabled && !isPhoneNumberSubmitted && (
                <div className="phone-number-input">
                  <label className="setting-label">Phone Number for 2FA</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter phone number for 2FA"
                    className="phone-input"
                  />
                  <button
                    onClick={handlePhoneNumberSubmit}
                    className="submit-button"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>

            {/* Logout */}
            <div className="setting-section">
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
