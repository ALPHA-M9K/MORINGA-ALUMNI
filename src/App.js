
import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import FundraiserPage from './components/ FundraiserPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';



function App() {
  const isAuth = localStorage.getItem('auth');
    return (
        <Router>
            <Routes>
                <Route path="/fundraisers" element={<FundraiserPage />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} /> 
                <Route path="/register" element={<Register />} /> 
                <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} /> 
                <Route path="*" element={<Navigate to="/login" />} /> 
               
            </Routes>
        </Router>
    );
}

export default App;
