import axios from "axios";

const API_BASE_URL = "https://api.cdshoppinghub.com";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users`, {
      headers: getAuthHeaders(),
      timeout: 15000,
    });

    return response.data;
  } catch (error) {
    console.error("Get all users error:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    if (!id) {
      throw new Error("User ID is required");
    }

    const response = await axios.get(`${API_BASE_URL}/api/users/${id}`, {
      headers: getAuthHeaders(),
      timeout: 15000,
    });

    return response.data;
  } catch (error) {
    console.error("Get user by ID error:", error);
    throw error;
  }
};