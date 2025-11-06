import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import '../styles/Signup.css'; 

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form); 
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Name" 
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
        />
        <input 
          placeholder="Email" 
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} 
        />
        <input 
          placeholder="Password" 
          type="password" 
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} 
        />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Signup;
