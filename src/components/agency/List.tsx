import { PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Agency } from './types';
import { dateDisplay } from '../../helpers/date-display';

const List = ({ data }: { data: Agency[] }) => {
  const handleClick = () => {
    console.log('Icono clickeado!');
  };

  return (
    <>
      {data.map((agency) => (
        <div key={agency.id} className="bg-white p-8 rounded-xl ">
          <div className="flex items-center justify-between group">
            <h2>{agency.name}</h2>
            <div className="flex gap-2 opacity-20 group-hover:opacity-100 focus:opacity-100">
              <button
                onClick={handleClick}
                className="text-[#5A99D1] hover:text-[#4072a1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A99D1]"
              >
                <PencilSquareIcon className="h-5 w-5" />
              </button>
              <button
                onClick={handleClick}
                className="text-[#FF8181] hover:text-[#FF8181] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A99D1]"
              >
                <TrashIcon className="h-5 w-5 " />
              </button>
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-2 py-2">
            <p>
              Estado:{' '}
              <span
                className={`px-3 py-[2px] rounded-[4px] ${
                  agency.active
                    ? 'text-[#4A9A81] bg-[#E3F6ED]'
                    : 'bg-[#FEDEDE] text-[#FF8181]'
                }`}
              >
                {agency.active ? 'Activa' : 'Inactiva'}
              </span>
            </p>

            <p>Fecha de creación: {dateDisplay(agency.createdAt ?? '')}</p>
            <h3 className="mt-4">Plataformas de compensación</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {agency.compensationStrategies?.map((strategy) => (
                <li key={strategy.id} className="col-50 group">
                  <div className="flex items-center justify-between">
                    <h4>{strategy.name}</h4>
                    <div className="flex gap-2 opacity-20 group-hover:opacity-100 focus:opacity-100">
                      <button
                        onClick={handleClick}
                        className="text-[#5A99D1] hover:text-[#4072a1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A99D1]"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleClick}
                        className="text-[#FF8181] hover:text-[#FF8181] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A99D1]"
                      >
                        <TrashIcon className="h-5 w-5 " />
                      </button>
                    </div>
                  </div>
                  <hr />
                  <p>Descripción: {strategy.description}</p>
                  <p>
                    Fecha de creación: {dateDisplay(strategy.createdAt ?? '')}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default List;
