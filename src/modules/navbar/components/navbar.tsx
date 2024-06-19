import './navbar.css';
import {MouseEvent} from 'react';
import {logo} from '../../../assets';
import { signOut, useSession } from "../../../supabase/auth";


export function Navbar() {
  const {session} = useSession();
  async function logout(e: MouseEvent<HTMLAnchorElement>) {
    await signOut();
    e.preventDefault();
    window.location.href = '/';
  }

  return (

    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="logo" className="w-[100px] h-[52px] " />
      <a href="/">Enviemos</a>
      {!session && <a href="/">Inicio</a>}
      {session && <a href="/profile">Profile</a>}
      {session && <a href="/ticket">Tickets</a>}
      {session && (
        <a href="#" onClick={logout}>
          Logout
        </a>
      )}




    </nav>
  );
}
