import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addAnecdote = async (anecdote) => {
  const toSave = { content: anecdote, votes: 0 };
  const response = await axios.post(baseUrl, toSave);
  return response.data;
};

const upvote = async (id) => {
  const getBlogById = await axios.get(`${baseUrl}/${id}`);
  const updatedBlog = { ...getBlogById.data, votes: getBlogById.data.votes + 1 };
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return response.data;
};

export default { getAnecdotes, addAnecdote, upvote };
