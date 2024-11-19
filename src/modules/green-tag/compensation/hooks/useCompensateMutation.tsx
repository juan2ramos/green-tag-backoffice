import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCompensations } from '../services/impressions';
import { toast } from 'sonner';

interface Props {
  /*   strategySelected: CompensationStrategiesEntity | null;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>; */
  campaignId: string;
  onSuccess?: () => void;
}
export const useCompensationMutation = ({
  /*   strategySelected,
  setDate, */
  campaignId,
  onSuccess,
}: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createCompensations,
    onSuccess: () => {
      toast.success(`¡  !`, {
        position: 'top-right',
        description: `Las compensaciones se han realizado con éxito`,
        duration: 10000,
        action: {
          label: 'Cerrar',
          onClick: () => console.log('Undo'),
        },
      });
      queryClient.invalidateQueries({
        queryKey: ['creativeDaysWithOutCompensation', campaignId],
      });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error(`Error al obtener las impresiones`, {
        position: 'top-right',
        description: ` ya tiene impresiones para el rango de fechas seleccionado`,
        duration: 10000,
        action: {
          label: 'Cerrar',
          onClick: () => console.log('Undo'),
        },
      });
    },
  });

  return mutation;
};
