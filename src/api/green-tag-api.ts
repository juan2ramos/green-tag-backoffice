import axios from 'axios';
import { useAuthStore } from '../stores/auth.store';

/* const baseURL = import.meta.env.VITE_API_URL; */
const baseURL = 'http://localhost:3007/api/v1/';
const greenTagApi = axios.create({ baseURL });

greenTagApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});
export { greenTagApi };
