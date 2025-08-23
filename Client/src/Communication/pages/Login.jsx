import { useState } from "react";
import { Mail, Lock, Bot } from "lucide-react";

// Mock components for stand-alone functionality
const Card = ({ children, className }) => <div className={`border rounded-lg shadow-md ${className}`}>{children}</div>;
const CardHeader = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, className }) => <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>;
const CardDescription = ({ children, className }) => <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
const CardContent = ({ children, className }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const Label = ({ htmlFor, children }) => <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">{children}</label>;
const Input = (props) => <input {...props} className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${props.className}`} />;
const Button = ({ children, ...props }) => <button {...props} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{children}</button>;

// Mock Link component
const Link = ({ to, children, className }) => <a href={to} className={className}>{children}</a>;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Illustration Side */}
        <div className="hidden lg:flex items-center justify-center bg-white rounded-lg p-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Bot className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">AI Assistant Calling</h2>
            <p className="text-gray-600 text-lg">
              Experience the future of communication with intelligent AI calls
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="flex justify-center mb-8 lg:hidden">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Bot className="w-8 h-8 text-white" />
              </div>
            </div>

            <Card className="bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-gray-900">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to your AI Assistant account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end text-sm">
                    <Link
                      to="/forgot-password"
                      className="text-indigo-600 hover:text-indigo-500 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit">
                    Log In
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
                    >
                      Sign up instead
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
