import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-2xl bg-white">
        {/* Left Section: Signup Form */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Create your account
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </form>

          <div className="mt-5">
            <button className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-100 transition">
              <FcGoogle size={22} /> Sign up with Google
            </button>
          </div>
        </div>

        {/* Right Section: Illustration */}
        <div className="hidden md:flex items-center justify-center bg-blue-50 rounded-r-2xl p-6">
          <img
            src="https://cdn.dribbble.com/userupload/12000438/file/original-6a2b0c35b6a1c4e1b2ef2ff23f4b219a.png?resize=1200x900"
            alt="AI helping Product Manager analyze data"
            className="max-h-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
