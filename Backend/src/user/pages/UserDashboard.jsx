// import React from "react";
// import Courses from "./Courses";
// import "./dashboard.css";

// function UserDashboard() {
//   return (
//     <div className="dashboard-content">
//       <h2>User Dashboard</h2>

//       <div className="dashboard-card">
//         <Courses />
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;

import React, { useEffect, useState } from "react";
import Courses from "./Courses";
import "./dashboard.css";

function UserDashboard() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      const name = email.split("@")[0];
      setUserName(name);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {userName}! 👋</h2>
        <p>Here are all available courses for you</p>
      </div>

      <div className="courses-wrapper">
        <Courses />
      </div>
    </div>
  );
}

export default UserDashboard;