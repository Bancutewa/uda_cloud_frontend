import axios from "axios";



const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "",  // Development: http://localhost:8080, Production: "" (Nginx proxy)
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token') || null;
  config.headers.Authorization = token ? token : "";
  return config;
});


export default axiosInstance;
