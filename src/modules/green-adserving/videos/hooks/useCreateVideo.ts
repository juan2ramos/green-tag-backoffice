import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVideo } from '../services/videos';
import { useState } from 'react';
import { toast } from 'sonner';
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
      toast.success(`Notificación`, {
        position: 'top-right',
        description: `¡El video se ha creado con éxito!`,
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
      toast.error(`Error al crear video`, {
        position: 'top-right',
        description: `¡Ha ocurrido un error al crear el video! Por favor, intente nuevamente`,
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
