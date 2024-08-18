import {useState} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import {navLinks3} from '../../../constants';

import styles from '../../../style.ts';
import {SupabaseProvider} from '../../../supabase/client';

const Sidebar: React.FC = () => {
  const [active, setActive] = useState('Users');

  return (
    <>
      <SupabaseProvider>
        <aside
          className={`bg-gray-800 text-white w-64 h-full p-4 ${styles.paddingX}`}
        >
          <ul className="space-y-4">
            {navLinks3.map((nav) => (
              <li key={nav.id} className="w-full">
                <Link
                  to={`/admin/${nav.id}`}
                  className={`block p-2 rounded ${
                    active === nav.title
                      ? 'bg-green-gradient text-black'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => setActive(nav.title)}
                >
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </SupabaseProvider>
    </>
  );
};

export {Sidebar};
