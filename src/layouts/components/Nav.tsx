import { routes } from '@/components/commons/menu';
import { NavLink, useLocation } from 'react-router-dom';

export const Nav = () => {
  const location = useLocation().pathname.split('/')[1];

  return (
    <nav>
      <ul className="flex nav-primary">
        {routes.map((route) => (
          <li key={route.to} className=" px-4 ">
            <NavLink
              to={route.to}
              className={route.path == location ? 'is-active' : 'text-blueTTY'}
            >
              {route.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
