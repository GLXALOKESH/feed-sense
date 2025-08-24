import React from "react";
import { Mail, Lock, Phone } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 rounded-full p-6">
            <Phone className="w-12 h-12 text-indigo-500" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Welcome Back
        </h2>

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
            <Mail className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none text-gray-700"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
            <Lock className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none text-gray-700"
            />
          </div>

          {/* Forgot password link */}
          <div className="flex justify-end">
            <a href="#" className="text-sm text-indigo-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Log In Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-indigo-600 transition"
          >
            Log In
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="#" className="text-indigo-500 hover:underline font-medium">
            Sign up instead
          </a>
        </p>
      </div>
    </div>
  );
}
