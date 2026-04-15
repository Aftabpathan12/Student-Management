// import React from "react";

// function AdminNavbar() {

// return (

// <div style={{
// background:"#222",
// color:"white",
// padding:"15px"
// }}>

// <h3>Admin Panel</h3>

// </div>

// );

// }
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all admin data
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    
    // Redirect to login
    navigate("/login");
    localStorage.clear();
  };

  const adminName = localStorage.getItem("email")?.split("@")[0] || "Admin";

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        
        {/* Logo Section */}
        <div className="admin-logo-section">
          <div className="admin-logo">
            <span className="logo-icon"></span>
            <div className="logo-info">
              <h2 className="logo-text">Admin Portal</h2>
              <p className="logo-subtitle">Course Management System</p>
            </div>
          </div>
        </div>

        {/* Admin Info Section */}
        <div className="admin-info-section">
          <div className="admin-welcome">
            <span className="welcome-icon"></span>
            <span className="welcome-text">Welcome, <strong>{adminName}</strong></span>
          </div>
          
          <button onClick={handleLogout} className="admin-logout-btn">
            <span className="logout-icon"></span>
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;