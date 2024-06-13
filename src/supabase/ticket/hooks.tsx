import {useEffect, useState} from 'react';

import {supabase} from '../client';
import type {Ticket} from './types.ts';

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
