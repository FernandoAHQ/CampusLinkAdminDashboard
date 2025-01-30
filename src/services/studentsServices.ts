import axiosInstance from "../utils/axiosInstance";
import { CreateStudentType } from "../utils/types";

export const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get("/students/all");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postNewStudent = async (newStudentData: CreateStudentType) => {
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

export const postUpdateStudent = async (
  id: number,
  newStudentData: CreateStudentType,
  optionals: { passwordChange: boolean; pictureChange: boolean }
) => {
  let postData: {
    id: number;
    name: string;
    password?: string;
    email: string;
    section?: number;
    profile_picture?: string;
    active: boolean;
  };

  console.log(newStudentData.name, newStudentData.major);

  postData = {
    id,
    name: newStudentData.name,
    email: newStudentData.email,
    active: Number(newStudentData.active) == 1 ? true : false,
  };

  if (!isNaN(Number(newStudentData.major))) {
    postData = {
      ...postData,
      section: Number(newStudentData.major),
    };
  }

  if (optionals.passwordChange) {
    postData = {
      ...postData,
      password: newStudentData.password,
    };
  }
  if (optionals.pictureChange) {
    postData = {
      ...postData,
      profile_picture: `https://avatar.iran.liara.run/public/${newStudentData.profile_picture}`,
    };
  }

  console.log("DATA:");

  console.log(postData);

  try {
    const response = await axiosInstance.post("/students/edit", postData);
    return response.data;
  } catch (error) {
    return error;
  }
};
