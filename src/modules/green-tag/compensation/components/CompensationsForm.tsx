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
import type { Bonus } from '../interfaces/types';
interface CompensationFormProps {
  selectedRows: unknown[];
}
export const CompensationForm = ({ selectedRows }: CompensationFormProps) => {
  const [bono, setBono] = useState('');
  const { data: bonus, isLoading } = useQuery({
    queryKey: ['bonus'],
    queryFn: () => getBonus(),
  });
  const handleChangeBono = (value: string) => {
    setBono(value);
  };
  const handleCompensate = () => {
    console.log(selectedRows);
  };

  return (
    <div className="flex gap-2 my-8">
      <Select onValueChange={handleChangeBono} disabled={!bonus || isLoading}>
        <SelectTrigger className="w-[220px] bg-[white]">
          <SelectValue placeholder="Seleccione un bono" />
        </SelectTrigger>
        <SelectContent>
          {bonus &&
            bonus.map((b: Bonus) => (
              <SelectItem key={b.id} value={b.id}>
                {Number(b.co2Total) - (Number(b.co2Compensated) || 0)}Kg -{' '}
                {b.project.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Button
        disabled={!bono || selectedRows.length === 0}
        onClick={handleCompensate}
        className="w-[220px] "
        variant={'create'}
      >
        Compensar seleccionados
      </Button>
    </div>
  );
};
