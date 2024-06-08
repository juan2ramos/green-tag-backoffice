import { Outlet } from 'react-router-dom';
import { NavSecondary } from './NavSecondary';
import { Nav } from './Nav';
import Logo from '../../assets/Logo-Green-Tag.svg';

import { useAuthStore } from '../../stores/auth.store';
import { PageTitle } from '../../routes/PageTitle';
import { routes } from '../../components/commons/menu';

interface Props {
  isLoading: boolean;
}
export const ContentDefaultLayout = ({ isLoading }: Props) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logoutUser);

  return (
    <div className="flex">
      <PageTitle titleMap={routes} />
      <div className="w-full min-h-screen px-10 pb-10  m-auto max-w-[1440px]">
        <header className="py-5">
          <div className="flex justify-between items-center ">
            <figure>
              {<img width="180px" src={Logo} alt="Logo Green Tag" />}
            </figure>
            <div className="flex gap-10 items-center">
              <Nav />
              {!isLoading && (
                <div className="flex items-center">
                  <div className="rounded-full bg-blueTTY w-[50px] h-[50px] flex items-center justify-center font-bold text-white">
                    <span>{user?.fullName[0]}</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-blackTTY font-extralight">
                      {user?.fullName}
                    </span>
                    <p>
                      <span
                        className="text-blueTTY cursor-pointer"
                        onClick={() => logout()}
                      >
                        Cerrar sesión
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <NavSecondary />
        </header>
        <main className="flex flex-col">
          {isLoading ? <p>Cargando...</p> : <Outlet />}
        </main>
      </div>
    </div>
  );
};
