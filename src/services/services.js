import axios from "axios";

const url = "http://localhost:5000/api";

export const createPost = async (post) => {
  try {
    const res = await axios.post(`${url}/post`, post);
    return res?.data;
  } catch (e) {
    console.log("error", e);
  }
};

export const getPosts = async () => {
  try {
    const res = await axios.get(`${url}/posts`);
    return res?.data;
  } catch (e) {
    console.log("error", e);
  }
};

export const updatePost = async ({ id, post }) => {
  try {
    const res = await axios.patch(`${url}/posts/${id}`, post);
    return res.data;
  } catch (e) {
    console.log("error", e);
  }
};
