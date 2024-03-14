import { Link } from 'react-router-dom';
import logo from '../assets/green-tag-logo.svg';
import Nav from './Nav';

const Header = () => {
  return (
    <header className=" px-10 py-6 bg-white">
      <div className="mx-auto max-w-[1200px] flex justify-between items-center ">
        <Link to="/">
          <img src={logo} alt="Logo" className="max-w-[168px]" />
        </Link>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
