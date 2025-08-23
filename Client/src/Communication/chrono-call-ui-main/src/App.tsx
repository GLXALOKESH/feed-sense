import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CallHistory from "./pages/CallHistory";
import Profile from "./pages/Profile";
import IncomingCall from "./pages/IncomingCall";
import ActiveCall from "./pages/ActiveCall";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes (without sidebar) */}
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          {/* Call Interface Routes (fullscreen) */}
          <Route path="/call/incoming" element={<IncomingCall />} />
          <Route path="/call/active" element={<ActiveCall />} />
          
          {/* Protected Routes (with sidebar layout) */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/history" element={<Layout><CallHistory /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
