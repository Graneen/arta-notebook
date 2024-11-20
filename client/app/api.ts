import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getAllNotes = async () => {
  const response = await axios.get(`${API_URL}/notes`);
  return response.data;
};

export const createNote = async (text: string) => {
  const response = await axios.post(`${API_URL}/notes/add`, { text });
  return response.data;
};

export const updateNote = async (id: number, text: string) => {
  const response = await axios.put(`${API_URL}/notes/${id}`, { id, text });
  return response.data;
};

export const deleteNote = async (id: number) => {
  const response = await axios.delete(`${API_URL}/notes/delete/${id}`);
  return response.data;
};
