import { useMutation } from '@tanstack/react-query';
import { generateOptIn } from '../services/advertiser';
interface OptIn {
  name: string;
  strategyId: string;
  externalId: string;
  active: boolean;
}
export const useOptInMutation = () => {
  const mutation = useMutation({
    mutationFn: (advertiserData: OptIn) => generateOptIn(advertiserData),
  });

  return mutation;
};
