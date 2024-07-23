import { useQuery } from '@tanstack/react-query';
import { getAgency } from '../../agency/services/agency';
import AlertError from '../../../../shared/components/AlertError';
import {
  Agency,
  CompensationStrategiesEntity,
} from '../../agency/interfaces/agency.interface';
import { useState } from 'react';
import CampaignsReport from '../List';

const ReportPage = () => {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setStrategySelected] = useState<CompensationStrategiesEntity | null>(
    null,
  );
  const [errorForm, setErrorForm] = useState(false);
  const [canGetReport, setCanGetReport] = useState(false);
  const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
  });

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

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataForm = new FormData(e.currentTarget);
    console.log(dataForm);
    const startDate = dataForm.get('startDate');
    const endDate = dataForm.get('endDate');
    if (!(startDate && endDate && strategyIdSelected))
      return setErrorForm(true);
    setDates({ startDate: startDate.toString(), endDate: endDate.toString() });
    setCanGetReport(true);
  };
  return (
    <div>
      <form className="bg-white p-8 rounded-xl " onSubmit={handleOnSubmit}>
        {errorForm && (
          <AlertError
            message="Hubo un error al obtener los datos, revisa los campos del formulario"
            onClose={() => setErrorForm(false)}
          />
        )}
        <h2>Reportes</h2>
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
              {agencies &&
                !error &&
                agencies?.map((agencie: Agency) => (
                  <option key={agencie.id} value={agencie.id}>
                    {agencie.name}
                  </option>
                ))}
            </select>
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
                {agencyIdSelected &&
                  strategies?.map((strategy: CompensationStrategiesEntity) => (
                    <option key={strategy.id} value={strategy.id}>
                      {strategy.name}
                    </option>
                  ))}
              </select>
            }
          </div>
          <div className="flex flex-col w-1/2">
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
        </div>
        <div className="w-full text-center my-8">
          <button
            disabled={isLoading}
            type="submit"
            className="text-white bg-[#44C949] hover:bg-[#3aac3e] focus:ring-4 focus:outline-none focus:ring-[#57b597] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-1/3 justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Obtener reporte
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </form>

      {isLoading && <strong>Cargando...</strong>}
      {error && <strong>Algo ha ido mal </strong>}
      {agencies == null && !isLoading && <strong>No hay datos</strong>}
      {canGetReport && (
        <CampaignsReport dates={dates} strategyId={strategyIdSelected} />
      )}
    </div>
  );
};

export default ReportPage;
