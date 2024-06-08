import { useQuery } from '@tanstack/react-query';
import Compensation from '../../components/green-tag/compensation/List';
import { getCompensation } from '../../services/compensation';

const CompensationPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['compensations'],
    queryFn: () => getCompensation(),
  });

  return (
    <div className="flex flex-col gap-6">
      {isLoading && <strong>Cargando...</strong>}
      {error != null && <strong>Algo ha ido mal</strong>}
      {data === null && !isLoading && <strong>No hay datos</strong>}
      {data != null && <Compensation compensations={data} />}
    </div>
  );
};

export default CompensationPage;
