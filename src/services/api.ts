/**
 * @file api.ts
 * @description
 * Centralized Axios configuration for handling all HTTP requests to the backend.
 * Includes a base URL, default headers, and a request interceptor that automatically
 * attaches a JWT token (if present) to every outgoing request.
 */
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

/**
 * Base URL of backend
 */
const API_URL: string = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Axios instance with default configuration
 */
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Optional: 10 second timeout
});

/**
 * Request Interceptor
 * Automatically attaches JWT token to Authorization header if available
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Buscar en ambos storages
    const token: string | null = 
      localStorage.getItem("token") || sessionStorage.getItem("token");
    
    console.log("=== API REQUEST ===");
    console.log("URL:", config.url);
    console.log("Token found?", !!token);
    console.log("==================");
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor (Optional)
 * Handle common response scenarios like token expiration
 */
api.interceptors.response.use(
  (response) => {
    console.log("=== API RESPONSE ===");
    console.log("URL:", response.config.url);
    console.log("Status:", response.status);
    console.log("Data:", response.data);
    console.log("===================");
    return response;
  },
  (error) => {
    console.error("=== API ERROR ===");
    console.error("URL:", error.config?.url);
    console.error("Status:", error.response?.status);
    console.error("Error:", error.response?.data);
    console.error("=================");
    
    // Handle 401 Unauthorized - token expired or invalid
    // ⚠️ NO eliminar token durante login, solo en rutas protegidas
    if (error.response?.status === 401 && !error.config?.url?.includes("/login")) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      
      // Redirigir solo si no estamos ya en login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;