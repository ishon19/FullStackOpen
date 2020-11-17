import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addContact = (contactObj) => {
  const request = axios.post(baseUrl, contactObj);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const updateContact = (id, contactObj) => {
  const request = axios.put(`${baseUrl}/${id}`, contactObj);
  return request.then((response) => response.data);
};

export default { getAll, addContact, deleteContact, updateContact };
