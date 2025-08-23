import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  audioUrl: String, // recorded audio file path
  transcript: String,
  sentiment: { type: String, enum: ["positive", "neutral", "negative"], default: "neutral" },
  confidenceScore: Number, // from sentiment model
  createdAt: { type: Date, default: Date.now }
});

export const Response = mongoose.model("Response", responseSchema);