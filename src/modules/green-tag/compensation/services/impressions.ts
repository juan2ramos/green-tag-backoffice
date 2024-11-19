import { greenTagApi } from '@/api/green-tag-api';
import {
  CompensationRequest,
  type GetImpressions,
} from '../interfaces/impressions.interface';

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
export const createCompensations = async (
  compensation: CompensationRequest,
) => {
  const { legacyBonusId, campaignId, selectedDays } = compensation;
  const { data } = await greenTagApi.post(`compensation`, {
    legacyBonusId,
    campaignId,
    selectedDays,
  });

  return data?.payload;
};
