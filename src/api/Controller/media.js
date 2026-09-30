import axiosInstance from "../axiosInstance";

export const getAllMedia = async () => {
  try {
    const response = await axiosInstance.get("/media");
    return response.data;
  } catch (error) {
    console.error("Get All Media API Error:", error);
    throw error;
  }
};