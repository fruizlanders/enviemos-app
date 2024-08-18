import {supabase} from '../client';
import type {Profile} from './types.ts';

export async function sendPasswordResetEmail(email: string): Promise<void> {
  const {error} = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://enviemos.pe/reset', // URL de redirección después del restablecimiento
  });

  if (error) {
    return Promise.reject(error);
  }
}

export async function resetPassword(newPassword: string) {
  const {error: updateError} = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) throw updateError;
}

export type SaveProfileRequest = {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  cellphone: string;
  email: string;
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
  dni,
  cellphone,
  email,
}: SaveProfileRequest): Promise<Profile> {
  const {data, error} = await supabase
    .from('user_data')
    .upsert({
      id,
      first_name: firstName,
      last_name: lastName,
      dni,
      cellphone,
      email,
    })
    .select()
    .single();

  if (error) {
    return Promise.reject(error);
  }

  return data as Profile;
}
