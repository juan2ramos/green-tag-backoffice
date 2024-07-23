import { greenListApi } from '@/api/green-list-api';
import { ClientInterface } from '../interfaces/client.interface';

export const getClients = async () => {
  const { data } = await greenListApi('campaigns/clients');
  return data?.payload;
};

export const createClient = async (data: ClientInterface) => {
  const { data: response } = await greenListApi.post('campaigns/clients', data);
  return response;
};
