import axiosInstance from "../axiosInstance";

export const getAllGuidelines = async () => {
  try {
    const response = await axiosInstance.get("/guidelines");

    return response.data;
  } catch (error) {
    console.error("Get All Guidelines API Error:", error);
    throw error;
  }
};

export const deleteGuideline = async (id) => {
  try {
    const response = await axiosInstance.delete(`/guidelines/${id}`);

    return response.data;
  } catch (error) {
    console.error("Delete Guideline API Error:", error);
    throw error;
  }
};


export const createGuideline = async (formData) => {
  try {
    const response = await axiosInstance.post("/guidelines", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Create Guideline API Error:", error);
    throw error;
  }
};
