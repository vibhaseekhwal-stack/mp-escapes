import axiosInstance from "./axiosInstance";

export const adminLogin = async (credentials) => {
  const response = await axiosInstance.post("/admin/login", credentials);

  const data = response.data;

  if (data.success && data.token) {
    localStorage.setItem("mp_escapes_auth", "true");
    localStorage.setItem("mp_escapes_token", data.token);

    if (data.admin) {
      localStorage.setItem(
        "mp_escapes_admin",
        JSON.stringify(data.admin)
      );
    }
  }

  return data;
};

export const getAdminProfile = async () => {
  const response = await axiosInstance.get("/admin/profile");
  return response.data;
};

export const adminLogout = async () => {
  try {
    await axiosInstance.post("/admin/logout");
  } finally {
    localStorage.removeItem("mp_escapes_auth");
    localStorage.removeItem("mp_escapes_token");
    localStorage.removeItem("mp_escapes_admin");
    localStorage.removeItem("mp_escapes_keep_signed_in");

    window.location.href = "/login";
  }
};

export const getStoredAdmin = () => {
  const admin = localStorage.getItem("mp_escapes_admin");

  if (!admin) {
    return null;
  }

  try {
    return JSON.parse(admin);
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem("mp_escapes_token"));
};