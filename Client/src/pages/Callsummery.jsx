import React from "react";
import { Bot, FileText, Home } from "lucide-react";

export default function App() {
  const callDuration = "07:42"; // example duration
  const highlights = [
    "AI provided product updates on version 2.1",
    "You confirmed availability for next feedback session",
    "AI noted recurring issue about payment failures"
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
      {/* AI Illustration */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center shadow-2xl relative">
          <Bot className="w-16 h-16 text-white animate-bounce" />
          {/* waving effect: small rotated bot arm simulation */}
          <div className="absolute top-10 right-6 w-8 h-2 bg-indigo-300 rounded-full rotate-45 animate-pulse"></div>
        </div>
        <h2 className="text-xl font-semibold mt-4">Call Ended — Goodbye!</h2>
      </div>

      {/* Call Duration */}
      <p className="text-lg text-gray-300 mb-6">
        Duration: <span className="font-semibold text-indigo-400">{callDuration}</span>
      </p>

      {/* Highlights */}
      <div className="w-full max-w-2xl bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-indigo-300 mb-4">
          Key Highlights
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          {highlights.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex gap-6">
        <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-xl font-medium transition shadow-lg">
          <FileText className="w-5 h-5" /> View Full Transcript
        </button>
        <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-medium transition shadow-lg">
          <Home className="w-5 h-5" /> Back to Dashboard
        </button>
      </div>
    </div>
  );
}
