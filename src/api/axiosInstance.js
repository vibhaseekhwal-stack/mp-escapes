import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mp-escapes.onrender.com/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("mp_escapes_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || "";

    if (
      error.response?.status === 401 &&
      !requestUrl.includes("/admin/login") &&
      !requestUrl.includes("/admin/logout")
    ) {
      localStorage.removeItem("mp_escapes_auth");
      localStorage.removeItem("mp_escapes_token");
      localStorage.removeItem("mp_escapes_admin");
      localStorage.removeItem("mp_escapes_keep_signed_in");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;