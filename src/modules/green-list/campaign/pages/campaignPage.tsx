import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { CreateCampaign } from '../components/Create';
import { DataTable } from '../components/data-table/data-table';
import { columns } from '../components/data-table/columns';
import { useQuery } from '@tanstack/react-query';
import { getCampaigns } from '../services/campaigns';

export const CampaignPage = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => getCampaigns(),
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          className="bg-[#D8EAF7]  min-w-32 text-[#4D6D98] flex items-center justify-center gap-1"
          variant={'create'}
          onClick={() => navigate('/green-list/clients')}
        >
          <PlusIcon className="w-3 h-3 text-[#4D6D98]" />
          <span className=" text-[12px]">Crear cliente</span>
        </Button>
      </div>
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Crear campaña</h2>
          <hr />
          <CreateCampaign />
        </div>
      </section>
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Listado de campañas</h2>
          <hr />
          <div className="mt-8 w-full px-5 py-7 b bg-[#F9FBFC] rounded-md">
            {data != null && <DataTable columns={columns} data={data} />}
          </div>
        </div>
      </section>
    </div>
  );
};
