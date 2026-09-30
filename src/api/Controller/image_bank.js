import axiosInstance from "../axiosInstance";

export const getAllImageBank = async () => {
  try {
    const response = await axiosInstance.get("/image-bank");

    return response.data;
  } catch (error) {
    console.error("Get Image Bank API Error:", error);
    throw error;
  }
};

export const uploadImageBank = async (formData) => 
    {
  try {
    const response = await axiosInstance.post("/image-bank", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } 
  catch (error)
   {
    console.error("Bulk Upload Image Bank API Error:", error);
    throw error;
  }
};


export const downloadAllImages = async () => {
  try {
    const response = await axiosInstance.get("/image-bank/download-all", {
      responseType: "blob",
    });

    return response.data;
  } catch (error) {
    console.error("Download All Images API Error:", error);
    throw error;
  }
};

export const deleteImageBank = async (id) =>
     {
  try 
  {
    const response = await axiosInstance.delete(`/image-bank/${id}`);

    return response.data;
  } catch (error) {
    console.error("Delete Image Bank API Error:", error);
    throw error;
  }
};