import React, {createContext, useState, useContext, ReactNode, useEffect} from "react";
import {UserDetailModel} from "@/models/AuthModel";
import {logoutService} from "@/services/AuthService";
import {GetUserByIdService} from "@/services/UserService";

// Define context type
type UserContextType = {
  user: UserDetailModel | null;
  setUser: React.Dispatch<React.SetStateAction<UserDetailModel | null>>;
  logout: () => void;
  isAuthenticated: boolean;
  refetchUser: () => Promise<void>;
};

// Create UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook for UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

type UserProviderProps = {children: ReactNode};

export const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = useState<UserDetailModel | null>(null);

  // Load user from API if user_id exists in localStorage
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      GetUserByIdService(userId)
        .then(res => {
          setUser(res); // Store fetched user data
        })
        .catch(() => {
          // logout(); // If API request fails, clear session
        });
    }
  }, []);

  const isAuthenticated = !!user;

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("user_id"); // Remove user_id
    setUser(null); // Clear state
    logoutService().catch(() => {}); // Logout API (if needed)
  };

  const refetchUser = async () => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      const res = await GetUserByIdService(userId);
      setUser(res);
    }
  };

  return (
    <UserContext.Provider value={{user, setUser, isAuthenticated, logout, refetchUser}}>
      {children}
    </UserContext.Provider>
  );
};
