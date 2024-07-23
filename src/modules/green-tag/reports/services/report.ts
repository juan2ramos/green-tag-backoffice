const url = import.meta.env.VITE_API_URL;

export const getReport = async (dates: IDates, strategyId: string) => {
  const { startDate, endDate } = dates;
  try {
    const resp = await fetch(
      `${url}campaign/report/${strategyId}?startDate=${startDate}&endDate=${endDate}`,
    );
    if (!resp.ok) throw new Error('Failed to fetch group-creative.');
    const json = await resp.json();
    return json?.payload;
  } catch (error: Error | unknown) {
    console.error('Error fetching group-creative', error);
    throw new Error((error as Error).message);
  }
};

interface IDates {
  startDate: string;
  endDate: string;
}
