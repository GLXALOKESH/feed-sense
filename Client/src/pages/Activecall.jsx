import React, { useState } from "react";
import { Mic, MicOff, PhoneOff, Bot } from "lucide-react";

export default function App() {
  const [muted, setMuted] = useState(false);

  // Example live transcription
  const transcripts = [
    { from: "AI", text: "Hello! How are you today?" },
    { from: "You", text: "I’m doing well, thank you!" },
    { from: "AI", text: "Great to hear. Do you want me to give product updates?" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6 relative">
      {/* Glowing Background */}
      <div className="absolute w-96 h-96 rounded-full bg-indigo-600 opacity-20 blur-3xl animate-pulse"></div>

      {/* AI Avatar */}
      <div className="flex flex-col items-center mt-12 relative z-10">
        <div className="w-32 h-32 rounded-full bg-indigo-500 flex items-center justify-center shadow-2xl relative">
          <div className="absolute w-40 h-40 rounded-full border-4 border-indigo-400 animate-ping"></div>
          <Bot className="w-16 h-16 text-white relative z-10" />
        </div>
        <h2 className="text-xl font-semibold mt-4 animate-pulse">
          AI Assistant Speaking...
        </h2>
      </div>

      {/* Live Transcription */}
      <div className="w-full max-w-2xl bg-gray-800/70 backdrop-blur-md rounded-2xl p-4 h-64 overflow-y-auto mt-8 shadow-lg relative z-10">
        {transcripts.map((line, index) => (
          <p
            key={index}
            className={`mb-3 ${
              line.from === "AI" ? "text-indigo-300" : "text-green-300"
            }`}
          >
            <span className="font-semibold">{line.from}:</span> {line.text}
          </p>
        ))}
        <p className="text-indigo-400 animate-pulse">AI: ...listening...</p>
      </div>

      {/* Bottom Buttons */}
      <div className="flex gap-10 mt-8 mb-12 relative z-10">
        {/* Mute/Unmute */}
        <button
          onClick={() => setMuted(!muted)}
          className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-600 transition transform hover:scale-105"
        >
          {muted ? (
            <MicOff className="w-8 h-8 text-red-400" />
          ) : (
            <Mic className="w-8 h-8 text-green-400" />
          )}
        </button>

        {/* End Call */}
        <button className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-lg hover:bg-red-600 transition transform hover:scale-105">
          <PhoneOff className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}
