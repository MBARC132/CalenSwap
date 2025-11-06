import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import LandingNav from "./components/LandingNav";
import LandingPage from "./components/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Requests from "./pages/Requests";

// Protected route: only accessible if user is logged in
function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

// Public route: only accessible if user is NOT logged in
function PublicRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/dashboard" /> : children;
}

function AppContent() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      {/* LandingNav always visible */}
      <LandingNav />

      {/* Navbar visible only when logged in */}
      {user && <Navbar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        {/* Protected Pages */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/marketplace" element={<PrivateRoute><Marketplace /></PrivateRoute>} />
        <Route path="/requests" element={<PrivateRoute><Requests /></PrivateRoute>} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
