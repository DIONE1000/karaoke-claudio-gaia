import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
});

export const getMusicas = () => api.get('/musicas/');
export const createMusica = (data) => api.post('/musicas/', data);
export const updateMusica = (id, data) => api.put(`/musicas/${id}/`, data);
export const deleteMusica = (id) => api.delete(`/musicas/${id}/`);

export default api;
