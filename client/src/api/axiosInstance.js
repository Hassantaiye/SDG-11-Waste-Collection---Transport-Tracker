import axios from "axios";

// Get the base URL from environment variables
let baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Ensure the base URL ends with exactly what we need
baseURL = baseURL.replace(/\/$/, ""); // remove trailing slash

// If the base URL doesn't end with /api, add it
if (!baseURL.endsWith('/api')) {
  baseURL = `${baseURL}/api`;
}

console.log("🔗 API Base URL:", baseURL); // Debug log

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

// Attach JWT token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("🚨 API Error:", error.response?.status, error.config?.url);
    return Promise.reject(error);
  }
);

export default axiosInstance;
