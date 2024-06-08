import { Button, Modal, Select } from 'flowbite-react';
import { LuInfo } from 'react-icons/lu';
import { Bonus, Campaign } from './types';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { offsetCompensation } from '@/services/compensation';
import { RocketLaunchIcon, FaceFrownIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';

const ModalCompensation = ({
  isOpen,
  setIsOpen,
  data,
  bonus,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: Campaign;
  bonus: Bonus[];
}) => {
  const queryClient = useQueryClient();
  const [bonusIdSelected, setBonusIdSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pdf, setPdf] = useState('');
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const onChangeBonus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBonusIdSelected(e.target.value);
  };
  const handleCompensate = async () => {
    setLoading(true);
    try {
      const PDF = await offsetCompensation({
        legacyBonusId: bonusIdSelected,
        creativeGroupId: data.creativeGroups[0].id,
      });

      setPdf(PDF.url);
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['compensations'] });
      queryClient.prefetchQuery({ queryKey: ['compensations'] });
    } catch (error: Error | unknown) {
      setError({ status: true, message: (error as Error)?.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal show={isOpen} size="3xl" onClose={() => setIsOpen(false)} popup>
        <Modal.Body>
          <h3 className="mt-8  flex gap-2 items-center text-[#728595]">
            <LuInfo size={'20px'} className="  text-[#FFAB49]" /> Revisa la
            información antes de compensar
          </h3>
          <hr />
          <div className="p-4 text-[#9CA3AF] flex flex-col gap-2">
            <p>
              <b>Agencia: </b>
              {`${data.advertiser.compensationStrategy.agency.name} / ${data.advertiser.compensationStrategy.name}`}
            </p>
            <p>
              <b>Anunciante: </b>
              {data.advertiser.name}
            </p>
            <p>
              <b>Rango de fecha: </b>
              {DateTime.fromISO(data.creativeGroups[0].startDate).toFormat(
                'dd LLL yyyy',
              )}
              {' - '}

              {DateTime.fromISO(data.creativeGroups[0].endDate).toFormat(
                'dd LLL yyyy',
              )}
            </p>
            <p>
              <b>Campaña: </b>
              {data.name}
            </p>
            <p>
              <b>Impresiones: </b>
              {}
              {new Intl.NumberFormat('es-CO').format(
                data.creativeGroups[0].emissions,
              )}
            </p>
            <p>
              <b>CO2: </b>
              {new Intl.NumberFormat('es-CO').format(
                data.creativeGroups[0].emissions,
              )}
              Kg
            </p>
            <div>
              <b className=" text-[#728595] ">Bono: </b>
              <Select name="" id="" onChange={onChangeBonus}>
                <option value="">
                  Seleccione un bono para compensar la campaña
                </option>
                {bonus.map((b) => (
                  <option key={b.id} value={b.id}>
                    {Number(b.co2Total) - (Number(b.co2Compensated) || 0)}Kg -{' '}
                    {b.project.name}
                  </option>
                ))}
              </Select>
            </div>
            {error.status && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <p className="text-[#ff0000] ">
                  <FaceFrownIcon className="h-5 w-5 inline" />
                  ¡Hubo un error al compensar! revisa que el bono tenga saldo
                </p>
              </div>
            )}
            {!success && (
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  className="bg-[#4a8d51] button-tty"
                  onClick={handleCompensate}
                  disabled={loading || !bonusIdSelected}
                >
                  {loading ? 'Compensando...' : 'Compensar campaña'}
                </Button>
                <Button color="gray" onClick={() => setIsOpen(false)}>
                  No, cancelar
                </Button>
              </div>
            )}

            {success && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <p className="text-[#57a55a] ">
                  <RocketLaunchIcon className="h-5 w-5 inline" />
                  ¡Compensación exitosa!{' '}
                  <a
                    href={pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#FFAB49] underline"
                  >
                    Descargar comprobante
                  </a>
                </p>
                <Button color="gray" onClick={() => setIsOpen(false)}>
                  Salir
                </Button>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCompensation;
