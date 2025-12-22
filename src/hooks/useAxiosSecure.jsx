// src/hooks/useAxiosSecure.jsx
import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // REQUEST INTERCEPTOR
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async config => {
        if (user) {
          const token = await user.getIdToken(); // 🔑 Firebase ID Token
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR
    const responseInterceptor = axiosSecure.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
