import React, { ReactNode, useEffect } from "react";
import { useUser } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: ReactNode;
}

const ProtectedRouteAdmin: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated, user } = useUser();
  const navigate = useNavigate();
  
  const userId = localStorage.getItem("user_id")

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
    else if (user && user?.roleId!=1) {
      navigate("/");
    } 

  }, [isAuthenticated, user, navigate, userId]);


  return isAuthenticated ? element : null;
};

export default ProtectedRouteAdmin;