import React from "react";
import "./Navbar.css";

const Navbar = ({ userName }) => (
  <nav className="navbar">
    <div className="navbar-left">
      <div>
        <p className="welcome-text">Welcome, {userName}</p>
        <p className="date-text">{new Date().toLocaleDateString()}</p>
      </div>
    </div>
    <div className="navbar-right">
      <input type="text" placeholder="Search" className="search-input" />
      <div className="profile-pic"></div>
    </div>
  </nav>
);

export default Navbar;
