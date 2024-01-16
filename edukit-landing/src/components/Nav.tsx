import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Nav() {
  const location = useLocation();

  return (
    <Navbar fluid rounded className="px-8 sm:px-8 md:p-4 md:px-24 border-b">
      <Navbar.Brand to="/" as={Link}>
        <img alt="Edukit Logo" className="mr-3 h-6" src="/logo__edukit.svg" />
        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span> */}
      </Navbar.Brand>
      <div className="flex md:order-2 md:hidden">
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link to="/" active={location.pathname === '/'} as={Link}>
          Home
        </Navbar.Link>
        <Navbar.Link
          to="/about"
          active={location.pathname === '/about'}
          as={Link}
        >
          About
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav;
