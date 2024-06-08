import { DateTime } from 'luxon';
import ModalBonus from './modal-bonus';
import { useState } from 'react';
interface Props {
  projects: {
    id: string;
    name: string;
    logo: string;
    createdAt: string;
    legacyBonuses: {
      id: string;
      co2Total: number;
      co2Compensated: number;
      url: string;
    }[];
  }[];
}
const List = ({ projects }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [projectId, setProjectId] = useState('');
  const dateDisplay = (date: string) => {
    return DateTime.fromISO(date)
      .setLocale('es')
      .toFormat("dd 'de' LLLL 'de' yyyy");
  };
  return (
    <>
      {projects.map((data) => (
        <div key={data.id} className="bg-white p-8 rounded-xl ">
          <div className="flex items-center justify-between group">
            <h2>{data.name}</h2>
            <div className="flex gap-2 opacity-20 group-hover:opacity-100 focus:opacity-100">
              <button
                onClick={() => {
                  setModalIsOpen(true), setProjectId(data.id);
                }}
                className="text-[#5A99D1] hover:text-[#4072a1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A99D1]"
              >
                Agregar bono
              </button>
              <button
                onClick={() => console.log('Edit')}
                className="text-[#5A99D1] hover:text-[#4072a1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A99D1]"
              >
                Edit
              </button>
              <button
                onClick={() => console.log('Delete')}
                className="text-[#FF8181] hover:text-[#FF8181] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A99D1]"
              >
                Delete
              </button>
            </div>
          </div>
          <hr />
          <div className="flex gap-2 flex-col fl py-2">
            <div className="flex gap-2 py-2">
              <p>Logo: </p>
              <div className="w-[100px]">
                <img
                  src={`https://green-tag-tty.s3.amazonaws.com/${data.logo}`}
                  alt=""
                />
              </div>
            </div>

            <p> Fecha de creación: {dateDisplay(data.createdAt ?? '')}</p>
            <h3 className="mt-4">Bonos</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {data.legacyBonuses?.map((legacyBonus) => (
                <li key={legacyBonus.id} className="col-50 group">
                  <div className="flex items-center justify-between">
                    <h4>{legacyBonus.id}</h4>
                    <div className="flex gap-2 opacity-20 group-hover:opacity-100 focus:opacity-100">
                      <button
                        onClick={() => console.log('Edit')}
                        className="text-[#5A99D1] hover:text-[#4072a1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A99D1]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => console.log('Delete')}
                        className="text-[#FF8181] hover:text-[#FF8181] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A99D1]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="flex flex-col gap-2 mt-2">
                    <p>co2Total: {legacyBonus.co2Total} Kg</p>
                    <p>co2 Compensado: {legacyBonus.co2Compensated ?? 0}Kg</p>
                    <p>
                      Link del Bono: {''}
                      <a
                        className="text-[#5ad196] hover:text-[#5ba140] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A99D1]"
                        href={legacyBonus.url}
                        target="blank"
                      >
                        Ver PDF del bono
                      </a>
                    </p>
                    <p>
                      {' '}
                      Fecha de creación: {dateDisplay(data.createdAt ?? '')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <ModalBonus
        projectId={projectId}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
    </>
  );
};
export default List;
