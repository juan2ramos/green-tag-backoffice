import { greenTagApi } from '@/api/green-tag-api';

const url = import.meta.env.VITE_API_URL;

export const getCompensation = async () => {
  const { data } = await greenTagApi.get(`compensation`);
  return data?.payload;
};

export const campaignsWithOutCompensation = async () => {
  const { data } = await greenTagApi.get(
    `compensation/campaignsWithOutCompensation`,
  );
  return data?.payload;
};
export const creativeDaysWithOutCompensation = async (campaignId: string) => {
  const { data } = await greenTagApi.get(
    `compensation/creativesWithOutCompensation/${campaignId}`,
  );
  return data?.payload;
};

export const offsetCompensation = async (body: {
  legacyBonusId: string;
  creativeGroupId: string;
}) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const resp = await fetch(`${url}compensation`, options);
    if (!resp.ok) throw new Error('Failed to fetch compensation.');

    const json = await resp.json();
    console.log('resp', json);
    return json?.payload;
  } catch (error) {
    console.error('Error fetching compensation', error);
    throw new Error('Error fetching compensation');
  }
};
