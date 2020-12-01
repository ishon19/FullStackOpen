import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (payload) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, payload, config);
  return response.data;
};

export default { getAll, createBlog, setToken };
