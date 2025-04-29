import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Поменяй на адрес своего сервера

const api = axios.create({
  baseURL: API_URL,
});

export const getCanvases = async () => {
  const response = await api.get('/canvases/');
  return response.data;
};

export const createCanvas = async (canvasData) => {
  const response = await api.post('/canvases/', canvasData);
  return response.data;
};

export const joinCanvas = async (canvasId, nickname) => {
  const response = await api.post(`/canvases/${canvasId}/join/`, { nickname });
  return response.data;
};

export const leaveCanvas = async (canvasId, nickname) => {
  try {
    const response = await api.post(`/canvases/${canvasId}/leave/`, { nickname });
    return response.data;
  } catch (error) {
    console.error("Ошибка при выходе из холста:", error);
    throw error;
  }
};

export const getParticipants = async (canvasId) => {
  const response = await api.get(`/canvases/${canvasId}/participants/`);
  return response.data;
};

export const getPixels = async (canvasId) => {
  const response = await api.get(`/canvases/${canvasId}/pixels/`);
  return response.data;
};

export const updatePixels = async (canvasId, pixels) => {
  const response = await api.post(`/canvases/${canvasId}/update_pixels/`, { pixels });
  return response.data;
};
