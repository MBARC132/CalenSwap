import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import '../styles/Login.css'; // import the CSS

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/signin", form);
    login(res.data.user, res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p>New user? <Link to="/signup">Signup</Link></p>
    </div>
  );
}

export default Login;
