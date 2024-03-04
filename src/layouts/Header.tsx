import logo from '../assets/green-tag-logo.svg';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="bg-gray-800  p-4">
      <div className="mx-auto max-w-[1200px] flex justify-between items-center ">
        <img src={logo} alt="Logo" className="max-w-[200px]" />
        <Nav />
      </div>
    </header>
  );
};

export default Header;
