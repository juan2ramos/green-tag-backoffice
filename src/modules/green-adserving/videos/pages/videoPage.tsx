import { useQuery } from '@tanstack/react-query';
import { CreateVideo } from '../components/Create';
import { DataTable } from '../components/data-table/data-table';
import { columns } from '../components/data-table/columns';
import { getVideos } from '../services/videos';

export const VideoPage = () => {
  const { data } = useQuery({
    queryKey: ['videos'],
    queryFn: () => getVideos(),
  });
  return (
    <div className="flex flex-col gap-4">
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Cargar video</h2>
          <hr />
          <CreateVideo />
        </div>
      </section>
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Listado de videos</h2>
          <hr />
          <div className="mt-8 w-full px-5 py-7 b bg-[#F9FBFC] rounded-md">
            {data != null && <DataTable columns={columns} data={data} />}
          </div>
        </div>
      </section>
    </div>
  );
};
