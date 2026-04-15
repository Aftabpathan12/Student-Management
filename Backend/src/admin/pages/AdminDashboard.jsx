import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./AdminDashboard.css";


function AdminDashboard() {

  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    orders: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await API.get("/admin/dashboard-stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      <h2>Dashboard Overview</h2>

      <div className="stats-grid">

        <div className="card">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>

        <div className="card">
          <h3>Total Courses</h3>
          <p>{stats.courses}</p>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p>{stats.orders}</p>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;