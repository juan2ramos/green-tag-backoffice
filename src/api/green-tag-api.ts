import axios from 'axios';
import { useAuthStore } from '../stores/auth.store';

const nodeEnv = import.meta.env.NODE_ENV;
const apiProduction = import.meta.env.VITE_API_PRODUCTION_GREEN_TAG_URL;
const apiStaging = import.meta.env.VITE_API_STAGING_GREEN_TAG_URL;
const baseURL = nodeEnv === 'production' ? apiProduction : apiStaging;
const greenTagApi = axios.create({ baseURL });

greenTagApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export { greenTagApi };
