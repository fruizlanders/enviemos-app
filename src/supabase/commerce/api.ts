import {supabase} from '../client';
import type {Commerce, CreateCommerceRequest} from './types.ts';

export async function createCommerce({
  bank_id,
  account,
  code,
  account_type,
}: CreateCommerceRequest): Promise<Commerce> {
  const {data, error} = await supabase
    .from('commerce')
    .upsert({
      bank_id: bank_id,
      account_number: account,
      code: code,
      account_type: account_type,
    })
    .select()
    .single();

  if (error) {
    return Promise.reject(error);
  }

  return data as Commerce;
}

export async function bajaCommerce(id: number): Promise<Commerce> {
  const {data, error} = await supabase
    .from('commerce')
    .update({commerce_state_id: 4}) // Cambia el estado a 4
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return Promise.reject(error);
  }

  return data as Commerce;
}

export async function getCommerceById(id: string): Promise<Commerce | null> {
  const {data, error} = await supabase
    .from('commerce')
    .select('*, bank:bank_id(*), commerce_state:commerce_state_id(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching commerce by id:', error);
    return null;
  }

  return data as Commerce;
}

export async function updateCommerce({
  id,
  bank_id,
  account,
  code,
  commerce_state_id,
  account_type,
}: {
  id: string;
  bank_id: number;
  account: string;
  code: string;
  commerce_state_id?: number;
  account_type: number;
}): Promise<Commerce> {
  const updateData: {
    bank_id: number;
    account_number: string;
    code: string;
    commerce_state_id?: number;
    account_type: number;
  } = {
    bank_id: bank_id,
    account_number: account,
    code: code,
    account_type: account_type,
  };

  if (commerce_state_id !== undefined) {
    updateData.commerce_state_id = commerce_state_id; // Incluir commerce_state_id si está definido
  }

  const {data, error} = await supabase
    .from('commerce')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return Promise.reject(error);
  }

  return data as Commerce;
}
