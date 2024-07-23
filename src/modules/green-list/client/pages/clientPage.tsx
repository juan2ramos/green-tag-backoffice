import { DataTable } from '../components/data-table/data-table';
import { columns } from '../components/data-table/columns';
import { useQuery } from '@tanstack/react-query';
import { getClients } from '../services/clients';
import { CreateClient } from '../components/Create';

export const ClientPage = () => {
  const { data } = useQuery({
    queryKey: ['clients'],
    queryFn: () => getClients(),
  });
  return (
    <div className="flex flex-col gap-4">
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Crear cliente</h2>
          <hr />
          <CreateClient />
        </div>
      </section>
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Listado de clientes</h2>
          <hr />
          <div className="mt-8 w-full px-5 py-7 b bg-[#F9FBFC] rounded-md">
            {data != null && <DataTable columns={columns} data={data} />}
          </div>
        </div>
      </section>
    </div>
  );
};
