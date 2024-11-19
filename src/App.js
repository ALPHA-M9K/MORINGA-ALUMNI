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
import Forum from "./components/Forum";
import PostPage from "./pages/PostPage";
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
import Settings from "./components/Settings";
import ProfilePage from "./features/profile/ProfilePage";
import PaymentPlans from "./components/PaymentPlans";
import Fundraiser from "./pages/Fundraiser";
import PaymentDetails from "./pages/PaymentDetails";
import SelectPlanPage from "./pages/SelectPlanPage";
import PaymentPage from "./pages/PaymentPage";
import Notifications from "./components/Notifications";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [cohorts, setCohorts] = useState([]);
  const [showPrivacyTerms, setShowPrivacyTerms] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    
    return () => clearInterval(interval);
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

              {/* Current Time Display */}
              <div className="text-xl font-bold">{currentTime}</div>

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
                      to="/posts"
                      className="px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      Posts
                    </Link>
                    <Link
                      to="/fundraiser"
                      className="px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      Fundraiser
                    </Link>
                    <Link
                      to="/add-cohort"
                      className="px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      Add Cohort
                    </Link>
                    <Link
                      to="/profile"
                      className="px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      Settings
                    </Link>
                    <Link
                      to="/notifications"
                      className="px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      Notifications
                    </Link>
                    <Link
                      to="/search"
                      className="px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      Search
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
              path="/payment"
              element={
                isAuthenticated ? <PaymentPage /> : <Navigate to="/login" />
              }
            />

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
              path="/posts"
              element={
                isAuthenticated ? <PostPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? <Settings /> : <Navigate to="/login" />
              }
            />
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
            <Route
              path="/profile"
              element={
                isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/fundraiser"
              element={
                isAuthenticated ? <Fundraiser /> : <Navigate to="/login" />
              }
            />

            {/* Other routes */}
            <Route path="/forum" element={<Forum />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/copyright-policy" element={<CopyrightPolicy />} />
            <Route path="/user-agreement" element={<UserAgreement />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/search" element={<Search />} />
            <Route path="/donate/:fundraiserId" element={<PaymentDetails />} />
            <Route path="/payment-plans" element={<PaymentPlans />} />
            <Route path="/select-plan/:planId" element={<SelectPlanPage />} />
            <Route path="/payment-page" element={<PaymentPage />} />
          </Routes>
        </main>

        {/* Footer */}
<footer className="bg-blue-600 text-white py-4">
  <div className="container mx-auto text-center">
    &copy; {new Date().getFullYear()} Moringa Alumni Platform. All rights reserved.
  </div>
</footer>

<footer className="bg-gray-800 text-white">
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <div>
        <h3 className="font-semibold text-lg mb-4">About</h3>
        <ul>
          <li>
            <Link to="/about" className="block py-1 hover:text-gray-400">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact-us" className="block py-1 hover:text-gray-400">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4">Policies</h3>
        <ul>
          <li>
            <Link to="/privacy-policy" className="block py-1 hover:text-gray-400">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/cookie-policy" className="block py-1 hover:text-gray-400">
              Cookie Policy
            </Link>
          </li>
          <li>
            <Link to="/terms-of-service" className="block py-1 hover:text-gray-400">
              Terms of Service
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4">Support</h3>
        <ul>
          <li>
            <Link to="/user-agreement" className="block py-1 hover:text-gray-400">
              User Agreement
            </Link>
          </li>
          <li>
            <Link to="/copyright-policy" className="block py-1 hover:text-gray-400">
              Copyright Policy
            </Link>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</footer>

     
      </div>
    </Router>
  );
}

export default App;