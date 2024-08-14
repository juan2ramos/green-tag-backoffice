import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRichMedia } from '../services/rich-media';
import { useState } from 'react';
import { toast } from 'sonner';
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
      toast.success(`Notificación`, {
        position: 'top-right',
        description: `¡El rich media se ha creado con éxito!`,
        duration: 10000,
        action: {
          label: 'Cerrar',
          onClick: () => console.log('Undo'),
        },
      });
      setIsLoading(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Error al crear rich media`, {
        position: 'top-right',
        description: `¡Ha ocurrido un error al crear el rich media! Por favor, intente nuevamente`,
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
