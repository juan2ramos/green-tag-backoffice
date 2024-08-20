import { greenListApi } from '@/api/green-list-api';

export const getEfficiencyByCampaigns = async (campaignId: number) => {
  const { data } = await greenListApi(`campaigns/${campaignId}/efficiency`);
  return data?.payload;
};
export const getEfficiencyAllSites = async () => {
  const { data } = await greenListApi('campaigns/efficiency');
  return data?.payload;
};
