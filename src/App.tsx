import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePageLayout from './modules/home/page/HomePageLayout.tsx';
import {SupabaseProvider} from './supabase/client';
import {LoginPage} from './modules/auth/page/login.tsx';
import {ProfilePage} from './modules/profile/page/profile.tsx';
import {TicketPage} from './modules/ticket/page/ticket.tsx';
import WebApp from './modules/home/WebApp.tsx';

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
      path: '/profile',
      element: <WebApp />, // Usamos WebApp aquí para mantener el Navbar
      children: [
        {
          path: '',
          element: <ProfilePage />
        }
      ]
    },
    {
      path: '/ticket',
      element: <WebApp />, // Usamos WebApp aquí para mantener el Navbar
      children: [
        {
          path: '',
          element: <TicketPage />
        }
      ]
    },
    {
      path: '/web-app',
      element: <WebApp />,
    }
      ]);

  return (
    <SupabaseProvider>
      <RouterProvider router={router} />
    </SupabaseProvider>
  );
}

export default App;
