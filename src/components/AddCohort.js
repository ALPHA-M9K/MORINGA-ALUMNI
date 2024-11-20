import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AddCohort() {
  const [cohorts, setCohorts] = useState([]);
  const [cohortName, setCohortName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [joinCohortId, setJoinCohortId] = useState("");

  const navigate = useNavigate();

  // Fetch cohorts when component mounts
  useEffect(() => {
    fetchCohorts();
  }, []);

  const fetchCohorts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/cohort/list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCohorts(response.data);
    } catch (error) {
      console.error("Failed to fetch cohorts", error);
      alert("Failed to load cohorts");
    }
  };

  const handleCreateCohort = async (e) => {
    e.preventDefault();

    if (!cohortName.trim()) {
      alert("Cohort name cannot be empty");
      return;
    }

try {
  const token = localStorage.getItem('token');
  const response = await axios.post('http://localhost:5000/cohort/create', 
    { 
      name: cohortName, 
      isPrivate 
    },
    {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  // Refresh cohorts list
  fetchCohorts();

  alert(`Cohort "${cohortName}" created successfully`);
  setCohortName("");
  setIsPrivate(false);
} catch (error) {
  console.error("Cohort creation failed", error);
  alert(error.response?.data?.error || "Failed to create cohort");
}
  };

  const handleJoinCohort = async (e) => {
    e.preventDefault();

    if (!joinCohortId.trim()) {
      alert("Cohort ID cannot be empty");
      return;
    }

try {
  const token = localStorage.getItem('token');
  const response = await axios.post('http://localhost:5000/cohort/join', 
    { cohortId: joinCohortId },
    {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  // Refresh cohorts list
  fetchCohorts();

  alert("Successfully joined cohort");
  navigate(`/cohort/${joinCohortId}`);
} catch (error) {
  console.error("Join cohort failed", error);
  alert(error.response?.data?.error || "Failed to join cohort");
}
  };

  return (
    <div>
      <h2>Add or Join a Cohort</h2>

      <div>
        <h3>Create a New Cohort</h3>
        <form onSubmit={handleCreateCohort}>
          <input
            type="text"
            placeholder="Enter cohort name"
            value={cohortName}
            onChange={(e) => setCohortName(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            Private Cohort
          </label>
          <button type="submit">Add Cohort</button>
        </form>
      </div>

  <div>
    <h3>Join an Existing Cohort</h3>
    <form onSubmit={handleJoinCohort}>
      <input
        type="text"
        placeholder="Enter cohort ID"
        value={joinCohortId}
        onChange={(e) => setJoinCohortId(e.target.value)}
      />
      <button type="submit">Join Cohort</button>
    </form>
  </div>

  <div>
    <h3>Available Cohorts</h3>
    {cohorts.length > 0 ? (
      cohorts.map((cohort) => (
        <div key={cohort.id}>
          <h4>
            {cohort.name} {cohort.isPrivate ? "(Private)" : ""}
          </h4>
          <p>Admin: {cohort.admin || "Unassigned"}</p>
        </div>
      ))
    ) : (
      <p>No cohorts available.</p>
    )}
  </div>
</div>
  );
}

export default AddCohort;

