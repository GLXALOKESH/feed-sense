import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},{ timestamps: true });


export const Product = mongoose.model("Product", productSchema);