import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = getUserFromStorage();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (token) {
    return children;
  }
  return null; // Or you can return a loader or some other fallback UI
};

export default AuthRoute;
