import type {Session} from '@supabase/supabase-js';
import {useContext, useEffect, useState} from 'react';

import {SupabaseContext} from '../client';

export function useSession(): {session: Session | null} {
  const {supabase} = useContext(SupabaseContext);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({data: {session}}) => {
        setSession(session);
      });

      const {
        data: {subscription},
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }
  }, [supabase]);

  return {session};
}
