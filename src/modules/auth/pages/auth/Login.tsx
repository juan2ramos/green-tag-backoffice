import { Button, Card } from 'flowbite-react';
import Logo from '../../../../assets/Logo-Green-Tag.svg';
import { useLogin } from '../../hooks/useLogin';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
export const LoginPage = () => {
  const { onSubmit, status, error } = useLogin();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  useEffect(() => {
    setIsButtonEnabled(!(status === 'pending'));
  }, [status]);
  return (
    <div className="flex w-full h-full  justify-center  items-center">
      <Card className=" max-w-[380px] h-max w-full">
        <figure className="p-1">
          <img
            className=" max-w-[240px] m-auto"
            width={'100%'}
            src={Logo}
            alt="Logo Green Tag "
          />
        </figure>
        <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-4">
          {error !== null && <div style={{ color: 'red' }}>{error}</div>}
          <div>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Contraseña"
              required
            />
          </div>
          <Button
            type="submit"
            className={` text-white py-2  ${
              isButtonEnabled
                ? 'bg-[#87c55d] hover:enabled:bg-[#6ca148]'
                : 'bg-gray-300'
            }`}
            disabled={!isButtonEnabled}
          >
            {isButtonEnabled ? 'INICIAR SESIÓN' : 'Iniciando sesión...'}
          </Button>
        </form>
        <a
          href="#"
          className="text-[14px] text-gray-500 text-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          ¿No puedes iniciar sesión?
        </a>
      </Card>
    </div>
  );
};
