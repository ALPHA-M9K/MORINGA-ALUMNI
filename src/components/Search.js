// import React, { useState } from "react";

// const mockData = [
//   {
//     id: 1,
//     name: "Alice",
//     role: "Co-founder",
//     skills: "React, JavaScript, Node.js",
//   },
//   { id: 2, name: "Bob", role: "Developer", skills: "JavaScript, CSS, HTML" },
//   {
//     id: 3,
//     name: "Charlie",
//     role: "Mentor",
//     skills: "JavaScript, React, Python",
//   },
//   {
//     id: 4,
//     name: "David",
//     role: "Developer",
//     skills: "React, TypeScript, Node.js",
//   },
//   {
//     id: 5,
//     name: "Eve",
//     role: "Mentor",
//     skills: "JavaScript, React, Leadership",
//   },
// ];

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState(mockData);


//   const handleSearchChange = (e) => {
//     setQuery(e.target.value);
//   };


//   const handleSearch = () => {
//     const searchQuery = query.toLowerCase();
//     const filtered = mockData.filter(
//       (user) =>
//         user.name.toLowerCase().includes(searchQuery) ||
//         user.role.toLowerCase().includes(searchQuery) ||
//         user.skills.toLowerCase().includes(searchQuery)
//     );
//     setFilteredUsers(filtered);
//   };

//   return (
//     <div>
//       <h2>Search for Co-founders, Developers, and Mentors</h2>
//       <div>
//         <input
//           type="text"
//           value={query}
//           onChange={handleSearchChange}
//           placeholder="Search by name, role, or skills"
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       <div>
//         {filteredUsers.length === 0 ? (
//           <p>No results found</p>
//         ) : (
//           filteredUsers.map((user) => (
//             <div key={user.id} className="user-card">
//               <h3>{user.name}</h3>
//               <p>{user.role}</p>
//               <p>Skills: {user.skills}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Search;

import React, { useState } from "react";

// const mockData = [
//   {
//     id: 1,
//     name: "Alice",
//     role: "Co-founder",
//     skills: "React, JavaScript, Node.js",
//   },
//   { id: 2, name: "Bob", role: "Developer", skills: "JavaScript, CSS, HTML" },
//   {
//     id: 3,
//     name: "Charlie",
//     role: "Mentor",
//     skills: "JavaScript, React, Python",
//   },
//   {
//     id: 4,
//     name: "David",
//     role: "Developer",
//     skills: "React, TypeScript, Node.js",
//   },
//   {
//     id: 5,
//     name: "Eve",
//     role: "Mentor",
//     skills: "JavaScript, React, Leadership",
//   },
// ];

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState(mockData);


//   const handleSearchChange = (e) => {
//     setQuery(e.target.value);
//   };


//   const handleSearch = () => {
//     const searchQuery = query.toLowerCase();
//     const filtered = mockData.filter(
//       (user) =>
//         user.name.toLowerCase().includes(searchQuery) ||
//         user.role.toLowerCase().includes(searchQuery) ||
//         user.skills.toLowerCase().includes(searchQuery)
//     );
//     setFilteredUsers(filtered);
//   };

//   return (
//     <div>
//       <h2>Search for Co-founders, Developers, and Mentors</h2>
//       <div>
//         <input
//           type="text"
//           value={query}
//           onChange={handleSearchChange}
//           placeholder="Search by name, role, or skills"
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       <div>
//         {filteredUsers.length === 0 ? (
//           <p>No results found</p>
//         ) : (
//           filteredUsers.map((user) => (
//             <div key={user.id} className="user-card">
//               <h3>{user.name}</h3>
//               <p>{user.role}</p>
//               <p>Skills: {user.skills}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Search;

import React, { useState, useEffect } from 'react';

const Search = () => {
  const [query, setQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedSkills, setSelectedSkills] = useState("All");
  const [filteredUsers, setFilteredUsers] = useState(mockData);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSkillsChange = (e) => {
    setSelectedSkills(e.target.value);
  };

  const handleSearch = () => {
    const searchQuery = query.toLowerCase();
    const filtered = mockData.filter((user) => {
      const matchesRole =
        selectedRole === "All" ||
        user.role.toLowerCase() === selectedRole.toLowerCase();
      const matchesSkills =
        selectedSkills === "All" ||
        user.skills.toLowerCase().includes(selectedSkills.toLowerCase());
      const matchesQuery =
        user.name.toLowerCase().includes(searchQuery) ||
        user.role.toLowerCase().includes(searchQuery) ||
        user.skills.toLowerCase().includes(searchQuery);

      return matchesRole && matchesSkills && matchesQuery;
    });

    setFilteredUsers(filtered);
  };

  return (
    <div className="search-container">
      <h2>Search for Co-founders, Developers, and Mentors</h2>

      {/* Search Input */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search team members"
          value={query}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Filter Options */}
      <div className="filter-options">
        <select onChange={handleRoleChange} value={selectedRole}>
          <option value="All">All Roles</option>
          <option value="Co-founder">Co-founder</option>
          <option value="Developer">Developer</option>
          <option value="Mentor">Mentor</option>
        </select>

        <select onChange={handleSkillsChange} value={selectedSkills}>
          <option value="All">All Skills</option>
          <option value="JavaScript">JavaScript</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
          <option value="Python">Python</option>
          <option value="CSS">CSS</option>
          <option value="HTML">HTML</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Leadership">Leadership</option>
        </select>
      </div>

      {/* Results */}
      <div className="user-list">
        {filteredUsers.length === 0 ? (
          <p>No results found</p>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Skills:</strong> {user.skills}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
