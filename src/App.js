
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import LandingPage from "./components/LandingPage";
import Forum from "./pages/Forum";
import PostsPage from "./pages/PostsPage";
import ForgotPassword from "./pages/ForgotPassword";
import TermsPage from "./pages/TermsPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
import CookiePolicy from "./pages/CookiePolicy";
import CopyrightPolicy from "./pages/CopyrightPolicy";
import UserAgreement from "./pages/UserAgreement";
import Login from "./components/Login";
import Register from "./components/Register";
import CohortList from "./components/CohortList";
import AddCohort from "./components/AddCohort";
import CohortDetails from "./components/CohortDetails";
import "./App.css";

function App() {
  const [cohorts, setCohorts] = useState([]);
  const [showPrivacyTerms, setShowPrivacyTerms] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    
    const userEmail = localStorage.getItem("userEmail");
    const userPassword = localStorage.getItem("userPassword");
    if (userEmail && userPassword) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cohorts")
      .then((response) => setCohorts(response.data))
      .catch((error) => console.error("Error fetching cohorts:", error));
  }, []);

  const addCohort = async (name) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cohorts/create",
        { name }
      );
      setCohorts([...cohorts, response.data]);
    } catch (error) {
      console.error("Error adding cohort:", error);
    }
  };

  const removeCohort = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cohorts/${id}`);
      setCohorts(cohorts.filter((cohort) => cohort.id !== id));
    } catch (error) {
      console.error("Error removing cohort:", error);
    }
  };

  const addMember = async (cohortId, memberName) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/cohorts/${cohortId}/addMember`,
        { name: memberName }
      );
      setCohorts(
        cohorts.map((cohort) =>
          cohort.id === cohortId ? response.data : cohort
        )
      );
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const togglePrivacyTerms = () => {
    setShowPrivacyTerms(!showPrivacyTerms);
  };

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
                    <Link
                      to="/"
                      className="px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      Home
                    </Link>
                    <Link
                      to="/forum"
                      className="px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      Forum
                    </Link>
                    <Link
                      to="/posts"
                      className="px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      Posts
                    </Link>
                    <Link
                      to="/add-cohort"
                      className="px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      Add Cohort
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-3 py-2 rounded-md hover:bg-blue-700"
                    >
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
            <Route
              path="/"
              element={isAuthenticated ? <HomePage /> : <LandingPage />}
            />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/forum"
              element={isAuthenticated ? <Forum /> : <Navigate to="/login" />}
            />
            <Route
              path="/posts"
              element={
                isAuthenticated ? <PostsPage /> : <Navigate to="/login" />
              }
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/copyright-policy" element={<CopyrightPolicy />} />
            <Route path="/user-agreement" element={<UserAgreement />} />
            <Route
              path="/cohorts"
              element={
                isAuthenticated ? (
                  <CohortList cohorts={cohorts} onRemoveCohort={removeCohort} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/add-cohort"
              element={
                isAuthenticated ? (
                  <AddCohort onAddCohort={addCohort} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/cohort/:id"
              element={
                isAuthenticated ? (
                  <CohortDetails cohorts={cohorts} onAddMember={addMember} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="hover:text-blue-400">
                      About
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3
                  className="text-lg font-semibold mb-4 cursor-pointer"
                  onClick={togglePrivacyTerms}
                >
                  Privacy & Terms
                </h3>
                {showPrivacyTerms && (
                  <ul className="space-y-2 pl-4">
                    <li>
                      <Link
                        to="/privacy-policy"
                        className="block hover:text-blue-400"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cookie-policy"
                        className="block hover:text-blue-400"
                      >
                        Cookie Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/copyright-policy"
                        className="block hover:text-blue-400"
                      >
                        Copyright Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user-agreement"
                        className="block hover:text-blue-400"
                      >
                        User Agreement
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/terms-of-service"
                        className="block hover:text-blue-400"
                      >
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p>Email: support@moringaalumni.com</p>
                <p>Phone: 0734567891</p>
                <Link to="/contact-us" className="block hover:text-blue-400">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p>
                &copy; {new Date().getFullYear()} Moringa Alumni Platform. All
                rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;