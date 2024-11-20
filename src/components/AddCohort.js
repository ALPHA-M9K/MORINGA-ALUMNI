// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AddCohort({
//   cohorts = [],
//   onAddCohort,
//   onJoinCohort,
//   currentUser,
//   setCurrentUser,
// }) {
//   const [cohortName, setCohortName] = useState("");
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [username, setUsername] = useState("");
//   const [joinCohortId, setJoinCohortId] = useState("");
//   const [joinLink, setJoinLink] = useState("");
//   const [selectedAdmin, setSelectedAdmin] = useState("");
//   const navigate = useNavigate();

//   const handleCreateCohort = (e) => {
//     e.preventDefault();
//     if (!currentUser && !username.trim()) {
//       alert("Please enter a username");
//       return;
//     }

//     if (!currentUser) {
//       setCurrentUser(username);
//     }

//     if (cohortName.trim()) {
//       const newCohort = {
//         name: cohortName,
//         isPrivate,
//         admin: isPrivate ? null : currentUser || username, // Admin for private cohorts is null initially
//       };

//       onAddCohort(newCohort);
//       setCohortName("");
//       setIsPrivate(false);

//       if (isPrivate) {
//         alert(
//           `Private cohort "${cohortName}" created! Please assign an admin.`
//         );
//       } else {
//         alert(`Cohort "${cohortName}" created!`);
//       }
//     } else {
//       alert("Cohort name cannot be empty");
//     }
//   };

//   const handleAssignAdmin = (cohortId) => {
//     const cohort = cohorts.find((c) => c.id === cohortId);
//     if (cohort && selectedAdmin) {
//       cohort.admin = selectedAdmin; // Assign admin to the cohort
//       alert(`Admin ${selectedAdmin} assigned to ${cohort.name}`);
//       setSelectedAdmin("");
//     } else {
//       alert("Please select a valid admin");
//     }
//   };

//   const handleJoinCohort = (e) => {
//     e.preventDefault();
//     if (!currentUser && !username.trim()) {
//       alert("Please enter a username");
//       return;
//     }

//     if (!currentUser) {
//       setCurrentUser(username);
//     }

//     const cohort = cohorts.find((c) => c.id === joinCohortId);
//     if (cohort) {
//       onJoinCohort(cohort.id, currentUser || username);
//       navigate(`/cohort/${cohort.id}`);
//     } else {
//       alert("Invalid cohort ID");
//     }
//   };

//   const handleJoinWithLink = (e) => {
//     e.preventDefault();
//     const cohortIdFromLink = joinLink.split("/join/")[1];
//     if (cohortIdFromLink) {
//       setJoinCohortId(cohortIdFromLink);
//       handleJoinCohort(e);
//     } else {
//       alert("Invalid join link");
//     }
//   };

//   const generateJoinLink = (cohort) => {
//     return `${window.location.origin}/join/${cohort.id}`;
//   };

//   return (
//     <div>
//       <h2>Add or Join a Cohort</h2>
//       {!currentUser && (
//         <div>
//           <input
//             type="text"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//       )}

//       <div>
//         <h3>Create a New Cohort</h3>
//         <form onSubmit={handleCreateCohort}>
//           <input
//             type="text"
//             placeholder="Enter cohort name"
//             value={cohortName}
//             onChange={(e) => setCohortName(e.target.value)}
//           />
//           <label>
//             <input
//               type="checkbox"
//               checked={isPrivate}
//               onChange={(e) => setIsPrivate(e.target.checked)}
//             />
//             Private Cohort
//           </label>
//           <button type="submit">Add Cohort</button>
//         </form>
//       </div>

//       <div>
//         <h3>Assign Admin to Private Cohort</h3>
//         <select
//           value={selectedAdmin}
//           onChange={(e) => setSelectedAdmin(e.target.value)}
//         >
//           <option value="">Select Admin</option>
//           {cohorts
//             .filter((cohort) => cohort.isPrivate && !cohort.admin)
//             .map((cohort) => (
//               <option key={cohort.id} value={currentUser}>
//                 Assign to: {currentUser}
//               </option>
//             ))}
//         </select>
//         <button onClick={() => handleAssignAdmin(joinCohortId)}>
//           Assign Admin
//         </button>
//       </div>

//       <div>
//         <h3>Join an Existing Cohort</h3>
//         <form onSubmit={handleJoinCohort}>
//           <input
//             type="text"
//             placeholder="Enter cohort ID"
//             value={joinCohortId}
//             onChange={(e) => setJoinCohortId(e.target.value)}
//           />
//           <button type="submit">Join Cohort</button>
//         </form>
//       </div>

//       <div>
//         <h3>Join Using a Link</h3>
//         <form onSubmit={handleJoinWithLink}>
//           <input
//             type="text"
//             placeholder="Enter join link"
//             value={joinLink}
//             onChange={(e) => setJoinLink(e.target.value)}
//           />
//           <button type="submit">Join with Link</button>
//         </form>
//       </div>

