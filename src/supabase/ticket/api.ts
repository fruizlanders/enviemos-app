import {supabase} from '../client';
import type {Ticket} from './types.ts';

export type CreateTicketRequest = {
  bankId: number;
  account: string;
  name: string;
};

export async function createTicket({
  bankId,
  account,
  name,
}: CreateTicketRequest): Promise<Ticket> {
  const {data, error} = await supabase
    .from('ticket')
    .upsert({
      bank_id: bankId,
      account_number: account,
      name: name,
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    return Promise.reject(error);
  }

  return data as Ticket;
}
