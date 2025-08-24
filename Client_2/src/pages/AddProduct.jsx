import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import axios from "axios";
import { backend_url } from "../constants";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;
    setLoading(true);
    try {
      await axios.post(
        `${backend_url}/api/v1/products`,
        {
          name: formData.name,
          description: formData.description,
          category: formData.category,
          price: formData.price,
        },
        { withCredentials: true }
      );
      navigate("/products");
    } catch (err) {
      console.log(err);
      
      alert(
        err.response?.data?.message ||
          err.response?.data?.msg ||
          "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow p-6 space-y-4"
          >
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
            />
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product Description"
              required
            />
            <Input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
            />
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
            />
            <Button
              type="submit"
              className="w-full font-bold"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}

