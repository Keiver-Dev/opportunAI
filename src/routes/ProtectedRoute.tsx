import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps): ReactNode {
  console.log("🔒 ========== PROTECTED ROUTE EXECUTING ==========");
  console.log("🔒 Timestamp:", new Date().toISOString());
  console.log("🔒 Current path:", window.location.pathname);
  
  const tokenLocal = localStorage.getItem("token");
  const tokenSession = sessionStorage.getItem("token");
  const token = tokenLocal || tokenSession;
  
  console.log("🔒 localStorage token:", tokenLocal ? "✅ Found" : "❌ Not found");
  console.log("🔒 sessionStorage token:", tokenSession ? "✅ Found" : "❌ Not found");
  console.log("🔒 Final token:", token ? "✅ FOUND" : "❌ NOT FOUND");
  
  if (!token) {
    console.log("🔒 ❌ NO TOKEN - Redirecting to /login");
    console.log("🔒 =============================================");
    return <Navigate to="/login" replace />;
  }
  
  console.log("🔒 ✅ TOKEN FOUND - Rendering protected content");
  console.log("🔒 =============================================");
  return children;
}