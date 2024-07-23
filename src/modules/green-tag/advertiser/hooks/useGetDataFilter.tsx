import { useQuery } from '@tanstack/react-query';
import { getAgency } from '../../agency/services/agency';
import {
  Agency,
  CompensationStrategiesEntity,
} from '../../agency/interfaces/agency.interface';
import { useState } from 'react';

export const useGetDataFilter = () => {
  const {
    data: agencies,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['agencies'],
    queryFn: () => getAgency(),
  });

  const [strategies, setStrategies] = useState([]);
  const [strategySelected, setStrategySelected] =
    useState<CompensationStrategiesEntity | null>(null);

  const handleChangeAgency = (agencyId: string) => {
    const agency = agencies?.find((agencie: Agency) => agencie.id === agencyId);
    const strategies = agency?.compensationStrategies || [];
    setStrategySelected(null);
    setStrategies(strategies);
  };

  const handleStrategyChange = (strategyId: string) => {
    const strategy = strategies?.find(
      (strategy: CompensationStrategiesEntity) => strategy.id === strategyId,
    );
    setStrategySelected(strategy || null);
  };

  return {
    agencies,
    strategies,
    strategySelected,
    setStrategySelected,
    handleChangeAgency,
    handleStrategyChange,
    isLoading,
    error,
  };
};
