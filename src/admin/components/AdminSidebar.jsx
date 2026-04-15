import React from "react";
import { Link } from "react-router-dom";

function AdminSidebar() {

  return (
    <div style={{
      width: "200px",
      background: "#eee",
      height: "100vh",
      padding: "20px"
    }}>

      <ul>

        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/admin/addCourse">Add Course</Link>
        </li>

        <li>
          <Link to="/admin/manage-courses">Manage Courses</Link>
        </li>

        <li>
          <Link to="/admin/students">Students</Link>
        </li>
       
       <li>
           <Link to="/admin/orders">Orders</Link>
       </li>
      </ul>

    </div>
  );
}

export default AdminSidebar;