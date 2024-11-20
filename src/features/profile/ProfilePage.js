import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import ProfileView from "./ProfileView";

function ProfilePage({ profileData }) {
  // profileData will be passed as a prop
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(profileData); // Initialize with the received data

  const handleProfileUpdate = (updatedData) => {
    setProfile(updatedData); // Update profile with the new data when the form is submitted
    setIsEditing(false); // Switch back to view mode
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {isEditing ? (
        <ProfileForm profile={profile} onSubmit={handleProfileUpdate} />
      ) : (
        <ProfileView profile={profile} />
      )}
    </div>
  );
}

export default ProfilePage;
