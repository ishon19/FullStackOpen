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

export default { getAnecdotes, addAnecdote };
