import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CompensationStrategiesEntity } from '@/modules/green-tag/agency/interfaces/agency.interface';
import { Row } from '@tanstack/react-table';
import { useDialogConfirm } from '../../hooks/useDialogConfirm';

interface CheckboxCellProps {
  advertiserData: Row<CompensationStrategiesEntity>;
}

export const CheckboxCell = ({ advertiserData }: CheckboxCellProps) => {
  const {
    checked,
    dialogOpen,
    isLoading,
    handleCheckboxChange,
    handleConfirm,
    handleCancel,
  } = useDialogConfirm({
    name: advertiserData.original.name,
    externalId: advertiserData.original.id,
    active: advertiserData.getValue('active') as boolean,
    strategyId: advertiserData.original.strategyId,
  });
  return (
    <>
      <div className="text-center">
        <Checkbox checked={checked} onClick={handleCheckboxChange} />
      </div>
      <Dialog open={dialogOpen}>
        <DialogContent>
          <DialogHeader className="font-[700] text-[16px] text-center">
            <DialogTitle>
              ¿Estás seguro de que quieres cambiar el estado?⚠️
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {advertiserData.getValue('active')
              ? ` Se dejarán de recibir datos de las campañas publicitarias para el anunciante ${advertiserData.getValue(
                  'name',
                )}.`
              : `Se activará (Opt In) la opción de recibir datos de las campañas publicitarias para el anunciante ${advertiserData.getValue(
                  'name',
                )}`}
          </DialogDescription>
          <DialogFooter className="mt-4">
            <Button
              variant={'create'}
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading === true ? 'Cargando...' : 'Aceptar'}
            </Button>
            <Button onClick={handleCancel} variant="secondary">
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
