// Setup in a separate file, e.g., axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/", // Adjusted for your API's baseURL
});

// Intercept request and attach the authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default axiosInstance;
