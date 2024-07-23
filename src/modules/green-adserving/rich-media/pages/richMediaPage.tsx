import { useQuery } from '@tanstack/react-query';
import { CreateRichMedia } from '../components/Create';
import { DataTable } from '../components/data-table/data-table';
import { columns } from '../components/data-table/columns';
import { getRichMedia } from '../services/rich-media';

export const RichMediaPage = () => {
  const { data } = useQuery({
    queryKey: ['richMedia'],
    queryFn: () => getRichMedia(),
  });
  return (
    <div className="flex flex-col gap-4">
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Crear Rich Media</h2>
          <hr />
          <CreateRichMedia />
        </div>
      </section>
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Listado de Rich Media</h2>
          <hr />
          <div className="mt-8 w-full px-5 py-7 b bg-[#F9FBFC] rounded-md">
            {data != null && <DataTable columns={columns} data={data} />}
          </div>
        </div>
      </section>
    </div>
  );
};
