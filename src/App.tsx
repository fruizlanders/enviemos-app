import './App.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {LoginPage} from './modules/auth/page/login.tsx';
import {Navbar} from './modules/navbar/components/navbar.tsx';
import {SupabaseProvider} from './supabase/client';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>Hello world!</div>,
    },
    {
      path: '/login',
      element: <LoginPage />,
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
