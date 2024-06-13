import {supabase} from '../client';
import type {Profile} from './types.ts';

export type SaveProfileRequest = {
  id: string;
  firstName: string;
  lastName: string;
};

export async function signOut() {
  const {error} = await supabase.auth.signOut();

  if (error) {
    return Promise.reject(error);
  }
}

export async function saveProfile({
  id,
  firstName,
  lastName,
}: SaveProfileRequest): Promise<Profile> {
  const {data, error} = await supabase
    .from('user_data')
    .upsert({id, first_name: firstName, last_name: lastName})
    .select()
    .single();

  if (error) {
    return Promise.reject(error);
  }

  return data as Profile;
}
