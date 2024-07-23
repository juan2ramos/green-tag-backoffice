import { greenTagApi } from '@/api/green-tag-api';
import { type GetImpressions } from '../interfaces/impressions.interface';

export const createImpressions = async (impressions: GetImpressions) => {
  const { strategyName, strategyId, startDate, endDate } = impressions;
  const { data } = await greenTagApi.get(
    `collection/report/${strategyName}/${strategyId}`,
    {
      params: { startDate, endDate },
    },
  );
  return data?.payload;
};
