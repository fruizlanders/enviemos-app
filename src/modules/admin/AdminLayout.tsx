import {Outlet} from 'react-router-dom';

import styles from '../../style.ts';
import {SupabaseProvider} from '../../supabase/client';
import {NavbarProvider} from '../navbar/components/NavbarContext.tsx';
import Heros from './../home/Heros.tsx';
import {Navbar} from './components/Navbar.tsx';
import {Sidebar} from './components/Sidebar.tsx';

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
            <div className={`${styles.boxWidth}`}>
              <Outlet />
            </div>
          </div>
        </div>
      </NavbarProvider>
    </SupabaseProvider>
  );
};

export default AdminLayout;
