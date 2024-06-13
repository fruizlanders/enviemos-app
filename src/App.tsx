import './App.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {LoginPage} from './modules/auth/page/login.tsx';
import {HomePage} from './modules/home/page/home.tsx';
import {Navbar} from './modules/navbar/components/navbar.tsx';
import {ProfilePage} from './modules/profile/page/profile.tsx';
import {TicketPage} from './modules/ticket/page/ticket.tsx';
import {SupabaseProvider} from './supabase/client';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/profile',
      element: <ProfilePage />,
    },
    {
      path: '/ticket',
      element: <TicketPage />,
    },
  ]);

  return (
    <>
      <SupabaseProvider>
        <Navbar />
        <RouterProvider router={router} />
      </SupabaseProvider>
    </>
  );
}

export default App;
