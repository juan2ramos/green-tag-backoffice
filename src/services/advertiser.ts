const url = import.meta.env.VITE_API_URL;

export const getAdvertiser = async ({
  strategyName,
  strategyId,
}: {
  strategyName: string;
  strategyId: string;
}) => {
  try {
    const resp = await fetch(
      `${url}collection/advertisers/${strategyName}/${strategyId}`,
    );
    if (!resp.ok) throw new Error('Failed to fetch advertiser.');
    const json = await resp.json();

    if (json?.payload.length > 0) {
      return json?.payload;
    }
    return [];
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch advertiser.');
  }
};

export const createOrUpdateAdvertiser = async ({
  name,
  strategyId,
  externalId,
  active,
}: {
  name: string;
  strategyId: string;
  externalId: string;
  active: boolean;
}) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        compensationStrategyId: strategyId,
        externalId,
        active,
      }),
    };

    const resp = await fetch(`${url}advertiser`, options);
    if (!resp.ok) throw new Error('Failed to update advertiser.');
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update advertiser.');
  }
};
