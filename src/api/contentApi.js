import axiosInstance from "./axiosInstance";

export const createContent = async (data) => {
  try {
    const response = await axiosInstance.post("/admin/contents", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || {
      success: false,
      message: error.message || "Failed to create content",
    };
  }
};

export const getAllContents = async () => {
  try {
    const response = await axiosInstance.get("/admin/contents");
    return response.data;
  } catch (error) {
    throw error.response?.data || {
      success: false,
      message: error.message || "Failed to fetch contents",
    };
  }
};

export const getContentById = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/contents/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || {
      success: false,
      message: error.message || "Failed to fetch content",
    };
  }
};

export const updateContent = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/admin/contents/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || {
      success: false,
      message: error.message || "Failed to update content",
    };
  }
};

export const deleteContent = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/contents/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || {
      success: false,
      message: error.message || "Failed to delete content",
    };
  }
};