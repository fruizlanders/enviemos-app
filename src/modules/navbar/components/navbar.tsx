import './navbar.css';

import type {MouseEvent} from 'react';

import {signOut, useSession} from '../../../supabase/auth';

export function Navbar() {
  const {session} = useSession();

  async function logout(e: MouseEvent<HTMLAnchorElement>) {
    await signOut();
    e.preventDefault();
    window.location.href = '/';
  }

  return (
    <nav className="navbar">
      <a href="/">Enviemos</a>
      {!session && <a href="/login">Login</a>}
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
