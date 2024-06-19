import { SupabaseProvider } from '../../supabase/client';
import {Navbar} from '../../modules/navbar/components/navbar.tsx';
import { Outlet } from 'react-router-dom';

const WebApp = () => {
  return (
    <SupabaseProvider>
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </SupabaseProvider>
  );
};

export default WebApp;
