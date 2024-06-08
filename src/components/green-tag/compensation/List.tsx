import { DateTime } from 'luxon';
import { GlobeAmericasIcon, PhotoIcon } from '@heroicons/react/20/solid';
import ModalCompensation from './modal-compensation';

import { useEffect, useState } from 'react';
import { Bonus, Campaign, CreativeGroup } from './types';
import { getBonus } from '@/services/bonus';
import ModalDetails from './modal-details';

const Compensation = ({ compensations }: { compensations: Campaign[] }) => {
  const [modalDetails, setModalDetails] = useState({
    isOpen: false,
    data: {} as Campaign,
  });
  const [creativeGroupSelected, setCreativeGroupSelected] = useState(
    {} as CreativeGroup,
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [infoCompensation, setInfoCompensation] = useState({} as Campaign);
  const handleOpen = (dataRow: Campaign) => {
    setInfoCompensation(dataRow);
    setModalIsOpen(true);
  };
  const handleOpenModalDetails = (creativeGroup: CreativeGroup) => {
    setCreativeGroupSelected(creativeGroup);
    setModalDetails({ ...modalDetails, isOpen: true });
  };
  const handleCloseModalDetails = () => {
    setModalDetails({ ...modalDetails, isOpen: false });
  };
  const [bonus, setBonus] = useState({} as Bonus[]);

  useEffect(() => {
    const fetchBonus = async () => {
      const data = await getBonus();
      setBonus(data);
    };
    fetchBonus();
  }, []);
  return (
    <>
      <section className="p-8 rounded-xl ">
        <table className="min-w-full table-fixed Table">
          <thead>
            <tr>
              <th className="w-[100px]"> </th>
              <th className="w-[100px]"> Id </th>
              <th className="">Datos Campaña</th>
              <th className="w-[140px]">Fecha de Inicio</th>
              <th className="w-[140px]">Fecha de Fin</th>
              <th className="w-[100px]">Impresiones</th>
              <th className="w-[100px]">Emisiones CO2</th>
              <th className="w-[140px]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {compensations?.map((compensation: Campaign) =>
              compensation.creativeGroups.map(
                (creativeGroup: CreativeGroup) => (
                  <tr key={creativeGroup.id}>
                    <td className="flex justify-center">
                      <input type="checkbox" name="" id="" />
                    </td>
                    <td className="w-[220px] text-center">
                      {compensation.externalId}
                    </td>
                    <td className="">
                      <div
                        className=" flex flex-col gap-2"
                        title={compensation.name}
                      >
                        <span>
                          <b className=" text-[#57a55a]">Agencia:</b>{' '}
                          {`${compensation.advertiser.compensationStrategy.agency.name} / ${compensation.advertiser.compensationStrategy.name}`}
                        </span>
                        <span>
                          <b className=" text-[#57a55a]">Anunciante:</b>{' '}
                          {compensation.advertiser.name}
                        </span>
                        <span className="block overflow-hidden overflow-ellipsis whitespace-wrap">
                          <b className=" text-[#57a55a]"> Campaña: </b>
                          <span className="">{compensation.name}</span>
                        </span>
                      </div>
                    </td>
                    <td className="text-center">
                      {DateTime.fromISO(creativeGroup.startDate).toFormat(
                        'dd LLL yyyy',
                      )}
                    </td>
                    <td className=" text-center">
                      {DateTime.fromISO(creativeGroup.endDate).toFormat(
                        'dd LLL yyyy',
                      )}
                    </td>
                    <td className=" text-center">
                      {new Intl.NumberFormat('es-CO').format(
                        creativeGroup.impressions,
                      )}
                    </td>
                    <td className=" text-center">
                      {new Intl.NumberFormat('es-CO').format(
                        creativeGroup.emissions,
                      )}
                      Kg
                    </td>
                    <td className=" text-center">
                      <div className="flex  gap-2 justify-center">
                        <button
                          title="Ver creativos"
                          className=" bg-[#FFAB49] text-[#fff]  p-2 rounded-md text-sm "
                          onClick={() =>
                            handleOpenModalDetails({
                              ...creativeGroup,
                            })
                          }
                        >
                          <PhotoIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() =>
                            handleOpen({
                              ...compensation,
                              creativeGroups: [creativeGroup],
                            })
                          }
                          title="Compensar"
                          className=" bg-[#44C949] text-[#fff]  p-2 rounded-md text-sm "
                        >
                          <GlobeAmericasIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ),
              ),
            )}
          </tbody>
        </table>

        {compensations.length === 0 && (
          <strong className="my-4 block">No hay datos para compensar</strong>
        )}
      </section>
      {modalIsOpen && (
        <ModalCompensation
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          data={infoCompensation}
          bonus={bonus}
        />
      )}
      {modalDetails.isOpen && (
        <ModalDetails
          isOpen={modalDetails.isOpen}
          closeModal={handleCloseModalDetails}
          creativeGroup={creativeGroupSelected}
        />
      )}
    </>
  );
};
export default Compensation;
