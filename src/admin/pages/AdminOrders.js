// import React, { useEffect, useState } from "react";
// import API from "../../services/api";

// function AdminOrders() {

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   const loadOrders = async () => {
//     const res = await API.get("/admin/orders");
//     setOrders(res.data);
//   };

//   const approveOrder = async (id) => {
//     await API.put(`/admin/approve-order/${id}`);
//     loadOrders();
//   };

//   const rejectOrder = async (id) => {
//     await API.put(`/admin/reject-order/${id}`);
//     loadOrders();
//   };

//   return (
//     <div>

//       <h2>All Orders 💳</h2>

//       <table border="1" cellPadding="10" width="100%">
//         <thead>
//           <tr>
//             <th>User</th>
//             <th>Course</th>
//             <th>Amount</th>
//             <th>Status</th>
//             <th>Approval</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders.map((o) => (
//             <tr key={o.id}>
//               <td>{o.userEmail}</td>
//               <td>{o.course.courseName}</td>
//               <td>₹{o.amount}</td>
//               <td>{o.status}</td>
//               <td>{o.approvalStatus || "PENDING"}</td>

//               <td>
//                 <button onClick={() => approveOrder(o.id)}>Approve</button>
//                 <button onClick={() => rejectOrder(o.id)}>Reject</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// }

// export default AdminOrders;



import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
      alert("Error loading orders ❌");
    } finally {
      setLoading(false);
    }
  };

  const approveOrder = async (id) => {
    if (window.confirm("Approve this order?")) {
      try {
        await API.put(`/admin/approve-order/${id}`);
        loadOrders();
        alert("Order approved successfully ✅");
      } catch (err) {
        console.log(err);
        alert("Failed to approve order ❌");
      }
    }
  };

  const rejectOrder = async (id) => {
    if (window.confirm("Reject this order?")) {
      try {
        await API.put(`/admin/reject-order/${id}`);
        loadOrders();
        alert("Order rejected ❌");
      } catch (err) {
        console.log(err);
        alert("Failed to reject order ❌");
      }
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.course?.courseName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || 
                          (filterStatus === "approved" && order.approvalStatus === "APPROVED") ||
                          (filterStatus === "pending" && (!order.approvalStatus || order.approvalStatus === "PENDING")) ||
                          (filterStatus === "rejected" && order.approvalStatus === "REJECTED");
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    approved: orders.filter(o => o.approvalStatus === "APPROVED").length,
    pending: orders.filter(o => !o.approvalStatus || o.approvalStatus === "PENDING").length,
    rejected: orders.filter(o => o.approvalStatus === "REJECTED").length,
    totalRevenue: orders.filter(o => o.approvalStatus === "APPROVED").reduce((sum, o) => sum + o.amount, 0)
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "APPROVED": return "approved";
      case "REJECTED": return "rejected";
      default: return "pending";
    }
  };

  const getBadgeIcon = (status) => {
    switch(status) {
      case "APPROVED": return "";
      case "REJECTED": return "";
      default: return "⏳";
    }
  };

  return (
    <div className="admin-orders-page">
      <div className="orders-container">
        
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <span className="header-icon"></span>
            <div>
              <h1>Manage Orders</h1>
              <p>View and process all customer orders</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card total">
            <span className="stat-icon"></span>
            <div>
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total Orders</span>
            </div>
          </div>
          <div className="stat-card approved">
            <span className="stat-icon"></span>
            <div>
              <span className="stat-value">{stats.approved}</span>
              <span className="stat-label">Approved</span>
            </div>
          </div>
          <div className="stat-card pending">
            <span className="stat-icon"></span>
            <div>
              <span className="stat-value">{stats.pending}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
          <div className="stat-card rejected">
            <span className="stat-icon"></span>
            <div>
              <span className="stat-value">{stats.rejected}</span>
              <span className="stat-label">Rejected</span>
            </div>
          </div>
          <div className="stat-card revenue">
            <span className="stat-icon"></span>
            <div>
              <span className="stat-value">₹{stats.totalRevenue.toLocaleString()}</span>
              <span className="stat-label">Total Revenue</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by user email or course name..."
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
              className={`filter-btn ${filterStatus === "pending" ? "active" : ""}`}
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </button>
            <button 
              className={`filter-btn ${filterStatus === "approved" ? "active" : ""}`}
              onClick={() => setFilterStatus("approved")}
            >
              Approved
            </button>
            <button 
              className={`filter-btn ${filterStatus === "rejected" ? "active" : ""}`}
              onClick={() => setFilterStatus("rejected")}
            >
              Rejected
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="table-container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon"></span>
              <h3>No orders found</h3>
              <p>{searchTerm ? "Try a different search term" : "No orders have been placed yet"}</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Course</th>
                    <th>Amount</th>
                    <th>Order Status</th>
                    <th>Approval Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className={`status-row ${getStatusColor(order.approvalStatus)}`}>
                      <td className="order-id">#{order.id}</td>
                      <td className="customer-cell">
                        <div className="customer-info">
                          <span className="customer-icon"></span>
                          <span>{order.userEmail}</span>
                        </div>
                      </td>
                      <td className="course-cell">
                        <div className="course-info">
                          <span className="course-icon"></span>
                          <span>{order.course?.courseName}</span>
                        </div>
                      </td>
                      <td className="amount-cell">
                        <span className="amount">₹{order.amount?.toLocaleString()}</span>
                      </td>
                      <td className="status-cell">
                        <span className={`order-status-badge ${order.status?.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="approval-cell">
                        <span className={`approval-badge ${getStatusColor(order.approvalStatus)}`}>
                          {getBadgeIcon(order.approvalStatus)} {order.approvalStatus || "PENDING"}
                        </span>
                      </td>
                      <td className="actions-cell">
                        {(!order.approvalStatus || order.approvalStatus === "PENDING") && (
                          <div className="action-buttons">
                            <button 
                              onClick={() => approveOrder(order.id)} 
                              className="approve-btn"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => rejectOrder(order.id)} 
                              className="reject-btn"
                            >
                            Reject
                            </button>
                          </div>
                        )}
                        {(order.approvalStatus === "APPROVED" || order.approvalStatus === "REJECTED") && (
                          <span className="processed-label">
                            {order.approvalStatus === "APPROVED" ? "✓ Processed" : "✗ Rejected"}
                          </span>
                        )}
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

export default AdminOrders;