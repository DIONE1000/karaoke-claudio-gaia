import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Interceptor para adicionar o token nas requisições
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para lidar com erros 401 (token expirado)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const isLoginRequest = originalRequest.url.includes('/token/');

        if (error.response?.status === 401 && !originalRequest._retry && !isLoginRequest) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                try {
                    const response = await axios.post(`${API_URL}/token/refresh/`, {
                        refresh: refreshToken,
                    });
                    localStorage.setItem('access_token', response.data.access);
                    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login';
                }
            } else {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export const login = (email, password) => api.post('/token/', { email, password });
export const getMusicas = () => api.get('/musicas/');
export const createMusica = (data) => api.post('/musicas/', data);
export const updateMusica = (id, data) => api.put(`/musicas/${id}/`, data);
export const deleteMusica = (id) => api.delete(`/musicas/${id}/`);

// Admin actions
export const getUsers = () => api.get('/users/');
export const createUser = (data) => api.post('/users/', data);
export const deleteUser = (id) => api.delete(`/users/${id}/`);
export const toggleSuspension = (id) => api.post(`/users/${id}/toggle_suspension/`);
export const changePassword = (data) => api.post('/users/change_password/', data);

export default api;
