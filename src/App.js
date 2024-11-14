// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import CohortList from './components/CohortList';
import AddCohort from './components/AddCohort';
import CohortDetails from './components/CohortDetails';
import './App.css';

function App() {
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cohorts')
      .then(response => setCohorts(response.data))
      .catch(error => console.error('Error fetching cohorts:', error));
  }, []);

  const addCohort = async (name) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cohorts/create', { name });
      setCohorts([...cohorts, response.data]);
    } catch (error) {
      console.error('Error adding cohort:', error);
    }
  };

  const removeCohort = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cohorts/${id}`);
      setCohorts(cohorts.filter(cohort => cohort.id !== id));
    } catch (error) {
      console.error('Error removing cohort:', error);
    }
  };

  const addMember = async (cohortId, memberName) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/cohorts/${cohortId}/addMember`, { name: memberName });
      setCohorts(cohorts.map(cohort => 
        cohort.id === cohortId ? response.data : cohort
      ));
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Cohort Management</h1>
        <nav>
          <Link to="/">Cohort List</Link> | <Link to="/add-cohort">Add Cohort</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CohortList cohorts={cohorts} onRemoveCohort={removeCohort} />} />
          <Route path="/add-cohort" element={<AddCohort onAddCohort={addCohort} />} />
          <Route path="/cohort/:id" element={<CohortDetails cohorts={cohorts} onAddMember={addMember} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
