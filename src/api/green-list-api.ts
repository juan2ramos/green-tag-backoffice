import axios from 'axios';
import { useAuthStore } from '../stores/auth.store';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.VITE_API_PRODUCTION_GREEN_LIST_URL
    : process.env.VITE_API_STAGING_GREEN_LIST_URL;

console.log('baseURL', baseURL);
console.log('process.env', JSON.stringify(process.env, null, 2));
const greenListApi = axios.create({ baseURL });

greenListApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export { greenListApi };
