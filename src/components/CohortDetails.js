

import React, { useState } from "react";
import { useParams } from "react-router-dom";

function CohortDetails({ cohorts, onAddMember, currentUser }) {
  const { id } = useParams();
  const cohort = cohorts.find((c) => c.id === id);
  const [memberName, setMemberName] = useState("");

  if (!cohort) return <p>Cohort not found.</p>;

  const canViewDetails =
    !cohort.isPrivate ||
    currentUser === cohort.admin ||
    cohort.members.includes(currentUser);

  if (!canViewDetails) {
    return <p>You do not have permission to view this cohort.</p>;
  }

  const handleAddMember = () => {
    if (memberName.trim()) {
      onAddMember(cohort.id, memberName);
      setMemberName("");
    } else {
      alert("Member name cannot be empty");
    }
  };

  return (
    <div>
      <h2>{cohort.name} - Details</h2>
      <p>Admin: {cohort.admin}</p>
      <p>Invite Link: {cohort.inviteLink}</p>

      <h3>Members</h3>
      <ul>
        {cohort.members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>

      {currentUser === cohort.admin && (
        <div>
          <input
            type="text"
            placeholder="Enter member name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          />
          <button onClick={handleAddMember}>Add Member</button>
        </div>
      )}
    </div>
  );
}

export default CohortDetails;
