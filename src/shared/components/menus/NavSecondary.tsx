import { routes } from '@/shared/const/menu.const';
import { NavLink, useLocation } from 'react-router-dom';

const getSubNavRoutes = (path: string) => {
  const route = routes.find((route) => route.path === path);
  return route ? route.children || [] : [];
};
export const NavSecondary = () => {
  const location = useLocation().pathname.split('/')[1];
  const subNav = getSubNavRoutes(location);

  if (!subNav.length) return null;

  return (
    <nav>
      <ul className="flex space-x-4 border-t border-b my-4 py-2">
        {subNav.map((route) => (
          <li key={route.to}>
            <NavLink
              to={route.to}
              className={({ isActive }) =>
                isActive ? 'is-active text-sm' : 'text-blueTTY text-sm'
              }
            >
              {route.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
