import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react"; // icons
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { backend_url } from "../constants.js";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backend_url}/api/v1/users/register`, {
        name: form.fullName,
        phone: form.phone,
        password: form.password,
        role: form.role,
      });
      alert("Registration Successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.response?.data?.msg ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Create an Account
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <User className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full outline-none text-gray-700"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <Mail className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full outline-none text-gray-700"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <Lock className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full outline-none text-gray-700"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <Lock className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              name="role"
              placeholder="Role"
              className="w-full outline-none text-gray-700"
              value={form.role}
              onChange={handleChange}
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-600 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Log In link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="#" className="text-purple-500 hover:underline font-medium">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
