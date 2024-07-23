import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetDataFilter } from '../../advertiser/hooks/useGetDataFilter';
import { Agency } from '../interfaces/types';
import { CompensationStrategiesEntity } from '../../agency/interfaces/agency.interface';
import { DatePickerWithRange } from '@/components/ui/data-picker';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { DoubleArrowDownIcon } from '@radix-ui/react-icons';
import { useImpressionsMutation } from '../hooks/useImpressionsMutation';
import { format } from 'date-fns';

export const ImpressionsForm = () => {
  const {
    agencies,
    strategies,
    strategySelected,
    handleChangeAgency,
    handleStrategyChange,
  } = useGetDataFilter();
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const mutation = useImpressionsMutation({
    strategySelected,
    setDate,
  });

  const handleImpressions = () => {
    mutation.mutate({
      strategyName: strategySelected?.name || '',
      startDate: date?.from ? format(date.from, 'yyyy-MM-dd') : '',
      endDate: date?.to ? format(date.to, 'yyyy-MM-dd') : '',
      strategyId: strategySelected?.id || '',
    });
  };

  return (
    <>
      <div className="flex mt-8  w-full gap-3">
        <Select onValueChange={handleChangeAgency}>
          <SelectTrigger className="w-[220px] bg-[white]" disabled={!agencies}>
            <SelectValue
              placeholder={
                agencies ? 'Seleccione una agencia' : 'Cargando Agencias'
              }
            />
          </SelectTrigger>
          <SelectContent>
            {agencies?.map((agencie: Agency) => (
              <SelectItem key={agencie.id} value={agencie.id || ''}>
                {agencie.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={strategySelected?.id || ''}
          onValueChange={handleStrategyChange}
        >
          <SelectTrigger
            className="w-[220px] bg-[white]"
            disabled={strategies.length === 0}
          >
            <SelectValue placeholder="Seleccione una plataforma" />
          </SelectTrigger>
          <SelectContent>
            {strategies.map((strategy: CompensationStrategiesEntity) => (
              <SelectItem key={strategy.id} value={strategy.id || ''}>
                {strategy.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DatePickerWithRange date={date} setDate={setDate} />
        <Button
          onClick={handleImpressions}
          className="w-[220px] "
          variant={'create'}
          disabled={
            !date?.from || !date?.to || !strategySelected || mutation.isPending
          }
        >
          <DoubleArrowDownIcon className="mr-1 h-3 w-3" />
          {mutation.isPending ? 'Cargando...' : 'Obtener impresiones'}
        </Button>
      </div>
    </>
  );
};
