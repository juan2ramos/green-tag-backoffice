import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRichMedia } from '../services/rich-media';
import { useState } from 'react';
export const useDeleteReachMediaMutation = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: deleteRichMedia,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['richMedia'],
      });
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  return { mutation, isLoading };
};
