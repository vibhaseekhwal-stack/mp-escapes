import axiosInstance from "../axiosInstance";

export const getDownloads = async () => {
  try {
    const response = await axiosInstance.get("/downloads");

    return response.data;
  } catch (error) {
    console.error("Get Downloads API Error:", error);
    throw error;
  }
};


export const uploadDownloads = async (formData) => {
  try {
    const response = await axiosInstance.post("/downloads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload Downloads API Error:", error);
    throw error;
  }
};


export const deleteDownloadCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/downloads/${id}`);

    return response.data;
  } catch (error) {
    console.error("Delete Download Category API Error:", error);
    throw error;
  }
};