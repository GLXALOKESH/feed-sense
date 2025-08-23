import { useEffect } from "react";

// Mock for react-router-dom's useLocation
const useLocation = () => {
  return {
    pathname: window.location.pathname,
  };
};

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-sans">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">404</h1>
        <p className="text-2xl text-gray-300 mb-8">Oops! Page not found</p>
        <a href="/" className="text-indigo-400 hover:text-indigo-300 underline transition-colors text-lg">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
