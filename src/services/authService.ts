/**
 * @file authService.ts
 * @description
 * Authentication service that provides methods for user login, logout, and registration.
 * Uses a preconfigured Axios instance (api) to handle HTTP requests to the backend.
 * Adapted for OpportunAI with company registration support.
 */
import api from "./api";
import { AxiosResponse } from "axios";

/**
 * @interface User
 * @description User data structure
 */
export interface User {
  id: number;
  email: string;
  name?: string;
  companyName?: string;
  cnpj?: string;
  sector?: string;
  phone?: string;
  city?: string;
  state?: string;
}

/**
 * @interface LoginResponse
 * @description Response structure from login/register endpoints
 */
export interface LoginResponse {
  token: string;
  user: User;
}

/**
 * @interface LoginCredentials
 * @description Login request payload
 */
interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

/**
 * @interface RegisterCredentials
 * @description Registration request payload
 */
interface RegisterCredentials {
  companyName: string;
  cnpj: string;
  sector: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  city?: string;
  state?: string;
}

/**
 * @interface LogoutResponse
 * @description Response structure from logout endpoint
 */
interface LogoutResponse {
  message: string;
}

/**
 * Storage utility to handle token persistence
 */
const TokenStorage = {
  /**
   * Save token to appropriate storage
   */
  save: (token: string, rememberMe: boolean): void => {
    console.log("💾 SAVING TOKEN");
    console.log("Token length:", token.length);
    console.log("Token preview:", token.substring(0, 30) + "...");
    console.log("RememberMe:", rememberMe);
    console.log(
      "Target storage:",
      rememberMe ? "localStorage" : "sessionStorage"
    );

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", token);

    // Verificación inmediata
    const saved = storage.getItem("token");
    console.log("✅ Saved successfully?", saved === token);
    console.log("✅ Can retrieve?", saved !== null);
    console.log("==================");
  },

  /**
   * Get token from any storage
   */
  get: (): string | null => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  },

  /**
   * Remove token from all storages
   */
  clear: (): void => {
    console.log("🗑️ Clearing all tokens and user data");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  },

  /**
   * Save user data to storage
   */
  saveUser: (user: User, rememberMe: boolean): void => {
    console.log("💾 Saving user data");
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("user", JSON.stringify(user));
    console.log("✅ User saved");
  },
};

/**
 * @interface UserProfile
 * @description Detailed user profile data structure
 */
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  companyName?: string;
  cnpj?: string;
  sector?: string;
  phone?: string;
  city?: string;
  state?: string;
  createdAt: string;
}

/**
 * @namespace authService
 * @description
 * Collection of authentication-related API methods.
 * Each method communicates with the backend's `/auth` routes.
 */
