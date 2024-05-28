import axios from "axios";

export const getPostsService = async (token) => {
  return await axios.get("http://localhost:4000/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
