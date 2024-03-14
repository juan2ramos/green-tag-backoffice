/* import { useQuery } from '@tanstack/react-query';
import Advertiser from '../components/advertiser/List';
import { getAdvertiser } from '../services/advertiser'; */

import { useQuery } from '@tanstack/react-query';
import { getAgency } from '../services/agency';
import {
  Agency,
  CompensationStrategiesEntity,
} from '../components/agency/types';
import { useState } from 'react';
import Advertiser from '../components/advertiser/List';

const AdvertiserPage = () => {
  const {
    data: agencies,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['agencies'],
    queryFn: () => getAgency(),
  });
  const [agencyIdSelected, setAgencyIdSelected] = useState('');
  const [strategyIdSelected, setStrategyIdSelected] = useState('');
  const [strategies, setStrategies] = useState([]);
  const [strategySelected, setStrategySelected] =
    useState<CompensationStrategiesEntity | null>(null);

  const handleChangeAgency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const agencyId = e.target.value;
    setAgencyIdSelected(agencyId);
    const agency = agencies?.find((agencie: Agency) => agencie.id === agencyId);
    const strategies = agency?.compensationStrategies;
    setStrategies(strategies);
  };
  const handleStrategyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const strategyId = e.target.value;
    setStrategyIdSelected(strategyId);
    const strategy = strategies?.find(
      (strategy: CompensationStrategiesEntity) => strategy.id === strategyId,
    );
    setStrategySelected(strategy || null);
  };
  return (
    <div className="bg-white p-8 rounded-xl ">
      <h2>Administración de anunciantes</h2>
      <hr />
      <div className="flex gap-4 p-2 ">
        <div className="flex flex-col w-1/2">
          <label className="mt-2" htmlFor="agency">
            Seleccione una agencia
          </label>
          <select
            value={agencyIdSelected}
            onChange={handleChangeAgency}
            name="agency"
            id="agency"
          >
            <option value="">Selecciona una agencia</option>
            {agencies?.map((agencie: Agency) => (
              <option key={agencie.id} value={agencie.id}>
                {agencie.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-1/2">
          <label className="mt-2" htmlFor="strategy">
            Seleccione la plataforma
          </label>
          {
            <select
              value={strategyIdSelected}
              onChange={handleStrategyChange}
              disabled={!agencyIdSelected}
              name="strategy"
            >
              <option value="">Selecciona una plataforma </option>
              {strategies?.map((strategy: CompensationStrategiesEntity) => (
                <option key={strategy.id} value={strategy.id}>
                  {strategy.name}
                </option>
              ))}
            </select>
          }
        </div>
      </div>
      {isLoading && <strong>Cargando...</strong>}
      {error != null && <strong>Algo ha ido mal</strong>}
      {agencies == null && !isLoading && <strong>No hay datos</strong>}
      {strategySelected != null && (
        <Advertiser
          strategyName={strategySelected.name ?? ''}
          strategyId={strategySelected.id ?? ''}
        />
      )}
    </div>
  );
};

export default AdvertiserPage;
