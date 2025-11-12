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
    const token: string | null = localStorage.getItem("token");
    
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
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Optional: redirect to login
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;