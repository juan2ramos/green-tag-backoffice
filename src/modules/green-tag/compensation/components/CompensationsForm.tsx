import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getBonus } from '../services/bonus';
import type {
  Bonus,
  CreativesWithOutCompensationResponse,
} from '../interfaces/types';

import { formatNumber } from '@/shared/helpers/format-number';
import { useCompensationMutation } from '../hooks/useCompensateMutation';
import { format } from 'date-fns';
import { RowSelectionState } from '@tanstack/react-table';
interface CompensationFormProps {
  selectedRows: CreativesWithOutCompensationResponse[];
  campaignId: string;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
}
export const CompensationForm = ({
  selectedRows,
  campaignId,
  setRowSelection,
}: CompensationFormProps) => {
  const [bono, setBono] = useState<Bonus>();
  const { data: bonus, isLoading } = useQuery({
    queryKey: ['bonus'],
    queryFn: () => getBonus(),
  });
  const { mutate, status } = useCompensationMutation({
    campaignId,
    onSuccess: () => {
      setRowSelection({});
    },
  });

  const handleChangeBono = (value: string) => {
    const bono = bonus?.find((b: { id: string }) => b.id === value);
    setBono(bono);
  };
  const handleCompensate = () => {
    if (!bono) return;
    mutate({
      legacyBonusId: bono.id,
      campaignId,
      selectedDays: selectedRows.map((r) =>
        format(new Date(r.day), 'yyyy-MM-dd'),
      ),
    });
  };

  const emissionsSelected = selectedRows.reduce(
    (acc, curr) => acc + +curr.emissionsLeftToCompensate,
    0,
  );
  const availableBonus = bono
    ? +bono.co2Total - +(bono.co2Compensated || 0)
    : 0;
  const canCompensate =
    !!bono &&
    selectedRows.length > 0 &&
    availableBonus >= emissionsSelected &&
    status !== 'pending';
  return (
    <div className="">
      <div className="pt-8 ">
        <b> Emisiones a compensar: </b>
        <span className="font-robotoFlex font-thin">
          {formatNumber(emissionsSelected)} KgCO2
        </span>
        {!!bono && selectedRows.length > 0 && (
          <div>
            <b> Disponibilidad del bono: </b>
            <span className="font-robotoFlex font-thin">
              {formatNumber(availableBonus - emissionsSelected)} KgCO2
              {availableBonus - emissionsSelected < 0 && (
                <span className="text-red-500">
                  {' '}
                  (Saldo insuficiente para los días seleccionados){' '}
                </span>
              )}
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-2 my-8">
        <Select onValueChange={handleChangeBono} disabled={!bonus || isLoading}>
          <SelectTrigger className="w-[440px] bg-[white]">
            <SelectValue placeholder="Seleccione un bono" />
          </SelectTrigger>
          <SelectContent>
            {bonus &&
              bonus.map((b: Bonus) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.project.name} -{' '}
                  <span className=" font-robotoFlex font-thin ">
                    {formatNumber(+b.co2Total - +(b.co2Compensated || 0))}
                  </span>
                  Kg
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Button
          disabled={!canCompensate}
          onClick={handleCompensate}
          className="w-[220px] "
          variant={'create'}
        >
          {status === 'pending' ? 'Compensando...' : 'Compensar seleccionados'}
        </Button>
      </div>
    </div>
  );
};
