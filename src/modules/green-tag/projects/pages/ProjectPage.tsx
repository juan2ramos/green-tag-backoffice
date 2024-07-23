import { useQuery } from '@tanstack/react-query';
import { columns } from '../components/data-table/columns';
import { DataTable } from '../components/data-table/data-table';
import { getProjects } from '../services/project';
import { CreateProject } from '../components/Create';

export const ProjectPage = () => {
  const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });
  return (
    <div className="flex flex-col gap-4">
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Crear un proyecto</h2>
          <hr />
          <CreateProject />
        </div>
      </section>
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Listado de proyectos</h2>
          <hr />
          <div className="mt-8 w-full px-5 py-7 b bg-[#F9FBFC] rounded-md">
            {data != null && <DataTable columns={columns} data={data} />}
          </div>
        </div>
      </section>
    </div>
  );
};
