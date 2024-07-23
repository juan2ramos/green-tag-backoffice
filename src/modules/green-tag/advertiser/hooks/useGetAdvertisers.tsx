import { useQuery } from '@tanstack/react-query';
import { getAdvertiser } from '../services/advertiser';
export const useGetAdvertisers = (strategyId: string, strategyName: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['advertiser', strategyName, strategyId],
    queryFn: () => getAdvertiser({ strategyId, strategyName }),
  });
  return { data, error, isLoading };
};
