const url = import.meta.env.VITE_API_URL;
export const getBonus = async () => {
  try {
    const resp = await fetch(`${url}bonus`);
    if (!resp.ok) throw new Error('Failed to fetch bonus.');
    const json = await resp.json();
    return json?.payload;
  } catch (error) {
    console.error('Error fetching bonus', error);
    return error;
  }
};
export interface Bonus {
  url: string;
  urlBlockchain: string;
  co2Total: number;
  projectId: string;
}

export const createBonus = async (body: Bonus): Promise<Bonus> => {
  console.log('Creating bonus', body);
  const data = {
    ...body,
    co2Total: +body.co2Total,
  };
  console.log('Creating bonus', data);

  try {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const resp = await fetch(`${url}bonus`, options);
    if (!resp.ok) throw new Error('Failed to creating bonus.');
    const json = await resp.json();
    return json?.payload;
  } catch (error) {
    console.error('Error creating bonus', error);
    throw new Error('Error creating bonus ' + (error as Error).message);
  }
};
