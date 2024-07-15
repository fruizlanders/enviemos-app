import {Outlet} from 'react-router-dom';

import styles from '../../style';
import {SupabaseProvider} from '../../supabase/client';
import {Navbar} from '../navbar/components/navbar.tsx';
import Heros from './Heros.tsx';
import {NavbarProvider} from '../navbar/components/NavbarContext.tsx';

export const WelcomePage = () => {
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

export const WebApp = () => {
  return (
    <SupabaseProvider>
      <NavbarProvider>
        <div className="bg-secondary w-full overflow-hidden" >
          <div className={`${styles.flexCenter}`}>
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

export default WebApp;
