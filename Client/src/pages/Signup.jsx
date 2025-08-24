import React from "react";
import { Mail, Lock, User } from "lucide-react"; // icons

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Create an Account
        </h2>

        {/* Form */}
        <form className="space-y-4">
          {/* Full Name */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <User className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full outline-none text-gray-700"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <Mail className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none text-gray-700"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <Lock className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none text-gray-700"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <Lock className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full outline-none text-gray-700"
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
