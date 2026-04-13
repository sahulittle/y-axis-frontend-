import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { readSession } from "./session";

const ProtectedRoute = ({
  allowedRoles = [],
  redirectTo = "/admin/login",
  unauthorizedTo = "/admin/dashboard",
  children,
}) => {
  const location = useLocation();
  const { token, user } = readSession();

  if (!token) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to={unauthorizedTo} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
