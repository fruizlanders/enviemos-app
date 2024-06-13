import {useEffect, useState} from 'react';

import {supabase} from '../client';
import type {Bank, Ticket} from './types.ts';

export function useTickets(userId?: string): Ticket[] | undefined {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    if (userId) {
      supabase
        .from('ticket')
        .select(
          `
          *,
          bank (*),
          ticket_state (*)
        `
        )
        .eq('user_id', userId)
        .then(({data, error}) => {
          if (!error) {
            setTickets(data);
          } else {
            console.log('error', error);
          }
        });
    }
  }, [userId]);

  return tickets;
}

export function useBanks(): Bank[] | undefined {
  const [banks, setBanks] = useState<Bank[] | undefined>(undefined);

  useEffect(() => {
    if (!banks) {
      supabase
        .from('bank')
        .select('*')
        .then(({data, error}) => {
          if (!error) {
            setBanks(data);
          } else {
            console.log('error', error);
          }
        });
    }
  }, [banks]);

  return banks;
}
