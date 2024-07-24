import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAgency } from '../services/agency';
import { type Agency } from '../interfaces/agency.interface';
import generateUUID from '@/shared/helpers/generate-uuid';

export const useAgencyMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAgency,

    onMutate: (agency) => {
      console.log('Mutando - Optimistic update');

      const optimisticAgency = { id: generateUUID(), ...agency };

      queryClient.setQueryData<Agency[]>(['agency'], (old) => {
        if (!old) return [optimisticAgency];
        return [...old, optimisticAgency];
      });

      return { optimisticAgency };
    },

    onSuccess: (agency, variables, context) => {
      console.log({ agency, variables, context });
      queryClient.invalidateQueries({ queryKey: ['agencies'] });
      queryClient.setQueryData<Agency[]>(['agency'], (old) => {
        if (!old) return [agency];
        return old.map((cacheAgency) =>
          cacheAgency.id === context?.optimisticAgency.id
            ? agency
            : cacheAgency,
        );
      });
    },

    onError: (error, variables, context) => {
      console.log({ error, variables, context });

      queryClient.removeQueries({ queryKey: ['agencies'] });
      queryClient.setQueryData<Agency[]>(['agency'], (old) => {
        if (!old) return [];
        return old.filter(
          (cacheAgency) => cacheAgency.id !== context?.optimisticAgency.id,
        );
      });
    },
  });

  return mutation;
};
