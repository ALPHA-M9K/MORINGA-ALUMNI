import React, { useState } from "react";
import "./profile.css";

const Profile = ({ user, setUser }) => {
  const [formData, setFormData] = useState(user);
  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditable(false);
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <h2>Profile</h2>
        <button onClick={() => setIsEditable(!isEditable)} className="edit-btn">
          {isEditable ? "Save" : "Edit"}
        </button>
      </div>
      <form className="profile-form">
        <div className="form-row">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div className="form-row">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        {isEditable && (
          <div className="form-actions">
            <button type="button" onClick={handleSave} className="save-btn">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditable(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
