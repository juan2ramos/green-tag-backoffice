import { Link } from 'react-router-dom';
import './nav.scss';
const Nav = () => {
  return (
    <nav>
      <ul className=" flex items-center gap-4">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/agencias">Agencias</Link>
        </li>
        <li>
          <Link to="/">Anunciantes</Link>
        </li>
        <li>
          <Link to="/">Campañas</Link>
        </li>
        <li>
          <Link to="/">Bonos</Link>
        </li>
        <li>
          <Link to="/">Compensar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
