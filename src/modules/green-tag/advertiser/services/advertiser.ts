import { greenTagApi } from '@/api/green-tag-api';

export const getAdvertiser = async ({
  strategyName,
  strategyId,
}: {
  strategyName: string;
  strategyId: string;
}) => {
  const { data } = await greenTagApi.get(
    `collection/advertisers/${strategyName}/${strategyId}`,
  );
  return data?.payload;
};

export const generateOptIn = async ({
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
  const { data } = await greenTagApi.post(`advertiser`, {
    name,
    compensationStrategyId: strategyId,
    externalId,
    active,
  });

  return data?.payload;
};
