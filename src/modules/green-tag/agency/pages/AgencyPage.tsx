import { useQuery } from '@tanstack/react-query';
import { getAgency } from '../services/agency';
import List from '../components/data-table/page';
import CreateAgency from '../components/create';

const AgencyPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['agencies'],
    queryFn: () => getAgency(),
  });

  return (
    <div className="flex flex-col gap-6">
      <CreateAgency />
      {isLoading && <strong>Cargando...</strong>}
      {error != null && <strong>Algo ha ido mal</strong>}
      {data == null && !isLoading && <strong>No hay datos</strong>}
      {data != null && <List data={data} />}
    </div>
  );
};

export default AgencyPage;
