import {Outlet, useNavigate} from 'react-router-dom';

import styles from '../../style.ts';
import {useAdmin} from '../../supabase/auth'; // Importa tu nuevo hook
import {SupabaseProvider} from '../../supabase/client';
import {NavbarProvider} from '../navbar/components/NavbarContext.tsx';
import Heros from './../home/Heros.tsx';
import {Navbar} from './components/Navbar.tsx';
import {Sidebar} from './components/Sidebar.tsx';
import {useEffect} from 'react';

export const WelcomeAdmin = () => {
  return (
    <div className="bg-green text-black p-8 rounded-lg shadow-lg mt-84">
      <div className={` ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Heros />
        </div>
      </div>
    </div>
  );
};

export const AdminLayout = () => {
  const {isAdmin} = useAdmin();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAdmin === false) {
      //navigate('/'); // Redirect non-admin users to the home page or any other appropriate page
    }
  }, [isAdmin, navigate]);

  if (isAdmin === undefined) {
    return <div>Loading...</div>; // Show loading while checking admin status
  }
  return (
    <SupabaseProvider>
      <NavbarProvider>
        <div className="bg-secondary w-full overflow-hidden">
          <div className={`${styles.flexCenter}`}>
            <Sidebar />
            <div className={` ${styles.paddingX}${styles.boxWidth}`}>
              <Navbar />
            </div>
          </div>
          <div className={` ${styles.flexCenter}`}>
            {isAdmin && (
              <div className={`${styles.boxWidth}`}>
                <Outlet />
              </div>
            )}
          </div>
        </div>
      </NavbarProvider>
    </SupabaseProvider>
  );
};

export default AdminLayout;
