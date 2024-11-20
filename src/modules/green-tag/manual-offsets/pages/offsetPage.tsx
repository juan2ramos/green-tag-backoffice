import { Button } from '@/components/ui/button';
import { CreateOffset } from '../components/create-offset';
import { PlusIcon } from '@heroicons/react/20/solid';

const OffsetPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          className="bg-[#D8EAF7]  min-w-32 text-[#4D6D98] flex items-center justify-center gap-1"
          variant={'create'}
        >
          <PlusIcon className="w-3 h-3 text-[#4D6D98]" />
          <span className=" text-[12px]"> Crear Campaña </span>
        </Button>
      </div>
      <section className="wrapper">
        <div className="w-full">
          <h2 className="pb-2">Realizar una compensación manual</h2>
          <hr />
          <CreateOffset />
        </div>
      </section>
    </div>
  );
};
export default OffsetPage;
