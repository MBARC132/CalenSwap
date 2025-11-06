import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ use your custom hook
import "../styles/LandingNav.css";

function LandingNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // back to landing page
  };

  return (
    <nav className="landing-navbar">
      <h1 className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          SlotSwapper
        </Link>
      </h1>

      <div className="nav-right">
        {!user ? (
          <Link to="/login" className="btn signin-btn">
            Sign In
          </Link>
        ) : (
          <button onClick={handleLogout} className="btn logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default LandingNav;
