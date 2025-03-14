import axios from "./axiosInstance";

export const registerUser = async (userData) => {
  const response = await axios.post("/users/signup", userData);
  return response.data;
};
