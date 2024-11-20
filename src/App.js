import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    name: "Sharon Mutugi",
    email: "sharonmutugi18@gmail.com",
    bio: "Moringa graduate and full-stack developer.",
  });

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Navbar userName={currentUser.name} />
        <main className="content">
          <Profile user={currentUser} setUser={setCurrentUser} />
        </main>
        <footer className="footer">
          <p>&copy; 2024 Moringa Alumni</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
