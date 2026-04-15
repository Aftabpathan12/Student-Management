import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/user/dashboard">Dashboard</Link>
      <Link to="/user/courses">Courses</Link>
      <Link to="/user/my-courses">My Courses</Link>
      <Link to="/cart">Cart 🛒</Link>
    </div>
  );
}

export default Sidebar;