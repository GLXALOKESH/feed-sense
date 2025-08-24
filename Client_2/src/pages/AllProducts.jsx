import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backend_url } from "../constants";
import { Button } from "@/components/ui/button";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      console.log("Fetching products...");
      try {
        const res = await axios.post(
  `${backend_url}/api/v1/products/get-products`,
  {}, // request body
  { withCredentials: true } // config
);

        setProducts(res.data.data.products || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCreate = () => {
    navigate("/add-product");
  };

  const handleProductClick = (productId) => {
    navigate(`/dashboard/${productId}`);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${backend_url}/api/v1/products/${productId}`, { withCredentials: true });
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Failed to delete product"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">All Products</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
          onClick={handleCreate}
        >
          Create Product
        </button>
      </div>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-lg transition relative"
              onClick={() => handleProductClick(product._id)}
            >
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <Button
                className="absolute top-2 right-2"
                variant="destructive"
                size="sm"
                onClick={e => {
                  e.stopPropagation();
                  handleDelete(product._id);
                }}
              >
                Delete
              </Button>
            </div>
          ))}
          {products.length === 0 && (
            <div className="text-gray-500 col-span-full text-center">No products found.</div>
          )}
        </div>
      )}
    </div>
  );
}

