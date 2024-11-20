import React, { useState } from "react";

function ProfileForm({ profile, onSubmit }) {
  const [formData, setFormData] = useState({
    username: profile?.username || "",
    email: profile?.email || "",
    bio: profile?.bio || "",
    avatar: profile?.avatar || "",
    newPassword: "",
    confirmPassword: "",
    theme: profile?.theme || "light", // "light" or "dark"
    role: profile?.role || "viewer", // "admin", "editor", "viewer"
    isActive: profile?.isActive || true, // Staff status
    enable2FA: profile?.enable2FA || false, // Two-factor authentication toggle
    preferredLanguage: profile?.preferredLanguage || "en", // Preferred language
    timeZone: profile?.timeZone || "UTC", // Time zone
    customAvatar: null, // Custom avatar image upload
    notificationPreferences: profile?.notificationPreferences || {
      email: true,
      sms: false,
      push: false,
    },
    linkedSocialAccounts: profile?.linkedSocialAccounts || [],
    accountDeactivation: profile?.accountDeactivation || false,
    securityQuestions: profile?.securityQuestions || [], // Security questions for recovery
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        customAvatar: URL.createObjectURL(file),
      }));
    }
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [name]: checked,
      },
    }));
  };

  const handleSocialLinkChange = (e, index) => {
    const { value } = e.target;
    const updatedLinks = [...formData.linkedSocialAccounts];
    updatedLinks[index] = value;
    setFormData((prev) => ({
      ...prev,
      linkedSocialAccounts: updatedLinks,
    }));
  };

  const handleAddSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      linkedSocialAccounts: [...prev.linkedSocialAccounts, ""],
    }));
  };

  const handleRemoveSocialLink = (index) => {
    const updatedLinks = formData.linkedSocialAccounts.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      linkedSocialAccounts: updatedLinks,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Validation
    if (!formData.username.trim()) {
      setMessage("Username cannot be empty.");
      setIsSubmitting(false);
      return;
    }
    if (!formData.email.includes("@")) {
      setMessage("Please enter a valid email.");
      setIsSubmitting(false);
      return;
    }
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-4 rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      {message && (
        <div
          className={`mt-4 p-2 rounded ${
            message.includes("successfully")
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Field */}
        <div>
          <label className="block mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
         
        {/* Password Change */}
        <div>
          <label className="block mb-2">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        
        {/* Bio */}
        <div>
          <label className="block mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            maxLength={250}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        
        

        {/* Staff Status */}
        <div>
          <label className="block mb-2">Staff Status</label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <span>Active</span>
        </div>

        

       

        

        {/* Custom Avatar Upload */}
        <div>
          <label className="block mb-2">Upload Custom Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {formData.customAvatar && (
            <img
              src={formData.customAvatar}
              alt="Avatar Preview"
              className="mt-4 w-24 h-24 rounded-full border border-gray-300"
            />
          )}
        </div>

       

        {/* Submit Button */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className={`p-2 rounded ${
              isSubmitting
                ? "bg-gray-500 text-gray-300"
                : "bg-blue-500 text-white"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
