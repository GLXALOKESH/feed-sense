import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    if (!name || !description) {
      throw new ApiError(400, "Name and description are required");
    }
    const product = await Product.create({
      name,
      description,
      category,
      price,
      createdBy: req.user?._id,
    });
    res.status(201).json(new ApiResponce(201, product, "Product created"));
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Failed to create product",
    });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      throw new ApiError(404, "Product not found");
    }
    res.status(200).json(new ApiResponce(200, deleted, "Product deleted"));
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Failed to delete product",
    });
  }
};

// Fetch all products for the logged-in user
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.user?._id });
    res
      .status(200)
      .json(new ApiResponce(200, { products }, "Fetched all products"));
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Failed to fetch products",
    });
  }
};
