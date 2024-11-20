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

import React, { useState, useEffect } from 'react';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    role: '',
    skills: ''
  });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users
  const fetchUsers = async (searchQuery = '') => {
    try {
      const response = await fetch(`http://localhost:5000/api/users?q=${searchQuery}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setNewUser({ name: '', role: '', skills: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingUser),
      });
      const updatedUser = await response.json();
      setUsers(users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2>Team Member Management</h2>
      
      {/* Search Input */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text"
          placeholder="Search team members" 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchUsers(e.target.value);
          }}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
      </div>

  {/* Add/Edit User Form */}
  <form 
    onSubmit={editingUser ? handleUpdateUser : handleAddUser} 
    style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr 1fr', 
      gap: '10px', 
      marginBottom: '20px' 
    }}
  >
    <input 
      type="text"
      placeholder="Name" 
      value={editingUser ? editingUser.name : newUser.name}
      onChange={(e) => 
        editingUser 
          ? setEditingUser({...editingUser, name: e.target.value})
          : setNewUser({...newUser, name: e.target.value})
      }
      required 
    />
    <input 
      type="text"
      placeholder="Role" 
      value={editingUser ? editingUser.role : newUser.role}
      onChange={(e) => 
        editingUser 
          ? setEditingUser({...editingUser, role: e.target.value})
          : setNewUser({...newUser, role: e.target.value})
      }
      required 
    />
    <input 
      type="text"
      placeholder="Skills" 
      value={editingUser ? editingUser.skills : newUser.skills}
      onChange={(e) => 
        editingUser 
          ? setEditingUser({...editingUser, skills: e.target.value})
          : setNewUser({...newUser, skills: e.target.value})
      }
      required 
    />
    <button 
      type="submit" 
      style={{ gridColumn: 'span 3', padding: '10px' }}
    >
      {editingUser ? 'Update User' : 'Add User'}
    </button>
  </form>

  {/* User List */}
  <div>
    {users.map(user => (
      <div 
        key={user.id} 
        style={{ 
          border: '1px solid #ddd', 
          padding: '10px', 
          marginBottom: '10px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>{user.name}</h3>
          <p style={{ margin: 0, color: '#666' }}>{user.role}</p>
          <p style={{ margin: 0, color: '#888' }}>Skills: {user.skills}</p>
        </div>
        <div>
          <button 
            onClick={() => setEditingUser(user)}
            style={{ marginRight: '10px', padding: '5px 10px' }}
          >
            Edit
          </button>
          <button 
            onClick={() => handleDeleteUser(user.id)}
            style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white' }}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default Search;