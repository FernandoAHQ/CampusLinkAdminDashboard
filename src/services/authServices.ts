import axiosInstance from "../utils/axiosInstance";


export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/authentication/login/admin', {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const renewToken = async () => {
  try {
    const response = await axiosInstance.get('/authentication/renew/admin');

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};