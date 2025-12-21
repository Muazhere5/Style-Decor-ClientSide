// src/hooks/useAxios.jsx
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. http://localhost:5000
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
