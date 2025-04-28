import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const api = {
  // Холсты
  getCanvases: () => axios.get(`${API_URL}/canvases/`),
  getCanvas: (id) => axios.get(`${API_URL}/canvases/${id}/`),
  createCanvas: (name) => axios.post(`${API_URL}/canvases/`, { name }),
  updateCanvas: (id, data) => axios.patch(`${API_URL}/canvases/${id}/`, data),
  
  // Участники
  joinCanvas: (canvasId, nickname) => 
    axios.post(`${API_URL}/canvases/${canvasId}/join/`, { nickname })
};