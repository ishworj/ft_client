import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Auth = ({ children }) => {
  const location = useLocation();
  const { user } = useUser();
  return user?._id ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default Auth;
