import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, []);

  const handleLogin = (e) => {
    if (e) e.preventDefault();

    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");
    const storedUserType = localStorage.getItem("userType"); 

    if (email === storedEmail && password === storedPassword) {
      setIsAuthenticated(true);
      if (rememberMe) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
      }
      alert("Login Successful! Redirecting...");

      
      if (storedUserType === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. example@example.com"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="xxxxxx"
            required
          />
        </div>
        <div>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label>Remember Me</label>
        </div>
        <button type="submit">Login</button>
        <p>
          Forgot your password? <Link to="/forgot-password">Reset it here</Link>
        </p>
        <p>
          Don't have an account? <Link to="/register">Signup here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
// 
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthService from "../services/authservice"; // Ensure correct import path

// const Login = ({ setIsAuthenticated }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("userEmail");
    
//     if (storedEmail) {
//       setEmail(storedEmail);
//     }
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear any previous errors

//     try {
//       console.log('Initiating login process');
      
//       // Use AuthService to handle login
//       const result = await AuthService.login(email, password);
//       console.log('Login successful:', result);
      
//       // Set authentication state
//       setIsAuthenticated(true);

//       // Handle remember me functionality
//       if (rememberMe) {
//         localStorage.setItem("userEmail", email);
//         localStorage.setItem("userRole", result.user.role);
//       }

//       // Show success message
//       alert("Login Successful! Redirecting...");
      
//       // Navigate based on user role
//       const navigateTo = result.user.role === 'admin' ? "/admin-dashboard" : "/";
//       navigate(navigateTo);

//     } catch (err) {
//       console.error('Login Component Error:', err);
      
//       // Set error message for display
//       const errorMessage = err.message || 'Login failed';
//       setError(errorMessage);
      
//       // Optional: show alert as well
//       alert(errorMessage);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="welcome-message">
//     <h2>Welcome back</h2>
//         <p>Login to your account below</p>
//       </div>
//       <form className="auth-form" onSubmit={handleLogin}>
//         <h2>Login</h2>
        
//         {/* Error Message Display */}
//         {error && (
//           <div 
//             style={{
//               color: 'red', 
//               marginBottom: '15px', 
//               padding: '10px', 
//               backgroundColor: '#ffeeee',
//               border: '1px solid red',
//               borderRadius: '5px'
//             }}
//           >
//             {error}
//           </div>
//         )}

//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="e.g. example@example.com"
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="xxxxxx"
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="checkbox"
//             checked={rememberMe}
//             onChange={(e) => setRememberMe(e.target.checked)}
//           />
//           <label>Remember Me</label>
//         </div>
//         <button type="submit">Login</button>
//         <p>
//           Forgot your password? <Link to="/forgot-password">Reset it here</Link>
//         </p>
//         <p>
//           Don't have an account? <Link to="/register">Signup here</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;