import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { backend_url } from "../constants.js";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${backend_url}/api/v1/users/login`,
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log("Login successful!");
        navigate("/products");
      }
    } catch (err) {
      console.log(err);
      
      alert(
        err.response?.data?.message ||
          err.response?.data?.msg ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left Section - Login Form */}
      <div className="flex flex-col justify-center px-8 md:px-16">
        <Card className="shadow-lg border-0">
          <CardContent className="space-y-6 p-8">
            <h1 className="text-2xl font-bold text-gray-900">Login</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <Button
                className="w-full font-semibold text-white"
                size="lg"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <div className="flex items-center gap-2">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>
            <Button
              variant="outline"
              className="w-full font-medium flex items-center gap-2"
            >
              <FcGoogle className="h-5 w-5" />
              Login with Google
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <img
          src="/illustrations/ai-dashboard.svg"
          alt="AI Dashboard Illustration"
          className="max-w-md"
        />
      </div>
    </div>
  );
}
