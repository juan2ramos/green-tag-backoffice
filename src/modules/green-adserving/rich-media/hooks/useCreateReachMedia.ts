import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRichMedia } from '../services/rich-media';
import { useState } from 'react';
export const useCreateRichMediaMutation = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: createRichMedia,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['richMedia'],
      });
      setIsLoading(false);
    },
  });

  return { mutation, isLoading };
};
