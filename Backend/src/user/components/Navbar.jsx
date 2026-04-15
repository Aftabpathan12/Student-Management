// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Navbar.css";

// function Navbar() {

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // 🧹 clear data
//     localStorage.removeItem("email");
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");

//     // 🔁 redirect to login
//     navigate("/login");
//   };

//   return (
//     <div className="navbar">

//       <h2>Student Portal</h2>

//       <button onClick={handleLogout}>
//         Logout 🚪
//       </button>

//     </div>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Add your search logic here
      alert(`Searching for: ${searchQuery}`);
      setSearchQuery("");
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Company Logo Section */}
        <div className="logo-section">
          <div className="company-logo">
            <svg className="logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" rx="20" fill="url(#gradient)"/>
              <path d="M30 50 L50 30 L70 50 L50 70 Z" fill="white" opacity="0.9"/>
              <circle cx="50" cy="50" r="15" fill="url(#gradient)"/>
              <circle cx="50" cy="50" r="8" fill="white"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#667eea"/>
                  <stop offset="100%" stop-color="#764ba2"/>
                </linearGradient>
              </defs>
            </svg>
            <div className="company-info">
              <h2 className="company-name">Embel</h2>
              <p className="company-tag">Technology Solutions</p>
            </div>
          </div>
        </div>

        {/* Search Bar Section */}
        <form className="search-section" onSubmit={handleSearch}>
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search students, courses, or documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
            <button type="submit" className="search-btn">Search</button>
          </div>
        </form>

        {/* Time & User Section */}
        <div className="user-section">
          <div className="time-container">
            <div className="time">
              <span className="clock-icon">🕐</span>
              <span className="time-text">{formatTime(currentTime)}</span>
            </div>
            <div className="date">{formatDate(currentTime)}</div>
          </div>

          <div className="user-actions">
            <button className="user-profile">
              <span className="user-icon"></span>
              <span className="user-name">Student</span>
            </button>
            
            <button onClick={handleLogout} className="logout-btn">
              <span className="logout-icon"></span>
              <span className="logout-text">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;