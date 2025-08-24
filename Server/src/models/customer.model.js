import mongoose from "mongoose";


const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  linkedProduct: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "Conversation" }],
  persona: {   // AI clustering output
    type: String,
    enum: ["Budget-conscious", "Power-user", "Unhappy", "Loyalist", "Other"],
    default: "Other"
  },
  engagementLevel: { type: Number, default: 0 } // tracks gamification progress
}, { timestamps: true });

export const Customer = mongoose.model("Customer", customerSchema);
