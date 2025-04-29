import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

export default {
  // Холсты
  getCanvases: () => api.get('/canvases/'),
  createCanvas: (name) => api.post('/canvases/', { name }),
  getCanvas: (id) => api.get(`/canvases/${id}/`),
  updateCanvas: (id, data) => api.patch(`/canvases/${id}/`, data),
  
  // Участники
  joinCanvas: (canvasId, nickname) => 
    api.post(`/canvases/${canvasId}/join/`, { nickname }),
  
  // Пиксели
  updatePixel: (canvasId, x, y, color) => 
    api.post(`/canvases/${canvasId}/pixels/`, { x, y, color })
};