//       <div>
//         <h3>Available Cohorts</h3>
//         {cohorts.length > 0 ? (
//           cohorts.map((cohort) => (
//             <div key={cohort.id}>
//               <h4>
//                 {cohort.name} {cohort.isPrivate ? "(Private)" : ""}
//               </h4>
//               <p>Admin: {cohort.admin || "Unassigned"}</p>
//               {cohort.isPrivate && (
//                 <p>
//                   Join Link:{" "}
//                   <a href={generateJoinLink(cohort)}>
//                     {generateJoinLink(cohort)}
//                   </a>
//                 </p>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No cohorts available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AddCohort;


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

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// function AddCohort() {
//   const [cohorts, setCohorts] = useState([]);
//   const [cohortName, setCohortName] = useState("");
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [joinCohortId, setJoinCohortId] = useState("");

//   const navigate = useNavigate();

//   // Fetch cohorts when component mounts
//   useEffect(() => {
//     fetchCohorts();
//   }, []);

//   const fetchCohorts = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:5000/cohort/list', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       setCohorts(response.data);
//     } catch (error) {
//       console.error("Failed to fetch cohorts", error);
//       alert(error.response?.data?.error || "Failed to load cohorts");
//     }
//   };

//   const handleCreateCohort = async (e) => {
//     e.preventDefault();

//     if (!cohortName.trim()) {
//       alert("Cohort name cannot be empty");
//       return;
//     }

//     if (!currentUser) {
//       setCurrentUser(username);
//     }

//     if (cohortName.trim()) {
//       const newCohort = {
//         name: cohortName,
//         isPrivate,
//         admin: isPrivate ? null : currentUser || username, 
//       };

//       onAddCohort(newCohort);
//       setCohortName("");
//       setIsPrivate(false);

//       if (isPrivate) {
//         alert(
//           `Private cohort "${cohortName}" created! Please assign an admin.`
//         );
//       } else {
//         alert(`Cohort "${cohortName}" created!`);
//       }
//     } else {
//       alert("Cohort name cannot be empty");
//     }
//   };

//   const handleAssignAdmin = (cohortId) => {
//     const cohort = cohorts.find((c) => c.id === cohortId);
//     if (cohort && selectedAdmin) {
//       cohort.admin = selectedAdmin; 
//       alert(`Admin ${selectedAdmin} assigned to ${cohort.name}`);
//       setSelectedAdmin("");
//     } else {
//       alert("Please select a valid admin");
//     }
//   };
// const handleJoinCohort = async (e) => {
//     e.preventDefault();

//     if (!joinCohortId.trim()) {
//         alert("Cohort ID cannot be empty");
//         return;
//     }

//     try {
//         const token = localStorage.getItem('token');
//         const response = await axios.post('http://localhost:5000/cohort/join', 
//             { cohortId: joinCohortId },
//             {
//                 headers: { 
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         // Refresh cohorts list
//         fetchCohorts();

//         alert("Successfully joined cohort");
//         navigate(`/cohort/${joinCohortId}`);
//     } catch (error) {
//         console.error("Join cohort failed", error);
//         alert(error.response?.data?.error || "Failed to join cohort");
//     }
// };

//   return (
//     <div>
//       <h2>Add or Join a Cohort</h2>

//       <div>
//         <h3>Create a New Cohort</h3>
//         <form onSubmit={handleCreateCohort}>
//           <input
//             type="text"
//             placeholder="Enter cohort name"
//             value={cohortName}
//             onChange={(e) => setCohortName(e.target.value)}
//           />
//           <label>
//             <input
//               type="checkbox"
//               checked={isPrivate}
//               onChange={(e) => setIsPrivate(e.target.checked)}
//             />
//             Private Cohort
//           </label>
//           <button type="submit">Add Cohort</button>
//         </form>
//       </div>

//       <div>
//         <h3>Join an Existing Cohort</h3>
//         <form onSubmit={handleJoinCohort}>
//           <input
//             type="text"
//             placeholder="Enter cohort ID"
//             value={joinCohortId}
//             onChange={(e) => setJoinCohortId(e.target.value)}
//           />
//           <button type="submit">Join Cohort</button>
//         </form>
//       </div>

//       <div>
//         <h3>Available Cohorts</h3>
//         {cohorts.length > 0 ? (
//           cohorts.map((cohort) => (
//             <div key={cohort.id}>
//               <h4>
//                 {cohort.name} {cohort.isPrivate ? "(Private)" : ""}
//               </h4>
//               <p>Admin: {cohort.admin || "Unassigned"}</p>
//             </div>
//           ))
//         ) : (
//           <p>No cohorts available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AddCohort;