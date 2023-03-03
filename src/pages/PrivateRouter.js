import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRouter = ({ children }) => {
  const logedIn = false;

  return logedIn ? children : <Navigate to="/" />;
};
