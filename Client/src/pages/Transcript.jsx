import React from "react";
import {
  Home,
  PhoneCall,
  User,
  LogOut,
  Download,
  Share2,
  ArrowLeft,
} from "lucide-react";

export default function App() {
  const transcript = [
    {
      time: "10:01 AM",
      from: "AI",
      text: "Hello, this is your AI assistant. How are you today?",
    },
    {
      time: "10:02 AM",
      from: "You",
      text: "I’m good, thank you. Can you give me today’s product updates?",
    },
    {
      time: "10:03 AM",
      from: "AI",
      text: "Of course! We’ve rolled out version 2.1 with bug fixes and a new analytics dashboard.",
    },
    {
      time: "10:05 AM",
      from: "You",
      text: "That’s great! I’ll review it later today.",
    },
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
      <main className="flex-1 p-8 flex flex-col">
        {/* Top Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition">
            <ArrowLeft className="w-4 h-4" /> Back to History
          </button>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition shadow">
              <Download className="w-4 h-4" /> Download PDF
            </button>
            <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        {/* Transcript */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Call Transcript
          </h2>
          <div className="space-y-6">
            {transcript.map((line, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  line.from === "AI" ? "items-start" : "items-end"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-lg text-sm shadow ${
                    line.from === "AI"
                      ? "bg-indigo-100 text-gray-800"
                      : "bg-green-100 text-gray-800"
                  }`}
                >
                  <p className="mb-1">{line.text}</p>
                  <span className="text-xs text-gray-500">{line.time}</span>
                </div>
                <span className="text-xs mt-1 text-gray-500">{line.from}</span>
              </div>
            ))}
          </div>
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
