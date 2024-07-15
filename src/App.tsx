import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {LoginPage} from './modules/auth/page/login.tsx';
import {ResetPasswordPage} from './modules/auth/page/ResetPasswordPage.tsx';

import HomePageLayout from './modules/home/page/HomePageLayout.tsx';
import {WebApp, WelcomePage} from './modules/home/WebApp.tsx';
import {ProfilePage} from './modules/profile/page/profile.tsx';
import {SummaryPage} from './modules/summary/page/SummaryPage.tsx';
import {CommercePage} from './modules/ticket/page/CommercePage.tsx';
import styles from './style.ts';
import {SupabaseProvider} from './supabase/client';
import {EditCommerceForm} from './modules/edit/page/EditCommerceForm.tsx';
import EnvioPage from './modules/envio/page/EnvioPage.tsx';

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
      path: '/edit/:id', // Incluye un parámetro dinámico para identificar el comercio
      element: <WebApp />,
      children: [
        {
          path: '',
          element: <EditCommerceForm />,
        },
      ],
    },
  ]);

  return (
    <SupabaseProvider>
      <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <RouterProvider router={router} />
          </div>
        </div>
      </div>
    </SupabaseProvider>
  );
}

export default App;
