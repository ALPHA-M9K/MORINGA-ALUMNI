// src/components/CohortList.js
import React from 'react';
import { Link } from 'react-router-dom';

function CohortList({ cohorts, onRemoveCohort }) {
  return (
    <div>
      <h2>Cohorts</h2>
      {cohorts.length === 0 ? (
        <p>No cohorts available. Add a new one!</p>
      ) : (
        <ul>
          {cohorts.map(cohort => (
            <li key={cohort.id}>
              <Link to={`/cohort/${cohort.id}`}>{cohort.name}</Link>
              <button onClick={() => onRemoveCohort(cohort.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CohortList;
