import React, { useState } from "react";
import { Home, PhoneCall, User, LogOut, Settings, Trash2 } from "lucide-react";

export default function App() {
  const [notify, setNotify] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h1 className="text-xl font-bold text-indigo-600 mb-8">AI Calls</h1>
        <nav className="flex-1 space-y-4">
          <SidebarLink icon={<Home className="w-5 h-5" />} text="Dashboard" />
          <SidebarLink
            icon={<PhoneCall className="w-5 h-5" />}
            text="Call History"
          />
          <SidebarLink
            icon={<User className="w-5 h-5" />}
            text="Profile Settings"
          />
        </nav>
        <button className="flex items-center gap-2 text-red-500 font-medium hover:bg-red-50 p-2 rounded-lg transition">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Profile Settings
        </h2>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow p-6 max-w-lg space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
              AJ
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Alex Johnson</h3>
            <p className="text-gray-500">alex.johnson@example.com</p>
          </div>

          {/* Update Password */}
          <div className="space-y-2">
            <label className="text-gray-600 font-medium">Update Password</label>
            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Notification Preferences */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-600 font-medium">
                Alert Before AI Call
              </label>
              <p className="text-gray-400 text-sm">
                Receive notifications before scheduled AI calls
              </p>
            </div>
            <input
              type="checkbox"
              checked={notify}
              onChange={() => setNotify(!notify)}
              className="w-5 h-5 text-indigo-500 accent-indigo-500"
            />
          </div>

          {/* Delete Account */}
          <button className="flex items-center gap-2 justify-center w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-medium shadow-lg transition">
            <Trash2 className="w-5 h-5" /> Delete Account
          </button>
        </div>
      </main>
    </div>
  );
}

/* Sidebar Helper */
function SidebarLink({ icon, text }) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 text-gray-700 font-medium hover:bg-indigo-50 p-2 rounded-lg transition"
    >
      {icon}
      {text}
    </a>
  );
}
