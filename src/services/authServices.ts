import axios from "axios";

const API_URL = "http://localhost:3000"; // Replace with your API URL

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/authentication/login/admin`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
