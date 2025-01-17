import axiosInstance from "../utils/axiosInstance";

export const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get("/students/all");
    return response.data;
  } catch (error) {
    return error;
  }
};
