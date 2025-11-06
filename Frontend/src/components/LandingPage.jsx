import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SearchIcon from "@mui/icons-material/Search";

function LandingPage() {
  return (
    <div className="landing-container">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h2>Get Started</h2>
          <h1>Peer-to-Peer Time-Slot Scheduling</h1>
          <p>
            Trade your busy time slots with others. Find the perfect schedule
            that works for everyone.
          </p>
          <Link to="/signup" className="btn hero-btn">
            <SwapHorizIcon style={{ marginRight: "8px" }} />
            Start Swapping
          </Link>
        </div>

        {/* Features Cards */}
        <div className="features-section">
          <div className="feature-card">
            <CalendarTodayIcon style={{ fontSize: 50, color: "#61dafb" }} />
            <h3>Manage Your Calendar</h3>
            <p>Create events and mark busy slots as swappable when you need flexibility.</p>
          </div>
          <div className="feature-card">
            <SearchIcon style={{ fontSize: 50, color: "#61dafb" }} />
            <h3>Browse Marketplace</h3>
            <p>Discover available time slots from others and request swaps that work for you.</p>
          </div>
          <div className="feature-card">
            <SwapHorizIcon style={{ fontSize: 50, color: "#61dafb" }} />
            <h3>Accept & Swap</h3>
            <p>Review incoming requests and accept swaps to automatically update both calendars.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
