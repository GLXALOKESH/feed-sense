import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { create } from "zustand";
import { FiGrid, FiPackage, FiUsers, FiUser, FiPercent, FiUploadCloud, FiLogIn, FiUserPlus, FiUnlock } from "react-icons/fi";

/********************
  Router & App
********************/
import './index.css';  
// or import './style.css';

import Signup from "./pages/Signup";
import LoginPage from "./pages/Login";
import AddProductPage from "./pages/AddProduct";
import DashboardPage from "./pages/Dashboard.jsx";
import CustomerDetail from "./pages/CustomerAnalysis.jsx";
import UserProfile from "./pages/Profile.jsx";
import ContactManagement from "./pages/ContactManagement.jsx";
import CouponDistribution from "./pages/DiscountCupon.jsx";
import LandingPage from "./pages/Landing.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/contacts" element={<ContactManagement />} />
        <Route path="/coupons" element={<CouponDistribution />} />
        {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/products/:id" element={<ProductDashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/coupons" element={<CouponsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
