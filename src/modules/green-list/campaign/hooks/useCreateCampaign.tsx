import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCampaign } from '../services/campaigns';
import { useState } from 'react';
import { toast } from 'sonner';
import { UseFormReturn, FieldValues } from 'react-hook-form';
export const UseCreateCampaign = <T extends FieldValues>(
  form: UseFormReturn<T>,
) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: createCampaign,

    onMutate: () => {
      setIsLoading(true);
    },

    onSuccess: () => {
      toast.success(`Se creo la campaña con éxito!`, {
        position: 'top-right',
        description: ``,
        duration: 10000,
        action: {
          label: 'Cerrar',
          onClick: () => console.log('Undo'),
        },
      });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      }, 1000);
      setIsLoading(false);
      form.reset();
    },

    onError: () => {
      toast.error(`Hubo un error en la creación de la campaña`, {
        position: 'top-right',
        description: ``,
        duration: 10000,
        action: {
          label: 'Cerrar',
          onClick: () => console.log('Undo'),
        },
      });
      setIsLoading(false);
    },
  });
  return { mutation, isLoading };
};
