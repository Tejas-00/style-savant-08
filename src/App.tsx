
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Wardrobe from "./pages/Wardrobe";
import Recommendations from "./pages/Recommendations";
import CameraView from "./pages/CameraView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Redirect to wardrobe if user is logged in
const RedirectIfLoggedIn = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (user) {
    return <Navigate to="/wardrobe" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => (
  <AnimatePresence mode="wait">
    <Routes>
      <Route path="/" element={<RedirectIfLoggedIn><Index /></RedirectIfLoggedIn>} />
      <Route path="/auth" element={<RedirectIfLoggedIn><Auth /></RedirectIfLoggedIn>} />
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
      <Route path="/wardrobe" element={<ProtectedRoute><Wardrobe /></ProtectedRoute>} />
      <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
      <Route path="/camera" element={<ProtectedRoute><CameraView /></ProtectedRoute>} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AnimatePresence>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
