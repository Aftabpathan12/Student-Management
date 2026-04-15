import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminLayout.css";
import AdminNavbar from "../components/AdminNavbar"; // ✅ ADD THIS

function AdminLayout({ children }) {

  const location = useLocation();

  return (
    <div className="admin-container">

      {/*  NEW MODERN NAVBAR */}
      <AdminNavbar />

      <div className="admin-body">

        {/*  SIDEBAR */}
        <div className="admin-sidebar">

          <Link 
            to="/admin/dashboard" 
            className={location.pathname === "/admin/dashboard" ? "active" : ""}
          >
             Dashboard
          </Link>

          <Link 
            to="/admin/addCourse"
            className={location.pathname === "/admin/addCourse" ? "active" : ""}
          >
             Add Course
          </Link>

          <Link 
            to="/admin/manage-courses"
            className={location.pathname === "/admin/manage-courses" ? "active" : ""}
          >
            Manage Courses
          </Link>

          <Link 
            to="/admin/students"
            className={location.pathname === "/admin/students" ? "active" : ""}
          >
             Students
          </Link>

          <Link 
            to="/admin/orders"
            className={location.pathname === "/admin/orders" ? "active" : ""}
          >
             Orders
          </Link>

        </div>

        {/*  CONTENT */}
        <div className="admin-content">
          {children}
        </div>

      </div>
    {/* <Footer /> ✅ correct position */}
    </div>
  );
}

export default AdminLayout;