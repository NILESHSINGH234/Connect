import axios from "axios";

export const loginService = async (email, password) => {
  return await axios.post("http://localhost:4000/auth/login", { email, password });
};

export const signupService = async (name, email, password) => {
  return await axios.post("http://localhost:4000/auth/signup", { name, email, password });
};
