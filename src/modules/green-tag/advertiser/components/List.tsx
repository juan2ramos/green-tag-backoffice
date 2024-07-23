import { CompensationStrategiesEntity } from '../../agency/interfaces/agency.interface';
import { DataTable } from './data-table/data-table';
import { columns } from './data-table/columns';
import { useGetAdvertisers } from '../hooks/useGetAdvertisers';
interface Props {
  strategy: CompensationStrategiesEntity;
}

export const AdvertisersList = ({ strategy }: Props) => {
  const { id: strategyId, name: strategyName } = strategy;
  const { data, isLoading, error } = useGetAdvertisers(
    strategyId,
    strategyName,
  );

  return (
    <>
      {isLoading && (
        <div className=" mt-4 text-[#ffba3b]">
          Obteniendo los anunciantes de la plataforma {strategyName} esto puede
          tomar algunos minutos ...
        </div>
      )}
      {error && <div>Error: {error.message}</div>}

      {data && (
        <div className="w-full px-5 py-7 b bg-[#F9FBFC] rounded-md mt-8">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </>
  );
};
