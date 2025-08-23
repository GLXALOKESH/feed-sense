import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema({
  pm: { type: mongoose.Schema.Types.ObjectId, ref: "PM", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },

  issue: String,
  frequency: Number,
  recommendedAction: String,
  status: { type: String, enum: ["pending", "in-progress", "done"], default: "pending" }
});

export const Recommendation = mongoose.model("Recommendation", RecommendationSchema);