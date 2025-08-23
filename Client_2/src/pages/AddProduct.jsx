import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function AddProductPage() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    launchDate: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;

    const newProduct = {
      id: Date.now(),
      ...formData,
      imageUrl: formData.image ? URL.createObjectURL(formData.image) : null,
    };
    setProducts([newProduct, ...products]);
    setFormData({ name: "", description: "", category: "", launchDate: "", image: null });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

        {/* Product Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4">
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
            type="date"
            name="launchDate"
            value={formData.launchDate}
            onChange={handleChange}
          />
          <Input type="file" name="image" onChange={handleChange} />
          <Button type="submit" className="w-full font-bold">Add Product</Button>
        </form>

        {/* Product Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-40 w-full object-cover"
                />
              )}
              <Card className="border-0 shadow-none">
                <CardContent className="p-4 space-y-2">
                  <h2 className="font-semibold text-lg">{product.name}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <Button className="mt-3 w-full">View Dashboard</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
