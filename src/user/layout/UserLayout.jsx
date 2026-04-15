// import React from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import "../pages/dashboard.css";
// import Footer from "../../components/Footer";

// function UserLayout({ children }) {
//   return (
//     <div className="dashboard-container">

//       {/* NAVBAR */}
//       <Navbar />

//       <div className="dashboard-body">

//         {/* SIDEBAR */}
//         <Sidebar />

//         {/* PAGE CONTENT */}
//         <div className="dashboard-content">
//           {children}
//         </div>

//           <Footer />

//       </div>

//     </div>
//   );
// }

// export default UserLayout;


import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../pages/dashboard.css";
import Footer from "../components/Footer"; // ✅ FIXED

function UserLayout({ children }) {
  return (
    <div className="dashboard-container">

      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <div className="dashboard-content">
          {children}
        </div>
      </div>

      <Footer /> {/* ✅ correct position */}

    </div>
  );
}

export default UserLayout;