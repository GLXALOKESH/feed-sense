import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <h1 className="text-4xl font-bold mb-4 text-indigo-800">Welcome to FeedSense</h1>
      <p className="mb-8 text-lg text-gray-700">AI-powered communication and product feedback platform.</p>
      <div className="flex gap-4">
        <Link to="/login" className="bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700 transition">Login</Link>
        <Link to="/signup" className="bg-white border border-indigo-600 text-indigo-700 px-6 py-2 rounded font-semibold hover:bg-indigo-50 transition">Sign Up</Link>
      </div>
    </div>
  );
}
