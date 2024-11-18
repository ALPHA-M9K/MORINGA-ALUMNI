import React, { useState } from "react";

const mockData = [
  {
    id: 1,
    name: "Alice",
    role: "Co-founder",
    skills: "React, JavaScript, Node.js",
  },
  { id: 2, name: "Bob", role: "Developer", skills: "JavaScript, CSS, HTML" },
  {
    id: 3,
    name: "Charlie",
    role: "Mentor",
    skills: "JavaScript, React, Python",
  },
  {
    id: 4,
    name: "David",
    role: "Developer",
    skills: "React, TypeScript, Node.js",
  },
  {
    id: 5,
    name: "Eve",
    role: "Mentor",
    skills: "JavaScript, React, Leadership",
  },
];

const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockData);

  
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  
  const handleSearch = () => {
    const searchQuery = query.toLowerCase();
    const filtered = mockData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery) ||
        user.role.toLowerCase().includes(searchQuery) ||
        user.skills.toLowerCase().includes(searchQuery)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div>
      <h2>Search for Co-founders, Developers, and Mentors</h2>
      <div>
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search by name, role, or skills"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {filteredUsers.length === 0 ? (
          <p>No results found</p>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p>{user.role}</p>
              <p>Skills: {user.skills}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;

