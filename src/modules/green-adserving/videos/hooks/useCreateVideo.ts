import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVideo } from '../services/videos';
import { useState } from 'react';
export const useCreateVideoMutation = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: createVideo,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['videos'],
      });
      setIsLoading(false);
    },
  });

  return { mutation, isLoading };
};
