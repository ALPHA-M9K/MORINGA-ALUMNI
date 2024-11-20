import React from 'react';
import { useNavigate } from 'react-router-dom';




const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Moringa Alumni Dashboard!</h2>
      <button onClick={handleLogout}>Logout</button>
      {/* <CreateFundraiser/> */}
    </div>
  );
};

export default Dashboard;