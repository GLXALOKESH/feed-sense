import mongoose from "mongoose";


const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  generatedBy: { type: String, enum: ["Gemini", "FollowUp"], default: "Gemini" },
  ttsUrl: String, // link to generated TTS audio file
  createdAt: { type: Date, default: Date.now }
});

export const Question = mongoose.model("Question", questionSchema);