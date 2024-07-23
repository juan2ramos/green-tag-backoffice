import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBonus } from '../services/bonus';
import generateUUID from '@/shared/helpers/generate-uuid';
import type { Bonus } from '../interfaces/create-bonus.interface';
import { Project } from '../../compensation/interfaces/types';

export const useCreateBonusMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBonus,
    onMutate: (bonus) => {
      console.log('Mutating - Optimistic update');
      const projects = queryClient.getQueryData<Project[]>(['projects']);
      const optimisticBonus = {
        id: generateUUID(),
        ...bonus,
        co2Compensated: 0,
        project: projects?.find((p) => p.id === bonus.projectId),
      };

      queryClient.setQueryData<Bonus[]>(['bonus'], (old) => {
        console.log('Old', old);

        if (!old) return [optimisticBonus];
        return [optimisticBonus, ...old];
      });

      return { optimisticBonus };
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['bonus'] });
      }, 2000);
    },
    onError: (error, variables, context) => {
      console.log('Error - Optimistic update');
      console.log({ error, variables, context });

      queryClient.setQueryData<Bonus[]>(['bonus'], (old) => {
        console.log('Old', old);
        if (!old) return [];

        return old.filter(
          (cacheAgency) => cacheAgency.id !== context?.optimisticBonus.id,
        );
      });
    },
  });

  return mutation;
};
