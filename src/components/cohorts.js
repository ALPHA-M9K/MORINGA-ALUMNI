// src/components/Cohorts.js

import React, { useState } from 'react';

function Cohorts() {
  const [cohorts, setCohorts] = useState([]);
  const [newCohortName, setNewCohortName] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [nameToJoin, setNameToJoin] = useState('');

  // Add a new cohort
  const handleAddCohort = () => {
    if (newCohortName.trim()) {
      setCohorts([...cohorts, { id: Date.now(), name: newCohortName, members: [] }]);
      setNewCohortName('');
    } else {
      alert('Cohort name cannot be empty');
    }
  };

  // Remove a cohort
  const handleRemoveCohort = (id) => {
    setCohorts(cohorts.filter((cohort) => cohort.id !== id));
  };

  // Add a member to a specific cohort
  const handleAddMember = (cohortId, memberName) => {
    setCohorts(cohorts.map((cohort) => 
      cohort.id === cohortId
        ? { ...cohort, members: [...cohort.members, memberName] }
        : cohort
    ));
  };

  // Remove a member from a specific cohort
  const handleRemoveMember = (cohortId, memberIndex) => {
    setCohorts(cohorts.map((cohort) => 
      cohort.id === cohortId
        ? { ...cohort, members: cohort.members.filter((_, idx) => idx !== memberIndex) }
        : cohort
    ));
  };

  // Generate an invite link
  const generateInviteLink = (cohortId) => {
    setInviteLink(`https://join-cohort.com/${cohortId}`);
  };

  // Join cohort using invite link
  const joinCohortWithInvite = () => {
    const cohortId = inviteLink.split('/').pop();
    const cohort = cohorts.find((c) => c.id.toString() === cohortId);
    if (cohort && nameToJoin.trim()) {
      handleAddMember(cohort.id, nameToJoin);
      setInviteLink('');
      setNameToJoin('');
    } else {
      alert('Invalid invite link or name');
    }
  };

  return (
    <div>
      <h1>Cohort Management System</h1>

      {/* Add new cohort form */}
      <div className="add-cohort">
        <input
          type="text"
          placeholder="Enter cohort name"
          value={newCohortName}
          onChange={(e) => setNewCohortName(e.target.value)}
        />
        <button onClick={handleAddCohort}>Add Cohort</button>
      </div>

      {/* Display cohorts */}
      <div className="cohorts-list">
        {cohorts.length === 0 ? (
          <p>No cohorts available. Add a new one!</p>
        ) : (
          cohorts.map((cohort) => (
            <div key={cohort.id} className="cohort">
              <h2>{cohort.name}</h2>
              <button onClick={() => handleRemoveCohort(cohort.id)}>Remove Cohort</button>
              
              {/* Generate invite link */}
              <button onClick={() => generateInviteLink(cohort.id)}>Generate Invite Link</button>
              
              {/* Display invite link if generated */}
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
                  <li key={index}>
                    {member}
                    <button onClick={() => handleRemoveMember(cohort.id, index)}>Remove</button>
                  </li>
                ))}
              </ul>

              {/* Add member to cohort */}
              <button onClick={() => {
                const memberName = prompt("Enter member's name:");
                if (memberName) handleAddMember(cohort.id, memberName);
              }}>
                Add Member
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cohorts;
