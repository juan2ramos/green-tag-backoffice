import { NavLink } from 'react-router-dom';
import './nav.scss';
const Nav = () => {
  return (
    <nav>
      <ul className=" flex items-center gap-4">
        <li>
          <NavLink
            to="/agencies"
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            Agencias
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/advertisers"
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            Anunciantes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/campaigns"
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            Obtener datos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/compensation"
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            Compensar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reportes"
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            Reportes
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            Proyectos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
