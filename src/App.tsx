import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import AdminLayout from '../src/modules/admin/AdminLayout.tsx';
import {CommercesPage} from './modules/admin/CommercesPage.tsx';
import {EnviosPage} from './modules/admin/EnviosPage.tsx';
import {UsersPage} from './modules/admin/UsersPage.tsx';
import {LoginPage} from './modules/auth/page/login.tsx';
import {ResetPasswordPage} from './modules/auth/page/ResetPasswordPage.tsx';
import {EditCommerceForm} from './modules/edit/page/EditCommerceForm.tsx';
import EnvioPage from './modules/envio/page/EnvioPage.tsx';
import HomePageLayout from './modules/home/page/HomePageLayout.tsx';
import {WebApp, WelcomePage} from './modules/home/WebApp.tsx';
import {ProfilePage} from './modules/profile/page/profile.tsx';
import {SummaryPage} from './modules/summary/page/SummaryPage.tsx';
import {CommercePage} from './modules/ticket/page/CommercePage.tsx';
import SessionManager from './SessionManager.tsx';
import styles from './style.ts';
import {SupabaseProvider} from './supabase/client';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePageLayout />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/reset',
      element: <ResetPasswordPage />,
    },
    {
      path: '/profile',
      element: <WebApp />, // Usamos WebApp aquí para mantener el Navbar
      children: [
        {
          path: '',
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: '/summary',
      element: <WebApp />, // Usamos WebApp aquí para mantener el Navbar
      children: [
        {
          path: '',
          element: <SummaryPage />,
        },
      ],
    },
    {
      path: '/commerce',
      element: <WebApp />, // Usamos WebApp aquí para mantener el Navbar
      children: [
        {
          path: '',
          element: <CommercePage />,
        },
      ],
    },
    {
      path: '/envios',
      element: <WebApp />, // Usamos WebApp aquí para mantener el Navbar
      children: [
        {
          path: '',
          element: <EnvioPage />,
        },
      ],
    },
    {
      path: '/bienvenida',
      element: <WebApp />,
      children: [
        {
          path: '',
          element: <WelcomePage />,
        },
      ],
    },
    {
      path: '/edit/:id',
      element: <WebApp />,
      children: [
        {
          path: '',
          element: <EditCommerceForm />,
        },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        {
          path: 'users',
          element: <UsersPage />,
        },
        {
          path: 'commerces',
          element: <CommercesPage />,
        },
        {
          path: 'envios',
          element: <EnviosPage />,
        },
      ],
    },
  ]);

  return (
    <SupabaseProvider>
      <SessionManager>
        <div className="bg-primary w-full overflow-hidden">
          <div className={`${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <RouterProvider router={router} />
            </div>
          </div>
        </div>
      </SessionManager>
    </SupabaseProvider>
  );
}

export default App;
