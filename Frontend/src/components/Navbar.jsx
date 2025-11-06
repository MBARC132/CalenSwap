import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="main-navbar">
      <div className="nav-links">
        <Link to="/dashboard" className="nav-item">Dashboard</Link>
        <Link to="/marketplace" className="nav-item">Marketplace</Link>
        <Link to="/requests" className="nav-item">Requests</Link>
      </div>
    </nav>
  );
}

export default Navbar;
