import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVideo } from '../services/videos';
import { useState } from 'react';
export const useDeleteVideoMutation = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: deleteVideo,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['videos'],
      });
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  return { mutation, isLoading };
};
