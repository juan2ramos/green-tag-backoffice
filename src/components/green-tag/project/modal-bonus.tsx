import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { createBonus } from '@/services/bonus';

const ModalBonus = ({
  isOpen,
  setIsOpen,
  projectId,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
}) => {
  const [bonus, setBonus] = useState({
    url: '',
    urlBlockchain: '',
    co2Total: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);

    setBonus({ ...bonus, [e.target.name]: e.target.value });
    console.log(bonus);
  };
  const handleCreateBonus = async () => {
    setLoading(true);
    try {
      await createBonus({
        projectId,
        url: bonus.url,
        urlBlockchain: bonus.urlBlockchain,
        co2Total: bonus.co2Total || 0,
      });
      setSuccess(true);
      setBonus({
        url: '',
        urlBlockchain: '',
        co2Total: null,
      });
    } catch (error: Error | unknown) {
      setError({ status: true, message: (error as Error)?.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal show={isOpen} size="xl" onClose={() => setIsOpen(false)} popup>
      <Modal.Body>
        <h3 className="mt-8  flex gap-2 items-center text-[#728595]">
          Crear bono
        </h3>
        <hr />

        {error.status && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{error.message}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Éxito!</strong>
            <span className="block sm:inline">Bono creado correctamente</span>
          </div>
        )}
        <div className="pt-4 flex flex-col gap-4">
          <div className="">
            <input
              className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#44C949]"
              type="text"
              placeholder="Ingresa la URL del bono padre"
              name="url"
              value={bonus.url}
              onChange={inputChange}
            />
          </div>
          <div className="">
            <input
              className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#44C949]"
              type="text"
              placeholder="Ingresa la URL blockchain del bono padre"
              name="urlBlockchain"
              value={bonus.urlBlockchain}
              onChange={inputChange}
            />
          </div>
          <div className="">
            <input
              className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#44C949]"
              type="number"
              placeholder="Cantidad de co2 del bono en Kg"
              name="co2Total"
              value={bonus.co2Total || ''}
              onChange={inputChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            className="bg-[#4a8d51] button-tty"
            onClick={handleCreateBonus}
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Bono'}
          </Button>
          <Button color="gray" onClick={() => setIsOpen(false)}>
            No, cancelar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ModalBonus;
