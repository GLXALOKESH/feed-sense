export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-gray-800">FeedSense</h1>
        <nav className="flex gap-4">
          <a
            href="/login"
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign Up
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 items-center justify-between px-20">
        {/* Left Content */}
        <div className="max-w-lg">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Smarter Decisions for <span className="text-blue-600">Product Managers</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Harness the power of AI to analyze data, optimize strategies, and
            lead your product to success.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="/signup"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
            >
              Login
            </a>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="w-1/2">
          <img
            src="https://illustrations.popsy.co/gray/product-launch.svg"
            alt="AI helping Product Manager"
            className="w-full"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} FeedSense Platform. All rights reserved.
      </footer>
    </div>
  );
}
