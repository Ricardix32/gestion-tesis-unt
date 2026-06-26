import axios from 'axios';
import { obtenerAccessToken, obtenerRefreshToken, guardarTokens, eliminarTokens } from '../servicios/almacenamiento';

const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:4000';

const api = axios.create({ baseURL });

api.interceptors.request.use(async (config) => {
  const token = await obtenerAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await obtenerRefreshToken();
        const res = await axios.post(`${baseURL}/auth/refresh`, { token: refreshToken });
        await guardarTokens(res.data.access_token, res.data.refresh_token);
        originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
        return api(originalRequest);
      } catch (err) {
        await eliminarTokens();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
