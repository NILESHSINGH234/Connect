import axios from "axios";
export const signupService = async (name, email, password) => {
    return await axios.post("http://localhost:4000/auth/signup", { name, email, password });
  };
  