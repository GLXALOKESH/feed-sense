import React from "react";
import { Home, PhoneCall, User, LogOut } from "lucide-react";

export default function App() {
  const userName = "Somhrita"; // example name
  const callHistory = [
    { date: "Aug 20, 2025", duration: "5m 32s", status: "Completed" },
    { date: "Aug 18, 2025", duration: "3m 10s", status: "Missed" },
    { date: "Aug 15, 2025", duration: "7m 01s", status: "Completed" },
  ];

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
          <SidebarLink icon={<User className="w-5 h-5" />} text="Profile Settings" />
        </nav>
        <button className="flex items-center gap-2 text-red-500 font-medium hover:bg-red-50 p-2 rounded-lg transition">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Welcome */}
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Welcome back, {userName} 👋
        </h2>

        {/* Big Card */}
        <div className="bg-indigo-100 border border-indigo-200 p-6 rounded-2xl shadow-md mb-8">
          <p className="text-lg font-semibold text-indigo-700">
            AI will call you when scheduled
          </p>
        </div>

        {/* Call History */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Call History
          </h3>
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {callHistory.map((call, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{call.date}</td>
                    <td className="p-3">{call.duration}</td>
                    <td className="p-3">{call.status}</td>
                    <td className="p-3">
                      <button className="text-indigo-500 hover:underline">
                        View Transcript
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

/* Small helper component for Sidebar links */
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
