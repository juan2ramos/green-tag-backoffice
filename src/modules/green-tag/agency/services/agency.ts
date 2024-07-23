import { greenTagApi } from '@/api/green-tag-api';
import { type Agency } from '../interfaces/agency.interface';

export const getMetadata = async () => {
  const { data } = await greenTagApi.get('collection/metadata');
  return data?.payload;
};

export const getAgency = async () => {
  const { data } = await greenTagApi.get(`agency`);
  return data?.payload;
};

export const createAgency = async (agency: Agency) => {
  const { data } = await greenTagApi.post(`agency`, agency);
  return data?.payload;
};
