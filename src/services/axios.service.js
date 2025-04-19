import axios from "axios";

export const axiosReq = axios.create({
  // withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

axiosReq.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
