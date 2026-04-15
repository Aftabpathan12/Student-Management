// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, roleRequired }) => {

//   const role = localStorage.getItem("role");

//   // ❌ Not logged in
//   if (!role) {
//     return <Navigate to="/login" replace />;
//   }

//   // ❌ Wrong role
//   if (roleRequired && role !== roleRequired) {
//     localStorage.removeItem("role");
//     localStorage.removeItem("email");
//     localStorage.removeItem("token");
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;