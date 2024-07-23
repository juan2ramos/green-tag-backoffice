import { useMutation, useQueryClient } from '@tanstack/react-query';
import generateUUID from '@/shared/helpers/generate-uuid';
import { createProject } from '../services/project';
import {
  ProjectInterface,
  ProjectCreateInterface,
} from '../interfaces/project';

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProject,
    onMutate: (project) => {
      console.log('Mutating - Optimistic update');

      const optimisticProject = {
        id: generateUUID(),
        ...project,
      };

      queryClient.setQueryData<ProjectCreateInterface[]>(
        ['projects'],
        (old) => {
          if (!old) return [optimisticProject];
          return [optimisticProject, ...old];
        },
      );

      return { optimisticProject };
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
      }, 2000);
    },
    onError: (error, variables, context) => {
      console.log('Error - Optimistic update');
      console.log({ error, variables, context });

      queryClient.setQueryData<ProjectInterface[]>(['projects'], (old) => {
        console.log('Old', old);
        if (!old) return [];

        return old.filter(
          (cacheAgency) => cacheAgency.id !== context?.optimisticProject.id,
        );
      });
    },
  });

  return mutation;
};
