
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Import App Pages
import Dashboard from "./pages/Home/Dashboard";
import Resources from "./pages/Resources/Resources";
import Profile from "./pages/Profile/Profile";
import Forums from "./pages/Forums/Forums";
import StudyPlans from "./pages/StudyPlan/StudyPlans";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* App Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/study-plans" element={<StudyPlans />} />
          
          {/* Landing page */}
          <Route path="/" element={<Index />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
