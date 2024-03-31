import { Agency } from '../components/agency/types';

const url = 'http://localhost:3007/api/v1/';

export const getMetadata = async () => {
  const resp = await fetch(`${url}collection/metadata`);

  if (!resp.ok) throw new Error('Failed to fetch Metadata.');
  const json = await resp.json();
  return json?.payload;
};
export const getAgency = async () => {
  try {
    const resp = await fetch(`${url}agency`);
    if (!resp.ok) throw new Error('Failed to fetch agency.');
    const json = await resp.json();
    return json?.payload;
  } catch (error) {
    console.error('Error fetching agency', error);
    throw new Error((error as Error).message);
  }
};
export const createAgency = async (data: Agency) => {
  try {
    const resp = await fetch(`${url}agency`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await resp.json();
    if (!resp.ok) throw new Error(json);
    return json?.payload;
  } catch (error) {
    return { error: error };
  }
};
