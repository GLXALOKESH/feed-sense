import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import LoginPage from "./pages/Login";
import AddProductPage from "./pages/AddProduct";
import DashboardPage from "./pages/Dashboard.jsx";
import CustomerDetail from "./pages/CustomerAnalysis.jsx";
import UserProfile from "./pages/Profile.jsx";
import ContactManagement from "./pages/ContactManagement.jsx";
import CouponDistribution from "./pages/DiscountCupon.jsx";
import LandingPage from "./pages/Landing.jsx";
import AllProducts from "./pages/AllProducts";

/********************
  Router & App
********************/
import './index.css';  
// or import './style.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/dashboard/:productId" element={<DashboardPage />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/contacts" element={<ContactManagement />} />
        <Route path="/coupons" element={<CouponDistribution />} />
      </Routes>
    </BrowserRouter>
  );
}

