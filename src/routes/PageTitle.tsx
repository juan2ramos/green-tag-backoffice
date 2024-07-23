import { routes } from '@/shared/const/menu.const';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  titleMap: { to: string; text: string }[];
}
export const PageTitle = ({ titleMap }: Props) => {
  const location = useLocation();

  const findRouteByTo = (to: string) => {
    return (
      routes.find((route) => route.to === to)?.text || 'Página no encontrada'
    );
  };

  useEffect(() => {
    const title = findRouteByTo(location.pathname);
    document.title = `Green Tag Backoffice | ${title}`;
  }, [location, titleMap]);

  return null;
};
