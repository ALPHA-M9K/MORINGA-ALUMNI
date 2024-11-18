
import React, { useState } from 'react';

function AddCohort({ onAddCohort }) {
  const [cohortName, setCohortName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cohortName.trim()) {
      onAddCohort(cohortName);
      setCohortName('');
    } else {
      alert('Cohort name cannot be empty');
    }
  };

  return (
    <div>
      <h2>Add New Cohort</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter cohort name"
          value={cohortName}
          onChange={(e) => setCohortName(e.target.value)}
        />
        <button type="submit">Add Cohort</button>
      </form>
    </div>
  );
}

export default AddCohort;
