import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cohorts, setCohorts] = useState([]);
  const [newCohortName, setNewCohortName] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [nameToJoin, setNameToJoin] = useState('');

  // Fetch existing cohorts from the backend when the component mounts
  useEffect(() => {
    axios.get('/api/cohorts')
      .then(response => setCohorts(response.data))
      .catch(error => console.error('Error fetching cohorts:', error));
  }, []);

  // Add a new cohort
  const handleAddCohort = async () => {
    if (newCohortName.trim()) {
      try {
        // Send a POST request to create the new cohort
        const response = await axios.post('/api/cohorts/create', { name: newCohortName, adminId: 'admin123' });
        
        // Update the state with the newly created cohort
        setCohorts([...cohorts, response.data]);
        setNewCohortName(''); // Reset the input field after the cohort is added
      } catch (error) {
        console.error('Error adding cohort:', error);
      }
    } else {
      alert('Cohort name cannot be empty');
    }
  };

  // Remove a cohort
  const handleRemoveCohort = async (cohortId) => {
    try {
      await axios.delete(`/api/cohorts/${cohortId}`);
      setCohorts(cohorts.filter((cohort) => cohort.id !== cohortId));
    } catch (error) {
      console.error('Error removing cohort:', error);
    }
  };

  // Generate an invite link for a cohort
  const generateInviteLink = async (cohortId) => {
    try {
      const response = await axios.get(`/api/cohorts/${cohortId}/inviteLink`);
      setInviteLink(response.data.inviteLink);
    } catch (error) {
      console.error('Error generating invite link:', error);
    }
  };

  // Join cohort using invite link
  const joinCohortWithInvite = async () => {
    if (inviteLink && nameToJoin.trim()) {
      try {
        const response = await axios.post(`/api/cohorts/join/${inviteLink}`, { name: nameToJoin });
        setCohorts(cohorts.map(cohort => {
          if (cohort.id === response.data.id) {
            cohort.members.push(nameToJoin);
          }
          return cohort;
        }));
        setInviteLink('');
        setNameToJoin('');
      } catch (error) {
        console.error('Error joining cohort:', error);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cohort Management</h1>

        {/* Add new cohort */}
        <div>
          <input
            type="text"
            placeholder="Enter cohort name"
            value={newCohortName}
            onChange={(e) => setNewCohortName(e.target.value)}
          />
          <button onClick={handleAddCohort}>Add Cohort</button>
        </div>

        {/* List of Cohorts */}
        <div>
          <h2>Existing Cohorts</h2>
          {cohorts.map(cohort => (
            <div key={cohort.id}>
              <h3>{cohort.name}</h3>
              <button onClick={() => handleRemoveCohort(cohort.id)}>Remove Cohort</button>
              <button onClick={() => generateInviteLink(cohort.id)}>Generate Invite Link</button>

              {/* Display invite link and join form */}
              {inviteLink && inviteLink.includes(cohort.id.toString()) && (
                <div>
                  <p>Invite Link: {inviteLink}</p>
                  <input
                    type="text"
                    placeholder="Enter your name to join"
                    value={nameToJoin}
                    onChange={(e) => setNameToJoin(e.target.value)}
                  />
                  <button onClick={joinCohortWithInvite}>Join Cohort</button>
                </div>
              )}

              {/* Display members */}
              <ul>
                {cohort.members.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
