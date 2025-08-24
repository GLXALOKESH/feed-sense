import React from "react";
import { Phone, PhoneOff, Bot } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white relative overflow-hidden">
      {/* Background Pulse Animation */}
      <div className="absolute w-72 h-72 rounded-full bg-indigo-500 opacity-30 animate-ping"></div>
      <div className="absolute w-96 h-96 rounded-full bg-indigo-400 opacity-20 animate-pulse"></div>

      {/* AI Avatar */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center shadow-2xl mb-6">
          <Bot className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-xl font-semibold">AI Assistant is calling you…</h2>
      </div>

      {/* Buttons */}
      <div className="relative z-10 flex gap-10 mt-10">
        {/* Reject */}
        <button className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-lg hover:bg-red-600 transition transform hover:scale-105">
          <PhoneOff className="w-8 h-8 text-white" />
        </button>

        {/* Accept */}
        <button className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-600 transition transform hover:scale-105">
          <Phone className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}