export const authService = {
  /**
   * @async
   * @function getUserProfile
   * @memberof authService
   * @description
   * Fetches the detailed profile of the currently authenticated user from the backend.
   * The request is automatically authenticated by the Axios interceptor.
   *
   * @returns {Promise<UserProfile>} The user's detailed profile data.
   *
   * @throws {Error} If the request fails (e.g., user not authenticated, network error).
   *
   * @example
   * const profile = await authService.getUserProfile();
   * console.log(profile.name);
   */
  getUserProfile: async (): Promise<UserProfile> => {
    const response: AxiosResponse<{
      success: boolean;
      message: string;
      data: UserProfile;
    }> = await api.get("/auth/profile");

    console.log("📊 getUserProfile full response:", response.data);
    console.log("📊 Extracted profile data:", response.data.data);

    // ✅ Retornar solo los datos del usuario (response.data.data)
    return response.data.data;
  },

  /**
   * @async
   * @function login
   * @memberof authService
   * @description
   * Sends a login request to the backend with user credentials.
   * If successful, returns user data and a JWT token.
   *
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @param {boolean} rememberMe - Whether to remember the user's session.
   * @returns {Promise<LoginResponse>} The server response containing authentication data.
   *
   * @throws {Error} If login request fails
   *
   * @example
   * const data = await authService.login("user@example.com", "password123", true);
   */
  login: async (
    email: string,
    password: string,
    rememberMe: boolean = false
  ): Promise<LoginResponse> => {
    console.log("🔵 Starting login request...");
    console.log("Email:", email);
    console.log("RememberMe:", rememberMe);

    const credentials: LoginCredentials = {
      email,
      password,
      rememberMe,
    };

    const response: AxiosResponse<LoginResponse> = await api.post(
      "/auth/login",
      credentials
    );

    console.log("🔵 Response received");
    console.log("Response.data:", response.data);

    const { token, user } = response.data;

    console.log("🔵 Extracted from response:");
    console.log("Token present?", !!token);
    console.log("Token type:", typeof token);
    console.log("User present?", !!user);
    console.log("User:", user);

    if (token) {
      console.log("🔵 Calling TokenStorage.save...");
      TokenStorage.save(token, rememberMe);

      console.log("🔵 Calling TokenStorage.saveUser...");
      TokenStorage.saveUser(user, rememberMe);

      console.log("🔵 Verifying storage after save:");
      console.log("Can get token?", TokenStorage.get() !== null);
      console.log(
        "Token in sessionStorage?",
        sessionStorage.getItem("token") !== null
      );
      console.log(
        "Token in localStorage?",
        localStorage.getItem("token") !== null
      );
    } else {
      console.error("❌ NO TOKEN IN RESPONSE!");
    }

    return response.data;
  },

  /**
   * @async
   * @function logout
   * @memberof authService
   * @description
   * Sends a logout request to the backend and removes the JWT token
   * from local storage to end the user session on the client side.
   *
   * @returns {Promise<LogoutResponse>} The server response confirming logout.
   *
   * @throws {Error} If logout request fails
   *
   * @example
   * await authService.logout();
   */
  logout: async (): Promise<LogoutResponse> => {
    try {
      const response: AxiosResponse<LogoutResponse> = await api.post(
        "/auth/logout"
      );
      return response.data;
    } finally {
      // Clear tokens even if request fails
      TokenStorage.clear();
    }
  },

  /**
   * @async
   * @function register
   * @memberof authService
   * @description
   * Sends a registration request to create a new user account with company data.
   * Returns server data, typically containing confirmation or authentication info.
   * Adapted for OpportunAI to include company information (name, CNPJ, sector).
   *
   * @param {string} companyName - Company name.
   * @param {string} cnpj - Company CNPJ (Brazilian tax ID).
   * @param {string} sector - Company sector/industry.
   * @param {string} name - Full name of the user.
   * @param {string} email - Email address of the user.
   * @param {string} password - Chosen password.
   * @param {string} confirmPassword - Confirmation of the chosen password.
   * @returns {Promise<LoginResponse>} The server response after registration.
   *
   * @throws {Error} If registration request fails
   *
   * @example
   * const newUser = await authService.register(
   *   "Tech Company",
   *   "12.345.678/0001-99",
   *   "Industrial Technology",
   *   "John Doe",
   *   "john@example.com",
   *   "pass1234",
   *   "pass1234"
   * );
   */
  register: async (
    companyName: string,
    cnpj: string,
    sector: string,
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    phone?: string,
    city?: string,
    state?: string
  ): Promise<LoginResponse> => {
    const credentials: RegisterCredentials = {
      companyName,
      cnpj,
      sector,
      name,
      email,
      password,
      confirmPassword,
      phone,
      city,
      state,
    };

    const response: AxiosResponse<LoginResponse> = await api.post(
      "/auth/register",
      credentials
    );

    return response.data;
  },

  /**
   * @function getCurrentUser
   * @memberof authService
   * @description
   * Retrieves the currently logged-in user from storage.
   *
   * @returns {User | null} The user object or null if not logged in.
   *
   * @example
   * const user = authService.getCurrentUser();
   */
  getCurrentUser: (): User | null => {
    const userStr =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },

  /**
   * @function isAuthenticated
   * @memberof authService
   * @description
   * Checks if user is currently authenticated.
   *
   * @returns {boolean} True if user has a valid token.
   *
   * @example
   * if (authService.isAuthenticated()) {
   *   // User is logged in
   * }
   */
  isAuthenticated: (): boolean => {
    return TokenStorage.get() !== null;
  },
};

export default authService;
