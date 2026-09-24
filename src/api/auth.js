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

export const adminRegister = async (registerData) => {
  const formData = new FormData();

  formData.append("name", registerData.name);
  formData.append("email", registerData.email);
  formData.append("password", registerData.password);

  if (registerData.avatar) {
    formData.append("avatar", registerData.avatar);
  }

  const response = await axiosInstance.post(
    "/admin/register",
    formData
  );

  return response.data;
};

export const getAdminProfile = async () => {
  const response = await axiosInstance.get("/admin/profile");
  return response.data;
};

export const adminLogout = async () => {
  try {
    const response = await axiosInstance.post("/admin/logout");
    return response.data;
  } finally {
    localStorage.removeItem("mp_escapes_auth");
    localStorage.removeItem("mp_escapes_token");
    localStorage.removeItem("mp_escapes_admin");
    localStorage.removeItem("mp_escapes_keep_signed_in");
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