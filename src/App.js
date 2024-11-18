import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import LandingPage from "./components/LandingPage";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Fundraiser from "./pages/Fundraiser"; 
import CreateFundraiser from './components/FundraiserCreated';
import ProfilePage from "./features/profile/ProfilePage";
import Settings from "./components/Settings";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const userPassword = localStorage.getItem("userPassword");
    if (userEmail && userPassword) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Top Navigation */}
        <header className="bg-blue-600 text-white shadow-md">
          <nav className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex space-x-8">
                <Link to="/" className="flex items-center hover:text-blue-200">
                  <span className="text-xl font-bold">Moringa Alumni</span>
                </Link>
              </div>

              <div className="flex space-x-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/" className="px-3 py-2 rounded-md hover:bg-blue-700">
                      Home
                    </Link>
                    <Link to="/fundraiser" className="px-3 py-2 rounded-md hover:bg-blue-700">
                      Fundraiser
                    </Link>
                    <Link to="/profile" className="px-3 py-2 rounded-md hover:bg-blue-700">
                      Profile
                    </Link>
                    <Link to="/settings" className="px-3 py-2 rounded-md hover:bg-blue-700">
                      Settings
                    </Link>
                    <button onClick={handleLogout} className="px-3 py-2 rounded-md hover:bg-blue-700">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-3 py-2 rounded-md hover:bg-blue-700">
                      Login
                    </Link>
                    <Link to="/register" className="px-3 py-2 rounded-md hover:bg-blue-700">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={isAuthenticated ? <HomePage /> : <LandingPage />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/fundraiser" element={isAuthenticated ? <Fundraiser /> : <Navigate to="/login" />} />
            <Route path="/create" element={isAuthenticated ? <CreateFundraiser /> : <Navigate to="/login" />} />
            <Route path="/fundraisercreated" element={isAuthenticated ? <CreateFundraiser /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Footer content */}
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
