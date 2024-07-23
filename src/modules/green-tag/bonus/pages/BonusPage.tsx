import { useQuery } from '@tanstack/react-query';
import CreateProject from '../components/Create';
import { DataTable } from '../components/data-table/data-table';
import { columns } from '../components/data-table/columns';
import { getBonus } from '../services/bonus';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

export const BonusPage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: ['bonus'],
    queryFn: () => getBonus(),
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          className="bg-[#D8EAF7]  min-w-32 text-[#4D6D98] flex items-center justify-center gap-1"
          variant={'create'}
          onClick={() => navigate('/green-tag/projects')}
        >
          <PlusIcon className="w-3 h-3 text-[#4D6D98]" />
          <span className=" text-[12px]"> Crear proyecto</span>
        </Button>
      </div>
      <CreateProject />

      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Listado de bonos</h2>
          <hr />
          {data == null && isLoading && <strong>Cargando...</strong>}
          {error != null && <strong>Algo ha ido mal</strong>}
          {data == null && !isLoading && <strong>No hay datos</strong>}
          <div className="mt-8 w-full px-5 py-7 b bg-[#F9FBFC] rounded-md">
            {data != null && <DataTable columns={columns} data={data} />}
          </div>
        </div>
      </section>
    </div>
  );
};
