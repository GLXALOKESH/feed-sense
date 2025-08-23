import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, Lock, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login form submitted:", formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Illustration Side */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-3xl gradient-electric flex items-center justify-center glow-accent">
              <Bot className="w-16 h-16 text-accent-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-4">AI Assistant Calling</h2>
            <p className="text-muted-foreground text-lg">
              Experience the future of communication with intelligent AI calls
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="flex justify-center mb-8 lg:hidden">
              <div className="w-16 h-16 rounded-2xl gradient-electric flex items-center justify-center glow-accent">
                <Bot className="w-8 h-8 text-accent-foreground" />
              </div>
            </div>

            <Card className="gradient-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to your AI Assistant account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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

                  <div className="flex items-center justify-between text-sm">
                    <Link 
                      to="/forgot-password" 
                      className="text-accent hover:text-accent/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full" variant="auth" size="lg">
                    Log In
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link 
                      to="/signup" 
                      className="text-accent hover:text-accent/80 font-medium transition-colors"
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
  )
}

export default Login