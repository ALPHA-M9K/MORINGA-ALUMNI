import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();

    
    if (email === "") {
      setMessage("Please enter your email address.");
    } else {
      setMessage("Password reset link has been sent to your email!");
      
      setTimeout(() => {
        navigate("/login"); 
      }, 2000);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handlePasswordReset}>
        <h2>Forgot Password</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Password Reset Link</button>
        {message && <p>{message}</p>}
        <p>
          Remembered your password? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
