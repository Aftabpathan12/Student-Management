import React from "react";
import { Routes, Route } from "react-router-dom";

// AUTH
import Login from "../auth/Login";
import Register from "../auth/Register";

// USER PAGES
import UserDashboard from "../user/pages/UserDashboard";
import Courses from "../user/pages/Courses";
import MyCourses from "../user/pages/MyCourses";
import Cart from "../user/pages/Cart";
import Checkout from "../user/pages/Checkout";

// ADMIN PAGES
import AdminDashboard from "../admin/pages/AdminDashboard";
import AddCourse from "../admin/pages/AddCourse";
import ManageCourses from "../admin/pages/ManageCourses";
import Students from "../admin/pages/Students";
import AdminOrders from "../admin/pages/AdminOrders";

// 🔥 LAYOUTS
import UserLayout from "../user/layout/UserLayout";
import AdminLayout from "../admin/layout/AdminLayout"; // (agar nahi banaya to bata dena)

function AppRoutes() {

  return (
    <Routes>

      {/* AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🔵 USER ROUTES (WITH LAYOUT) */}
      <Route path="/user/dashboard" element={
        <UserLayout>
          <UserDashboard />
        </UserLayout>
      } />

      <Route path="/user/courses" element={
        <UserLayout>
          <Courses />
        </UserLayout>
      } />

      <Route path="/user/my-courses" element={
        <UserLayout>
          <MyCourses />
        </UserLayout>
      } />

      <Route path="/cart" element={
        <UserLayout>
          <Cart />
        </UserLayout>
      } />

      <Route path="/checkout" element={
        <UserLayout>
          <Checkout />
        </UserLayout>
      } />

      {/* 🔴 ADMIN ROUTES (WITH LAYOUT) */}
      <Route path="/admin/dashboard" element={
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      } />

      <Route path="/admin/addCourse" element={
        <AdminLayout>
          <AddCourse />
        </AdminLayout>
      } />

      <Route path="/admin/manage-courses" element={
        <AdminLayout>
          <ManageCourses />
        </AdminLayout>
      } />

      <Route path="/admin/students" element={
        <AdminLayout>
          <Students />
        </AdminLayout>
      } />

      <Route path="/admin/orders" element={
        <AdminLayout>
          <AdminOrders />
        </AdminLayout>
      } />

    </Routes>
  );
}

export default AppRoutes;