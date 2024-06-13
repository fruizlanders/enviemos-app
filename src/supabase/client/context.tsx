import {type SupabaseClient} from '@supabase/supabase-js';
import {createContext, type PropsWithChildren} from 'react';

import {supabase} from './index.tsx';

export const SupabaseContext = createContext<{supabase: SupabaseClient | null}>(
  {supabase: null}
);

export function SupabaseProvider({children}: PropsWithChildren) {
  return (
    <SupabaseContext.Provider value={{supabase}}>
      {children}
    </SupabaseContext.Provider>
  );
}
