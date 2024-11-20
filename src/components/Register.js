// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";

// // const Signup = () => {
// //   const [fullName, setFullName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [termsAccepted, setTermsAccepted] = useState(false);
// //   const [userType, setUserType] = useState("user"); 
// //   const navigate = useNavigate();

// //   const handleSignup = (e) => {
// //     e.preventDefault();

// //     if (!termsAccepted) {
// //       alert("You must accept the Terms and Conditions to continue.");
// //       return;
// //     }

// //     if (password !== confirmPassword) {
// //       alert("Passwords do not match. Please try again.");
// //       return;
// //     }

// //     console.log("User Registered:", { fullName, email, password, userType });

// //     localStorage.setItem("userEmail", email);
// //     localStorage.setItem("userPassword", password);
// //     localStorage.setItem("userType", userType); 

// //     alert("Signup Successful! Redirecting to the login page...");

// //     navigate("/login");
// //   };

// //   return (
// //     <div className="auth-container">
// //       <form className="auth-form" onSubmit={handleSignup}>
// //         <h2>Signup</h2>
// //         <div>
// //           <label>Full Name:</label>
// //           <input
// //             type="text"
// //             value={fullName}
// //             onChange={(e) => setFullName(e.target.value)}
// //             placeholder="e.g. John Doe"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Email:</label>
// //           <input
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             placeholder="e.g. example@example.com"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Password:</label>
// //           <input
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             placeholder="xxxxxx"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Confirm Password:</label>
// //           <input
// //             type="password"
// //             value={confirmPassword}
// //             onChange={(e) => setConfirmPassword(e.target.value)}
// //             placeholder="xxxxxx"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>User Type:</label>
// //           <select
// //             value={userType}
// //             onChange={(e) => setUserType(e.target.value)}
// //           >
// //             <option value="user">User</option>
// //             <option value="admin">Admin</option>
// //           </select>
// //         </div>
// //         <div>
// //           <input
// //             type="checkbox"
// //             checked={termsAccepted}
// //             onChange={(e) => setTermsAccepted(e.target.checked)}
// //           />
// //           <label>
// //             Accept <Link to="/terms">Terms and Conditions</Link>
// //           </label>
// //         </div>
// //         <button type="submit">Signup</button>
// //         <p>
// //           Already have an account? <Link to="/login">Login here</Link>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Signup;
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthService from "../services/authservice";

// const Signup = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [userType, setUserType] = useState("user"); 
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");

//     // Validation
//     if (!termsAccepted) {
//       setError("You must accept the Terms and Conditions to continue.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match. Please try again.");
//       return;
//     }

    
//     console.log("User Registered:", { fullName, email, password, userType });

//     localStorage.setItem("userEmail", email);
//     localStorage.setItem("userPassword", password);
//     localStorage.setItem("userType", userType); 

//     alert("Signup Successful! Redirecting to the login page...");

//       // Navigate to login
//       navigate("/login");
// <<<<<<< Tabnine <<<<<<<
//     } catch (err) {
//       // Handle signup error
//       setError(err.message || "Signup failed. Please try again.");
//       alert(err.message || "Signup failed. Please try again.");
//     }
// >>>>>>> Tabnine >>>>>>>// {"conversationId":"aed9ad0a-72fc-426d-b7f9-cabd124c46d2","source":"instruct"}
//   };

//   return (
//     <div className="auth-container">
//       <div className="welcome-message">
//         <h2>Welcome to Moringa Alumni</h2>
//         <p>Create an account below</p>
//       </div>
//       <form className="auth-form" onSubmit={handleSignup}>
//         <h2>Signup</h2>
//         {error && <div className="error-message">{error}</div>}
//         <div>
//           <label>Full Name:</label>
//           <input
//             type="text"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             placeholder="e.g . John Doe"
//             required
//           />
//         </div>
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
//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             placeholder="xxxxxx"
//             required
//           />
//         </div>
//         <div>
//           <label>User Type:</label>
//           <select
//             value={userType}
//             onChange={(e) => setUserType(e.target.value)}
//           >
//             <option value="user">User </option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <div>
//           <input
//             type="checkbox"
//             checked={termsAccepted}
//             onChange={(e) => setTermsAccepted(e.target.checked)}
//           />
//           <label>
//             Accept <Link to="/terms">Terms and Conditions</Link>
//           </label>
//         </div>
//         <button type="submit">Signup</button>
//         <p>
//           Already have an account? <Link to="/login">Login here</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Signup;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [userType, setUserType] = useState("user");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");

//     // Validation
//     if (!termsAccepted) {
//       setError("You must accept the Terms and Conditions to continue.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match. Please try again.");
//       return;
//     }

//     try {
//       console.log("User Registered:", { fullName, email, password, userType });

//       localStorage.setItem("userEmail", email);
//       localStorage.setItem("userPassword", password);
//       localStorage.setItem("userType", userType);

//       alert("Signup Successful! Redirecting to the login page...");

//       // Navigate to login
//       navigate("/login");
//     } catch (err) {
//       // Handle signup error
//       setError(err.message || "Signup failed. Please try again.");
//       alert(err.message || "Signup failed. Please try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="welcome-message">
//         <h2>Welcome to Moringa Alumni</h2>
//         <p>Create an account below</p>
//       </div>
//       <form className="auth-form" onSubmit={handleSignup}>
//         <h2>Signup</h2>
//         {error && <div className="error-message">{error}</div>}
//         <div>
//           <label>Full Name:</label>
//           <input
//             type="text"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             placeholder="e.g. John Doe"
//             required
//           />
//         </div>
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
//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             placeholder="xxxxxx"
//             required
//           />
//         </div>
//         <div>
//           <label>User Type:</label>
//           <select
//             value={userType}
//             onChange={(e) => setUserType(e.target.value)}
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <div>
//           <input
//             type="checkbox"
//             checked={termsAccepted}
//             onChange={(e) => setTermsAccepted(e.target.checked)}
//           />
//           <label>
//             Accept <Link to="/terms">Terms and Conditions</Link>
//           </label>
//         </div>
//         <button type="submit">Signup</button>
//         <p>
//           Already have an account? <Link to="/login">Login here</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [userType, setUserType] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!termsAccepted) {
      setError("You must accept the Terms and Conditions to continue.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      // Prepare user details
      const userDetails = {
        fullName,
        email,
        password,
        userType,
      };

      console.log("User Registered:", userDetails);

      // Make an API call to register the user
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userDetails.email,
          password: userDetails.password,
          first_name: userDetails.fullName.split(" ")[0],
          last_name: userDetails.fullName.split(" ")[1],
          role: userDetails.userType,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Signup Successful:", result);

        // Optionally store user info/token if required
        localStorage.setItem("userToken", result.token || ""); // If a token is returned
        localStorage.setItem("userEmail", result.email);

        alert("Signup Successful! Redirecting to the login page...");
        // Navigate to login
        navigate("/login");
      } else {
        const error = await response.json();
        setError(`Signup Failed: ${error.error}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="welcome-message">
        <h2>Welcome to Moringa Alumni</h2>
        <p>Create an account below</p>
      </div>
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Signup</h2>
        {error && <div className="error-message">{error}</div>}
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. John Doe"
            required
          />
        </div>
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
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="xxxxxx"
            required
          />
        </div>
        <div>
          <label>User Type:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label>
            Accept <Link to="/terms">Terms and Conditions</Link>
          </label>
        </div>
        <button type="submit">Signup</button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
