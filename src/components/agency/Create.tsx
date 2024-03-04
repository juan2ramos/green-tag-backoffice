import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { createAgency } from '../../services/agency';
import AlertError from '../commons/AlertError';
import { Agency } from './types';
import { validateAdditionalData } from '../../helpers/validateAdditionalData';

const CreateAgency = () => {
  const [platforms, setIsPlatforms] = useState({
    Equativ: false,
    Xandr: false,
    Email: false,
  });

  const [error, setError] = useState(false);

  const agency = {
    name: '',
    active: true,
    compensationStrategies: [
      {
        name: 'Equativ',
        additionalData: {
          username: '',
          password: '',
          client_id: '',
          client_secret: '',
        },
      },
      {
        name: 'Xandr',
        additionalData: {
          username: '',
          password: '',
        },
      },
      {
        name: 'Email',
        additionalData: {
          email: '',
        },
      },
    ],
  };

  const { formState, onInputChange, active } = useForm<Agency>(agency);

  const onChangeCompensation = (
    e: React.ChangeEvent<HTMLInputElement>,
    strategyName: string,
  ) => {
    const { value } = e.target;

    const strategies = formState.compensationStrategies?.map((compensation) => {
      if (compensation.name === strategyName)
        return {
          name: compensation.name,
          additionalData: {
            ...compensation.additionalData,
            [e.target.name]: value,
          },
        };
      return compensation;
    });

    onInputChange({
      target: {
        name: 'compensationStrategies',
        value: strategies ?? [],
      },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setIsPlatforms({
      ...platforms,
      [value]: checked,
    });
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let error = false;

    const strategiesValidated = formState.compensationStrategies?.reduce(
      (acc, strategy) => {
        const aData = strategy.additionalData;
        const validated = validateAdditionalData(Object.values(aData));
        if (validated === 'empty') return acc;
        if (validated === 'filled')
          return acc ? [...acc, strategy] : [strategy];
        error = true;
        return acc;
      },
      [] as Agency['compensationStrategies'],
    );

    let agencyFormatted = {
      ...formState,
    };
    if ((strategiesValidated?.length ?? 0) > 0)
      agencyFormatted = {
        ...agencyFormatted,
        compensationStrategies: strategiesValidated,
      };
    else delete agencyFormatted.compensationStrategies;
    console.log(agencyFormatted);

    if (error) return setError(true);
    const response = await createAgency(agencyFormatted);
    console.log(response);

    if (response.error) setError(true);
  };

  return (
    <>
      <section className="bg-white p-8 rounded-xl ">
        <h2>Crear agencia</h2>
        {error && (
          <AlertError
            message="Hubo un error al crear la agencia, revisa los campos del formulario"
            onClose={() => setError(false)}
          />
        )}
        <hr />
        <form className="pt-4 flex flex-col gap-4" onSubmit={onFormSubmit}>
          <div className="flex gap-4">
            <div className="w-1/3">
              <input
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#4A9A81]"
                type="text"
                placeholder="Ingresa el nombre de la agencia"
                name="name"
                onChange={onInputChange}
              />
            </div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="border-gray-300 border-2 text-[#4A9A81] focus:border-gray-300 focus:ring-[#4A9A81]"
                defaultChecked={active}
                name="active"
                onChange={onInputChange}
              />
              <span className="ml-2">
                Activar agencia para realizar compensaciones
              </span>
            </label>
          </div>
          <div className="my-2">
            <h3>Agrega plataforma</h3>
            <div className="flex gap-6 my-2">
              <div className="w-1/3">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={'Equativ'}
                    onChange={handleInputChange}
                    className="border-gray-300 border-2 text-[#4A9A81] focus:border-gray-300 focus:ring-[#4A9A81]"
                  />
                  <span className="ml-2">Equativ</span>
                </label>
                {platforms.Equativ && (
                  <div>
                    <input
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#4A9A81]"
                      type="text"
                      placeholder="Usuario de la plataforma"
                      name="username"
                      onChange={(e) => onChangeCompensation(e, 'Equativ')}
                    />
                    <input
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#4A9A81]"
                      type="password"
                      placeholder="Contraseña de la plataforma"
                      name="password"
                      onChange={(e) => onChangeCompensation(e, 'Equativ')}
                    />
                    <input
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#4A9A81]"
                      type="password"
                      placeholder="Client ID"
                      name="client_id"
                      onChange={(e) => onChangeCompensation(e, 'Equativ')}
                    />
                    <input
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#4A9A81]"
                      type="password"
                      placeholder="Client Secret"
                      name="client_secret"
                      onChange={(e) => onChangeCompensation(e, 'Equativ')}
                    />
                  </div>
                )}
              </div>
              <div className="w-1/3">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={'Xandr'}
                    onChange={handleInputChange}
                    className="border-gray-300 border-2 text-[#4A9A81] focus:border-gray-300 focus:ring-[#4A9A81]"
                  />
                  <span className="ml-2">Xandr</span>
                </label>
                {platforms.Xandr && (
                  <div>
                    <input
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#4A9A81]"
                      type="text"
                      placeholder="Usuario de la plataforma"
                      name="username"
                      onChange={(e) => onChangeCompensation(e, 'Xandr')}
                    />
                    <input
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#4A9A81]"
                      type="password"
                      placeholder="Contraseña de la plataforma"
                      name="password"
                      onChange={(e) => onChangeCompensation(e, 'Xandr')}
                    />
                  </div>
                )}
              </div>
              <div className="w-1/3">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={'Email'}
                    onChange={handleInputChange}
                    className="border-gray-300 border-2 text-[#4A9A81] focus:border-gray-300 focus:ring-[#4A9A81]"
                  />
                  <span className="ml-2">Vía Email</span>
                </label>
                {platforms.Email && (
                  <div>
                    <input
                      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#4A9A81]"
                      type="email"
                      placeholder="Correo desde el que se enviará el reporte"
                      name="email"
                      onChange={(e) => onChangeCompensation(e, 'Email')}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="text-white bg-[#4A9A81] hover:bg-[#5ec2a2] focus:ring-4 focus:outline-none focus:ring-[#57b597] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-1/3 justify-center gap-2"
            >
              Crear Agencia
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateAgency;
