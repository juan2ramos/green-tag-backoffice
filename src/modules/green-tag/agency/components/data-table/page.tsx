/* import { PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid';
 */
import { DataTable } from './data-table';
import { columns } from './columns';
import { Agency } from '../../interfaces/agency.interface';

const List = ({ data }: { data: Agency[] }) => {
  return (
    <section className="wrapper">
      <div className=" w-full">
        <h2 className="pb-2">Listado agencia</h2>
        <hr />
      </div>
      <div className="w-full px-5 py-7 b bg-[#F9FBFC] rounded-md">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
};

export default List;
