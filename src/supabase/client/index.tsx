import type {SupabaseClient} from '@supabase/supabase-js';
import type {PropsWithChildren} from 'react';
import {createContext} from 'react';

import {useSupabase} from './hooks.tsx';

export const SupabaseContext = createContext<{supabase: SupabaseClient | null}>(
  {supabase: null}
);

export function SupabaseProvider({children}: PropsWithChildren) {
  const supabase = useSupabase();

  return (
    <SupabaseContext.Provider value={{supabase}}>
      {children}
    </SupabaseContext.Provider>
  );
}
