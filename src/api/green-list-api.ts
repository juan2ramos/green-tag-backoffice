import axios from 'axios';
import { useAuthStore } from '../stores/auth.store';

const baseURL = import.meta.env.VITE_API_GREEN_LIST_URL;
console.log('baseURL', baseURL);

const greenListApi = axios.create({ baseURL });

greenListApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export { greenListApi };
