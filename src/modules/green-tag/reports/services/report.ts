import { greenTagApi } from '@/api/green-tag-api';

export const getCompensations = async () => {
  const { data } = await greenTagApi('compensation/with-compensation');
  return data?.payload;
};
