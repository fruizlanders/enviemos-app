import {useEffect, useState} from 'react';

import {supabase} from '../client';
import type {Bank, Commerce} from './types.ts';

export function useCommerces(userId?: string): Commerce[] | undefined {
  const [commerces, setCommerces] = useState<Commerce[]>([]);
  useEffect(() => {
    if (userId) {
      supabase
        .from('commerce')
        .select(
          `
          *,
          bank (*),
          commerce_state (*)
        `
        )
        .eq('user_id', userId)
        .then(({data, error} = {data: null, error: null}) => {
          if (!error) {
            console.log(data);
            // @ts-ignore
            setCommerces(data as Commerce);
          } else {
            console.log('error', error);
          }
        });
    }
  }, [userId]);

  return commerces;
}

export function useBanks(): Bank[] | undefined {
  const [banks, setBanks] = useState<Bank[] | undefined>(undefined);

  useEffect(() => {
    if (!banks) {
      supabase
        .from('bank')
        .select('*')
        .then(({data, error}= { data: null, error: null }) => {
          if (!error) {
            console.log(data);
            // @ts-ignore
            setBanks(data as Bank);
          } else {
            console.log('error', error);
          }
        });
    }
  }, [banks]);

  return banks;
}
