import { greenListApi } from '@/api/green-list-api';
import {
  CampaignInterface,
  CreateCampaignInterface,
} from '../interfaces/campaign.interface';

export const getCampaigns = async () => {
  const { data } = await greenListApi('campaigns');
  return data?.payload;
};

export const getCampaign = async (id: string): Promise<CampaignInterface> => {
  const { data } = await greenListApi.get(`campaigns/${id}`);
  return data?.payload;
};

export const createCampaign = async (campaign: CreateCampaignInterface) => {
  const clientId = campaign.clientId;
  const { data } = await greenListApi.post('campaigns', {
    ...campaign,
    clientId: +clientId,
  });
  return data?.payload;
};
