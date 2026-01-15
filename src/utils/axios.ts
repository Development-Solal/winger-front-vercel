import axios from "axios"
import { BASE_URL } from "./api"
import { RefreshTokenService } from "@/services/AuthService";
import toast from "react-hot-toast";

let isRefreshing = false;
let failedQueue: (() => void)[] = [];

const instance = axios.create({
    //BASE url of backend
    baseURL: BASE_URL,
    withCredentials: true,
  //   headers: {
  //     "Content-Type": "application/json",
  // }
});

const refreshAccessToken = async () => {
    try {
      // Make a request to refresh the token (you can handle any needed API call here)
      console.log("aaaa")
      const response = await RefreshTokenService();
      return response.accessToken;
    } catch (error) {
      console.error("Error refreshing access token", error);
      throw error; 
    }
  };
  
// Add Axios Interceptor
instance.interceptors.response.use(
  response => response, // No error, just return response

  async (error) => {
    const originalRequest = error.config;

    // If 401 and error message says no refresh token, logout immediately
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.message === "No refresh token provided."
    ) {
      console.warn("Le token d'accès a expiré. Veuillez vous reconnecter");
      toast.error("Le token d'accès a expiré. Veuillez vous reconnecter")
      localStorage.removeItem("user_id");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Prevent infinite loop if the failing request is refresh-token itself
    if (originalRequest.url.includes("/refresh-token")) {
      console.warn("Le token d'accès a expiré. Veuillez vous reconnecter");
      toast.error("Le token d'accès a expiré. Veuillez vous reconnecter")
      localStorage.removeItem("user_id");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // For other 401 errors, try refresh token flow
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue other requests until token refresh completes
        return new Promise((resolve) => {
          failedQueue.push(() => {
            resolve(axios(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshAccessToken();
        failedQueue.forEach((callback) => callback());
        failedQueue = [];
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh the access token", refreshError);
        localStorage.removeItem("user_id");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

  
export default instance;