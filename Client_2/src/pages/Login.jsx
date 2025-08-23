import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc"

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left Section - Login Form */}
      <div className="flex flex-col justify-center px-8 md:px-16">
        <Card className="shadow-lg border-0">
          <CardContent className="space-y-6 p-8">
            <h1 className="text-2xl font-bold text-gray-900">Login</h1>
            <form className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <Button className="w-full font-semibold text-white" size="lg">
                Login
              </Button>
            </form>
            <div className="flex items-center gap-2">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>
            <Button variant="outline" className="w-full font-medium flex items-center gap-2">
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
  )
}
