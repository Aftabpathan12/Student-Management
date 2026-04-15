// import React, { useEffect, useState } from "react";
// import API from "../../services/api";

// function Students() {

//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     loadStudents();
//   }, []);

//   const loadStudents = async () => {
//     try {
//       const res = await API.get("/admin/students");
//       setStudents(res.data);
//     } catch (err) {
//       console.log(err);
//       alert("Error loading students ❌");
//     }
//   };

//   // ✅ Toggle Active/Blocked
//   const toggleUser = async (id) => {
//     try {
//       await API.put(`/admin/toggle-user/${id}`);
//       loadStudents();
//     } catch (err) {
//       console.log(err);
//       alert("Failed to update status ❌");
//     }
//   };

//   return (
//     <div>
//       <div style={{ display: "flex" }}>
//         <div style={{ padding: "20px" }}>

//           <h2>Students Page</h2>

//           <table border="1">
//             <thead>
//               <tr>
//                 <th>Full Name</th>
//                 <th>Email</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {
//                 students.map(s => (
//                   <tr key={s.id}>
                    
//                     {/* ✅ FULL NAME FIX */}
//                     <td>
//                       {s.firstName || ""} {s.lastName || ""}
//                     </td>

//                     <td>{s.email}</td>

//                     {/* ✅ STATUS FIX */}
//                     <td>
//                       {s.active ? "Active ✅" : "Blocked ❌"}
//                     </td>

//                     {/* ✅ BUTTON */}
//                     <td>
//                       <button onClick={() => toggleUser(s.id)}>
//                         Toggle
//                       </button>
//                     </td>

//                   </tr>
//                 ))
//               }
//             </tbody>

//           </table>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Students;


import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/students");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
      alert("Error loading students ❌");
    } finally {
      setLoading(false);
    }
  };

  const toggleUser = async (id) => {
    if (window.confirm("Are you sure you want to change this student's status?")) {
      try {
        await API.put(`/admin/toggle-user/${id}`);
        loadStudents();
        alert("Status updated successfully ✅");
      } catch (err) {
        console.log(err);
        alert("Failed to update status ❌");
      }
    }
  };

  // Filter students based on search and status
  const filteredStudents = students.filter(student => {
    const fullName = `${student.firstName || ""} ${student.lastName || ""}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || 
                          (filterStatus === "active" && student.active) ||
                          (filterStatus === "blocked" && !student.active);
    return matchesSearch && matchesStatus;
  });

  const activeCount = students.filter(s => s.active).length;
  const blockedCount = students.filter(s => !s.active).length;

  return (
    <div className="students-page">
      <div className="students-container">
        
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <span className="header-icon"></span>
            <div>
              <h1>Manage Students</h1>
              <p>View and manage all registered students</p>
            </div>
          </div>
          <div className="stats-container">
            <div className="stat-card active">
              <span className="stat-value">{activeCount}</span>
              <span className="stat-label">Active Students</span>
            </div>
            <div className="stat-card blocked">
              <span className="stat-value">{blockedCount}</span>
              <span className="stat-label">Blocked Students</span>
            </div>
            <div className="stat-card total">
              <span className="stat-value">{students.length}</span>
              <span className="stat-label">Total Students</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm("")}>
                ✕
              </button>
            )}
          </div>

          <div className="status-filters">
            <button 
              className={`filter-btn ${filterStatus === "all" ? "active" : ""}`}
              onClick={() => setFilterStatus("all")}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filterStatus === "active" ? "active" : ""}`}
              onClick={() => setFilterStatus("active")}
            >
              Active 
            </button>
            <button 
              className={`filter-btn ${filterStatus === "blocked" ? "active" : ""}`}
              onClick={() => setFilterStatus("blocked")}
            >
              Blocked 
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="table-container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading students...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon"></span>
              <h3>No students found</h3>
              <p>{searchTerm ? "Try a different search term" : "No students registered yet"}</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Email Address</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id} className={!student.active ? "blocked-row" : ""}>
                      <td className="serial-cell">{index + 1}</td>
                      <td className="name-cell">
                        <div className="student-avatar">
                          <span className="avatar-initials">
                            {student.firstName?.charAt(0) || ""}
                            {student.lastName?.charAt(0) || ""}
                          </span>
                          <div>
                            <strong>{student.firstName || ""} {student.lastName || ""}</strong>
                          </div>
                        </div>
                       </td>
                      <td className="email-cell">{student.email}</td>
                      <td className="status-cell">
                        <span className={`status-badge ${student.active ? "active" : "blocked"}`}>
                          {student.active ? "Active" : "Blocked"}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button 
                          onClick={() => toggleUser(student.id)} 
                          className={`toggle-btn ${student.active ? "block" : "activate"}`}
                        >
                          {student.active ? "Block" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Students;