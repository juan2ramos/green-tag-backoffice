import { useMutation } from '@tanstack/react-query';
import { createImpressions } from '../services/impressions';
import { toast } from 'sonner';
import { CompensationStrategiesEntity } from '../../agency/interfaces/agency.interface';
import { DateRange } from 'react-day-picker';
interface Props {
  strategySelected: CompensationStrategiesEntity | null;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}
export const useImpressionsMutation = ({
  strategySelected,
  setDate,
}: Props) => {
  const mutation = useMutation({
    mutationFn: createImpressions,
    onSuccess: () => {
      toast.success(`¡Proceso ha iniciado con éxito!`, {
        position: 'top-right',
        description: `Espere unos minutos mientras se obtiene la información de ${strategySelected?.name}, para iniciar el proceso de compensación`,
        duration: 10000,
        action: {
          label: 'Cerrar',
          onClick: () => console.log('Undo'),
        },
      });

      setDate(undefined);
    },
    onError: () => {
      toast.error(`Error al obtener las impresiones`, {
        position: 'top-right',
        description: `${strategySelected?.name} ya tiene impresiones para el rango de fechas seleccionado`,
        duration: 10000,
        action: {
          label: 'Cerrar',
          onClick: () => console.log('Undo'),
        },
      });
      setDate(undefined);
    },
  });

  return mutation;
};
