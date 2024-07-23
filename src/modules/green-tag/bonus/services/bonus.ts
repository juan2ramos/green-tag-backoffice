import { greenTagApi } from '@/api/green-tag-api';
import { CreateBonus } from '../interfaces/create-bonus.interface';

export const createBonus = async (bono: CreateBonus) => {
  const { data } = await greenTagApi.post('bonus', bono);
  return data?.payload;
};

export const getBonus = async () => {
  const { data } = await greenTagApi('bonus');
  return data?.payload;
};
