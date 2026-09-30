import axiosInstance from "../axiosInstance";

export const getAllMaps = async () => {
  try {
    const response = await axiosInstance.get("/maps");

    return response.data;
  } catch (error) {
    console.error("Get All Maps API Error:", error);
    throw error;
  }
};

export const deleteMap = async (id) =>
   {
  try
   {
    const response = await axiosInstance.delete(`/maps/${id}`);

    return response.data;
  } 
  catch (error)
   {
    console.error("Delete Map API Error:", error);
    throw error;
  }
};

export const updateMap = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`/maps/${id}`, formData,
      
      {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Update Map API Error:", error);
    throw error;
  }
};

export const createMap = async (formData) => {
  try {
    const response = await axiosInstance.post("/maps", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Create Map API Error:", error);
    throw error;
  }
};



export const getMapById = async (id) => {
  try {
    const response = await axiosInstance.get(`/maps/${id}`);

    return response.data;
  } catch (error) {
    console.error("Get Map By ID API Error:", error);
    throw error;
  }
};