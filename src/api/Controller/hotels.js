import axiosInstance from "../axiosInstance";

export const getAllHotels = async () => {
  try {
    const response = await axiosInstance.get("/hotels");

    return response.data;
  } catch (error) {
    console.error("Get All Hotels API Error:", error);
    throw error;
  }
};


export const getHotelById = async (id) => {
  try {
    const response = await axiosInstance.get(`/hotels/${id}`);

    return response.data;
  } catch (error) {
    console.error("Get Hotel By ID API Error:", error);
    throw error;
  }
};


export const deleteHotel = async (id) => {
  try {
    const response = await axiosInstance.delete(`/hotels/${id}`);

    return response.data;
  } catch (error) {
    console.error("Delete Hotel API Error:", error);
    throw error;
  }
};

export const createHotel = async (formData) => {
  try {
    const response = await axiosInstance.post("/hotels", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Create Hotel API Error:", error);
    throw error;
  }
};


export const getAllHotelNames = async () => {
  try {
    const response = await axiosInstance.get("/hotels/names");

    return response.data;
  } catch (error) {
    console.error("Get All Hotel Names API Error:", error);
    throw error;
  }
};