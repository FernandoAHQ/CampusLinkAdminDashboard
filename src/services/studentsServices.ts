import axiosInstance from "../utils/axiosInstance";
import { createStudentType } from "../utils/types";

export const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get("/students/all");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postNewStudent = async (newStudentData: createStudentType) => {
  const postData = {
    name: newStudentData.name,
    password: newStudentData.password,
    email: newStudentData.email,
    section: Number(newStudentData.major),
    profile_picture: `https://avatar.iran.liara.run/public/${newStudentData.profile_picture}`,
    active: newStudentData.active,
  };

  console.log("DATA:");

  console.log(postData);

  try {
    const response = await axiosInstance.post("/students/create", postData);
    return response.data;
  } catch (error) {
    return error;
  }
};
