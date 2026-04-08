import React from "react";
import { readSession } from "./session";

const PermissionGate = ({ roles = [], fallback = null, children }) => {
  if (!roles.length) {
    return children;
  }

  const { user } = readSession();
  if (!roles.includes(user?.role)) {
    return fallback;
  }

  return children;
};

export default PermissionGate;
