import { useQuery } from '@tanstack/react-query';
import CreateProject from '../components/project/Create';
import { getProject } from '../services/project';
import List from '../components/project/List';

const ProjectPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProject(),
  });
  return (
    <div className="flex flex-col gap-4">
      <CreateProject />
      {data == null && isLoading && <strong>Cargando...</strong>}
      {error != null && <strong>Algo ha ido mal</strong>}
      {data == null && !isLoading && <strong>No hay datos</strong>}
      {data != null && <List projects={data} />}
    </div>
  );
};

export default ProjectPage;
