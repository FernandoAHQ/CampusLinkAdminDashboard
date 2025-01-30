import axiosInstance from "../utils/axiosInstance";
import { CreateArticleType } from "../utils/types";

export const getAllSArticles = async () => {
  try {
    const response = await axiosInstance.get("/articles/all");
    return response.data;
  } catch (error) {
    return error;
  }
};