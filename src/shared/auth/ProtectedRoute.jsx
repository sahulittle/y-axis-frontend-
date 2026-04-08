import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { readSession } from "./session";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const location = useLocation();
  const { token, user } = readSession();

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
