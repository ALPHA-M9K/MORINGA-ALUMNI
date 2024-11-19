import React, { useState } from "react";

function ProfileForm({ profile, onSubmit }) {
  const [formData, setFormData] = useState({
    username: profile?.username || "",
    email: profile?.email || "",
    bio: profile?.bio || "",
    avatar: profile?.avatar || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Avatar URL</label>
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
