import './navbar.css';

import {signOut, useSession} from '../../../supabase/auth';

export function Navbar() {
  const {session} = useSession();
  return (
    <nav className="navbar">
      <a href="/">Enviemos</a>
      {!session && <a href="/login">Login</a>}
      {session && <a href="/profile">Profile</a>}
      {session && <a href="/ticket">Tickets</a>}
      {session && (
        <a href="#" onClick={async () => await signOut()}>
          Logout
        </a>
      )}
    </nav>
  );
}
