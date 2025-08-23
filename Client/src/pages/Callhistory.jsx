import React, { useState } from "react";
import { Home, PhoneCall, User, LogOut, Calendar, Filter } from "lucide-react";

export default function App() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const callHistory = [
    { date: "2025-08-20", duration: "5m 32s", status: "Completed" },
    { date: "2025-08-18", duration: "3m 10s", status: "Missed" },
    { date: "2025-08-15", duration: "7m 01s", status: "Completed" },
    { date: "2025-08-10", duration: "2m 45s", status: "Completed" },
    { date: "2025-08-05", duration: "6m 20s", status: "Missed" },
  ];

  const filteredCalls = callHistory.filter((call) => {
    const statusMatch =
      statusFilter === "All" || call.status === statusFilter;
    const dateMatch = dateFilter ? call.date === dateFilter : true;
    return statusMatch && dateMatch;
  });

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
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Call History</h2>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Date Filter */}
          <div className="flex items-center gap-2 bg-white border rounded-xl px-3 py-2 shadow-sm">
            <Calendar className="text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="outline-none text-gray-700"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-white border rounded-xl px-3 py-2 shadow-sm">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="outline-none text-gray-700 bg-transparent"
            >
              <option>All</option>
              <option>Completed</option>
              <option>Missed</option>
            </select>
          </div>
        </div>

        {/* Table */}
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
              {filteredCalls.length > 0 ? (
                filteredCalls.map((call, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{call.date}</td>
                    <td className="p-3">{call.duration}</td>
                    <td
                      className={`p-3 font-medium ${
                        call.status === "Completed"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {call.status}
                    </td>
                    <td className="p-3">
                      <button className="text-indigo-500 hover:underline">
                        View Transcript
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-400">
                    No calls match your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

/* Helper Component */
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
