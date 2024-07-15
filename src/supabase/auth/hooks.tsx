import type {Session} from '@supabase/supabase-js';
import {useContext, useEffect, useState} from 'react';

import {supabase, SupabaseContext} from '../client';
import type {Profile} from './types.ts';

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

export function useProfile(userId?: string): Profile | undefined {
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (userId) {
      supabase
        .from('user_data')
        .select('*')
        .eq('id', userId)
        .single()
        .then(({data, error} = {data: null, error: null}) => {
          if (!error) {
            // @ts-ignore
            setProfile(data as Profile);
          } else {
            console.log('error', error);
          }
        });
    }
  }, [userId]);

  return profile;
}
