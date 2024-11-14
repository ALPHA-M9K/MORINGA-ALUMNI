// src/components/CohortDetails.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CohortDetails({ cohorts, onAddMember }) {
  const { id } = useParams();
  const cohort = cohorts.find(c => c.id.toString() === id);
  const [memberName, setMemberName] = useState('');

  const handleAddMember = () => {
    if (memberName.trim()) {
      onAddMember(cohort.id, memberName);
      setMemberName('');
    } else {
      alert('Member name cannot be empty');
    }
  };

  if (!cohort) return <p>Cohort not found.</p>;

  return (
    <div>
      <h2>{cohort.name} - Details</h2>
      <Link to="/">Back to Cohort List</Link>
      <h3>Members</h3>
      <ul>
        {cohort.members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Enter member name"
        value={memberName}
        onChange={(e) => setMemberName(e.target.value)}
      />
      <button onClick={handleAddMember}>Add Member</button>
    </div>
  );
}

export default CohortDetails;
