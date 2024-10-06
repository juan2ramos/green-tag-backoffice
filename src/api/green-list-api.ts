import axios from 'axios';
import { useAuthStore } from '../stores/auth.store';

const nodeEnv = import.meta.env.NODE_ENV;
const apiProduction = import.meta.env.VITE_API_PRODUCTION_GREEN_LIST_URL;
const apiStaging = import.meta.env.VITE_API_STAGING_GREEN_LIST_URL;

console.log('import.meta.env', import.meta.env);
console.log('nodeEnv', nodeEnv);

const baseURL = nodeEnv === 'production' ? apiProduction : apiStaging;
console.log('baseURL', baseURL);
const greenListApi = axios.create({ baseURL });

greenListApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export { greenListApi };
