import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  role: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export const Contact = mongoose.model("Contact", contactSchema);
