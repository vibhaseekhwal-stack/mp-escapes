import axiosInstance from "./axiosInstance";

export const getAllVideos = async () => {
  const response = await axiosInstance.get("/videos");
  return response.data;
};

export const getVideosByCity = async (city) => {
  const response = await axiosInstance.get("/videos", {
    params: { city },
  });
  return response.data;
};

export const getVideoById = async (id) => {
  const response = await axiosInstance.get(`/videos/${id}`);
  return response.data;
};

export const uploadVideo = async (formData) => {
  const response = await axiosInstance.post("/videos", formData);
  return response.data;
};

export const updateVideo = async (id, data) => {
  const response = await axiosInstance.put(`/videos/${id}`, data);
  return response.data;
};

export const deleteVideo = async (id) => {
  const response = await axiosInstance.delete(`/videos/${id}`);
  return response.data;
};