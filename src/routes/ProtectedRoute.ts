import React, { ReactNode, useEffect } from "react";
import { useUser } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated, user } = useUser();
  const navigate = useNavigate();
  
  const userId = localStorage.getItem("user_id")

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
    else if (user && !user?.is_email_verified) {
      navigate("/verify-email");
    } 
    // else if(user?.roleId==1) {
    //   console.log("user", user)
    //   // navigate("/admin")
    // }
  }, [isAuthenticated, user, navigate, userId]);


  return isAuthenticated ? element : null;
};

export default ProtectedRoute;