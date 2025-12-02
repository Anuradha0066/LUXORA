import { useRoomContext } from '../context/RoomContext';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogoWhite } from '../assets'; // SVG Logo
import { LogoDark } from '../assets'; // SVG Logo


const Header = () => {

  const { resetRoomFilterData } = useRoomContext();

  const [header, setHeader] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = ['Home', 'Rooms', 'Contact'];

  const navigate = useNavigate();
  const location = useLocation();

  const handleRoomsClick = (e) => {
    e.preventDefault();
    resetRoomFilterData();
    if (location.pathname === '/') {
      const el = document.getElementById('rooms');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('rooms');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    resetRoomFilterData();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate('/');
  };

  // New: handle contact scroll
  const handleContactClick = (e) => {
    e.preventDefault();
    resetRoomFilterData();
    if (location.pathname === '/') {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  // New: staff login navigation
  const handleStaffLogin = (e) => {
    e.preventDefault();
    // no filter reset needed, navigate to staff login page
    navigate('/staff-login');
  };

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-300 
      ${header ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8'}`}
    >

      <div className='container mx-auto flex items-center lg:justify-between gap-y-6 lg:gap-y-0'>

        {/* Logo */}
        <button onClick={handleHomeClick} className='bg-transparent border-0 p-0'>
          {
            header ? (
              <p>Hotel LUXORA</p>
            ) : (
              <p style={{ color: "white" }}>Hotel LUXORA</p>
            )
          }
        </button>

        <div className='flex items-center gap-x-6'>
          {/* Nav */}
          <nav className={`${header ? 'text-primary' : 'text-white'}
          flex gap-x-4 lg:gap-x-8 font-tertiary tracking-[3px] text-[15px] items-center uppercase`}>
            {
              navLinks.map(link => {
                if (link === 'Rooms') {
                  return (
                    <button
                      key={link}
                      onClick={handleRoomsClick}
                      className='transition hover:text-accent bg-transparent border-0 p-0'
                    >
                      {link}
                    </button>
                  );
                }
                if (link === 'Home') {
                  return (
                    <button
                      key={link}
                      onClick={handleHomeClick}
                      className='transition hover:text-accent bg-transparent border-0 p-0'
                    >
                      {link}
                    </button>
                  );
                }
                if (link === 'Contact') {
                  return (
                    <button
                      key={link}
                      onClick={handleContactClick}
                      className='transition hover:text-accent bg-transparent border-0 p-0'
                    >
                      {link}
                    </button>
                  );
                }
                return (
                  <Link to="/contact" className='transition hover:text-accent' key={link}>
                    {link}
                  </Link>
                );
              })
            }
          </nav>

          {/* Staff Login button on the right of Contact */}
          <button
            onClick={handleStaffLogin}
            className={`ml-4 px-4 py-2 rounded-md border transition
              ${header ? 'bg-primary text-white' : 'bg-white text-primary'}`}
          >
            Staff Login
          </button>
        </div>

      </div>

    </header>
  );
};

export default Header;
