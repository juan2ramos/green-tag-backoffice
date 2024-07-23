const url = import.meta.env.VITE_API_URL;

export const getCreativeByGroup = async (id: string) => {
  try {
    const resp = await fetch(`${url}campaign/group-creative/${id}`);
    if (!resp.ok) throw new Error('Failed to fetch group-creative.');
    const json = await resp.json();
    return json?.payload;
  } catch (error: Error | unknown) {
    console.error('Error fetching group-creative', error);
    throw new Error((error as Error).message);
  }
};
