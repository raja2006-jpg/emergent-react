import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Protects admin routes
 * If no token → redirect to /admin/login
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("admin_token");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Logged in
  return children;
};

export default ProtectedRoute;
