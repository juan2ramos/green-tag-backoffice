import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import { toast } from 'sonner';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { createClient } from '../services/clients';
export const UseCreateClient = <T extends FieldValues>(
  form: UseFormReturn<T>,
) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: createClient,

    onMutate: () => {
      setIsLoading(true);
    },

    onSuccess: () => {
      toast.success(`Se creo el cliente con éxito!`, {
        position: 'top-right',
        description: ``,
        duration: 10000,
        action: {
          label: 'Cerrar',
          onClick: () => console.log('Undo'),
        },
      });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['clients'] });
      }, 1000);
      setIsLoading(false);
      form.reset();
    },

    onError: () => {
      toast.error(`Hubo un error en la creación del cliente`, {
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
