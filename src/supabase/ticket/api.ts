import {supabase} from '../client';
import type {Ticket} from './types.ts';

export type CreateTicketRequest = {
  bankId: number;
  account: string;
};

export async function createTicket({
  bankId,
  account,
}: CreateTicketRequest): Promise<Ticket> {
  const {data, error} = await supabase
    .from('ticket')
    .upsert({bank_id: bankId, account_number: account})
    .select()
    .single();

  if (error) {
    return Promise.reject(error);
  }

  return data as Ticket;
}
