import { useEffect, useState } from 'react';
import { getAgency } from '../../services/agency';
import {
  Agency,
  CompensationStrategiesEntity,
} from '../../components/green-tag/agency/types';
import { useFetch } from '../../shared/hooks/useFetch';
import AlertError from '@/components/commons/AlertError';
import AlertSuccess from '@/components/commons/AlertSuccess';
const urlApi = import.meta.env.VITE_API_URL;

const CampaignPageAnt = () => {
  const [agencies, setAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState('');
  const [selectedStrategy, setSelectedStrategy] = useState('');

  useEffect(() => {
    const fetchAgencies = async () => {
      const data = await getAgency();
      setAgencies(data);
    };
    fetchAgencies();
  }, []);

  const { data, setOptions, options, isLoading, hasError, reset } = useFetch();

  const handleStrategyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStrategy(e.target.value);
  };
  const handleChangeAgency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAgency(e.target.value);
    setSelectedStrategy('');
  };
  const strategies = selectedAgency
    ? (
        agencies.find(
          (agencie: Agency) => agencie.id === selectedAgency,
        ) as unknown as Agency
      )?.compensationStrategies
    : [];

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);
    const strategyId = dataForm.get('strategy');
    const strategyName = strategies?.find(
      (strategy: CompensationStrategiesEntity) => strategy.id === strategyId,
    )?.name;
    const startDate = dataForm.get('startDate');
    const endDate = dataForm.get('endDate');

    const url = `${urlApi}collection/report/${strategyName}/${strategyId}?startDate=${startDate}&endDate=${endDate}`;
    setOptions({ ...options, url });
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="bg-white p-8 rounded-xl">
        {data && (
          <AlertSuccess
            message="Se ha generado con éxito el reporte, en unos minutos podrá empezar a compensar."
            onClose={reset}
          />
        )}

        {hasError && (
          <AlertError
            message="Hubo un error al crear el reporte, revise todos lo campo e  intente de nuevo."
            onClose={reset}
          />
        )}
        <form className="" onSubmit={handleOnSubmit}>
          <h2>Generación de reporte manual</h2>
          <hr />
          <div className="flex flex-wrap ">
            <div className="flex flex-col gap-2 p-2  w-1/2 ">
              <label className="mt-2" htmlFor="agency">
                Seleccione una agencia
              </label>
              <select
                value={selectedAgency}
                onChange={handleChangeAgency}
                name="agency"
                id="agency"
              >
                <option value="">Selecciona una agencia</option>
                {agencies.map((agencie: Agency) => (
                  <option key={agencie.id} value={agencie.id}>
                    {agencie.name}
                  </option>
                ))}
              </select>
              <label className="mt-2" htmlFor="strategy">
                Seleccione la plataforma
              </label>
              <select
                value={selectedStrategy}
                onChange={handleStrategyChange}
                disabled={!selectedAgency}
                name="strategy"
              >
                <option value="">Selecciona una plataforma </option>
                {strategies?.map((strategy: CompensationStrategiesEntity) => (
                  <option key={strategy.id} value={strategy.id}>
                    {strategy.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2  p-2  w-1/2 ">
              <label className="mt-2" htmlFor="startDate">
                Seleccione la fecha inicial
              </label>
              <input
                name="startDate"
                type="date"
                id="startDate"
                placeholder="Selecciona la fecha inicial"
              />
              <label className="mt-2" htmlFor="endDate">
                Seleccione la fecha final
              </label>
              <input
                name="endDate"
                type="date"
                placeholder="Selecciona la fecha final"
              />
            </div>
            <div className="w-full text-center p-8">
              <button
                disabled={isLoading}
                type="submit"
                className={`text-white p-2 rounded-md w-[300px]  ${
                  isLoading ? 'bg-[#4a4a4a]' : 'bg-[#44C949]'
                }
            `}
              >
                Obtener datos
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CampaignPageAnt;
