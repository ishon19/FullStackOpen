import axios from "axios";
const baseUrl = "/api/blogs";

const setToken = (newToken) => {
  return `bearer ${newToken}`;
};

const getToken = () => {
  const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;
  return token ? `bearer ${token}` : "";
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (payload) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const response = await axios.post(baseUrl, payload, config);
  return response.data;
};

const updateBlog = async (id) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const response = await axios.put(`${baseUrl}/${id}`, {}, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, createBlog, setToken, updateBlog, deleteBlog };
