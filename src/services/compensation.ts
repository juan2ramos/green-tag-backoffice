const url = import.meta.env.VITE_API_URL;

export const getCompensation = async () => {
  try {
    const resp = await fetch(`${url}compensation`);
    if (!resp.ok) throw new Error('Failed to fetch compensation.');

    const json = await resp.json();
    console.log('resp', json);
    return json?.payload;
  } catch (error) {
    console.error('Error fetching compensation', error);
  }
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
