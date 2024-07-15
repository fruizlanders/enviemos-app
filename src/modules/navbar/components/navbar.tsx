import './navbar.css';

import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavbar} from './NavbarContext.tsx';

import {close, logo, menu} from '../../../assets';
import {navLinks2} from '../../../constants';
import styles from '../../../style.ts';
import {signOut} from '../../../supabase/auth';
import {SupabaseProvider} from '../../../supabase/client';

export function Navbar() {
  const [active, setActive] = useState('Home');
  const {toggle, setToggle} = useNavbar();
  //const [toggle, setToggle] = useState(false);

  async function logout() {
    await signOut();
    window.location.href = '/';
  }

  return (
    <>
      <SupabaseProvider>
        <nav className="w-full flex py-6 justify-between items-center navbar">
          <div
            className={`py-1 px-3 font-poppins font-medium text-[18px] text-primary bg-green-gradient-2 rounded-[10px] outline-none ${styles}`}
          >
            <a href="/">
              <img src={logo} alt="hoobank" className="w-[200px] h-[52px]" />
            </a>
          </div>
          <ul className="list-none sm:flex hidden justify-end items-center flex-1">
            <>
              {' '}
              {navLinks2.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-normal cursor-pointer text-[16px] ${
                    active === nav.title ? 'text-white' : 'text-white'
                  } ${index === navLinks2.length - 1 ? 'mr-0' : 'mr-10'}`}
                  onClick={() => setActive(nav.title)}
                >
                  <Link to={`/${nav.id}`}>
                    {index === navLinks2.length - 1 ? (
                      <button
                        className={`py-3 px-5 font-poppins font-medium text-[18px] text-black bg-green-gradient rounded-[10px] outline-none ${styles}`} // Aplica los estilos directamente al botón
                        onClick={logout}
                      >
                        {nav.title}
                      </button>
                    ) : (
                      nav.title
                    )}
                  </Link>
                </li>
              ))}
            </>
          </ul>

          <div className="sm:hidden flex flex-1 justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain"
              onClick={() => setToggle((prev) => !prev)}
            />

            <div
              className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
            >
              <ul
                className={`${toggle ? 'flex' : 'hidden'} list-none flex justify-end items-start flex-1 flex-col`}
              >
                {navLinks2.map((nav, index) => (
                  <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                      active === nav.title ? 'text-white' : 'text-white'
                    } ${index === navLinks2.length - 1 ? 'mb-0' : 'mb-4'}`}
                    onClick={() => setActive(nav.title)}
                  >
                    <Link to={`/${nav.id}`}>
                      {index === navLinks2.length - 1 ? (
                        <button
                          className={`py-3 px-5 font-poppins font-medium text-[18px] text-black bg-green-gradient rounded-[10px] outline-none ${styles}`}
                          onClick={logout}
                          // Aplica los estilos directamente al botón
                        >
                          {nav.title}
                        </button>
                      ) : (
                        nav.title
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </SupabaseProvider>
    </>
  );
}
