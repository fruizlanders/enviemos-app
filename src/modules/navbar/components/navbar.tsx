import './navbar.css';

import {useSession} from '../../../supabase/auth/hooks';
import {useSupabase} from '../../../supabase/client/hooks.tsx';

export function Navbar() {
  const {session} = useSession();
  const supabase = useSupabase();

  async function logout() {
    if (supabase) {
      const {error} = await supabase.auth.signOut();
      console.log(error);
    }
  }

  return (
    <nav className="navbar">
      <a id="logo" href="/">
        Enviemos
      </a>
      <div>
        {!session && (
          <a id="logo" href="/login">
            Login
          </a>
        )}
        {session && <div>{session.user.email}</div>}
        {session && (
          <a href="#" onClick={async () => await logout()}>
            Logout
          </a>
        )}
      </div>
    </nav>
  );
}
