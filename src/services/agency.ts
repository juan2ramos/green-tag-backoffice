import { greenTagApi } from '../api/green-tag-api';
import { Agency } from '../components/agency/types';

export const getMetadata = async () => {
  const { data } = await greenTagApi.get('collection/metadata');
  console.log(data);

  //if (!resp.ok) throw new Error('Failed to fetch Metadata.');

  return data?.payload;
};
export const getAgency = async () => {
  try {
    const { data } = await greenTagApi.get(`agency`);
    return data?.payload;
  } catch (error) {
    console.error('Error fetching agency', error);
    throw new Error((error as Error).message);
  }
};
export const createAgency = async (agency: Agency) => {
  try {
    const { data } = await greenTagApi.post(`agency`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agency),
    });

    return data?.payload;
  } catch (error) {
    return { error: error };
  }
};
