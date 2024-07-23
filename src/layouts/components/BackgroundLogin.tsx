import { Outlet } from 'react-router-dom';
import { PageTitle } from '../../routes/PageTitle';
import { routes } from '@/shared/const/menu.const';

export const Background = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cover h-screen bg-center bg-[linear-gradient(334deg,#44C949_-6.72%,#9FEB8B_127.73%)]">
      <PageTitle titleMap={routes} />
      <Outlet />
    </div>
  );
};
