import axios from "axios";

const API = axios.create({ baseURL: "https://calenswap.onrender.com" });

// Include token in every request if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
