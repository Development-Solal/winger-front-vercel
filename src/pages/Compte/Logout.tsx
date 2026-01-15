import { useUser } from "@/context/AuthContext";
import { useFormContext } from "@/context/FormContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useUser();
  const { clearFormData } = useFormContext();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        await clearFormData();
        navigate("/login");
      } catch (error) {
        console.error("Error during logout:", error);
        // Still navigate even if there's an error
        navigate("/login");
      }
    };

    handleLogout();
  }, [logout, navigate, clearFormData]);

  return <div>Logging out...</div>;
};

export default Logout;