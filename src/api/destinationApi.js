import axiosInstance from "./axiosInstance";

export const createDestination = async (destinationData) => {
  try {
    const response = await axiosInstance.post(
      "/destinations",
      destinationData
    );

    console.log("CREATE DESTINATION RESPONSE:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "CREATE DESTINATION ERROR:",
      error?.response?.data || error
    );

    throw error;
  }
};

export const getAllDestinations = async () => {
  const response = await axiosInstance.get("/destinations");
  return response.data;
};

export const getDestinationSummary = async () => {
  const response = await axiosInstance.get("/destinations/summary");
  return response.data;
};

export const getDestinationNames = async () => {
  const response = await axiosInstance.get("/destinations/names");
  return response.data;
};

export const getDestinationById = async (id) => {
  const response = await axiosInstance.get(`/destinations/${id}`);
  return response.data;
};

export const updateDestination = async (id, destinationData) => {
  try {
    const response = await axiosInstance.put(
      `/destinations/${id}`,
      destinationData
    );

    console.log("UPDATE DESTINATION RESPONSE:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "UPDATE DESTINATION ERROR:",
      error?.response?.data || error
    );

    throw error;
  }
};

export const deleteDestination = async (id) => {
  const response = await axiosInstance.delete(
    `/destinations/${id}`
  );

  return response.data;
};