// @ts-ignore
import {supabase} from './supabaseClient';

async function signUp(email: never, password: never) {
  const {user, error} = await supabase.auth.signUp(
    {
      email: email,
      password: password,
    },
    {
      redirectTo: 'https://your-site.com/confirm-signup', // Ensure this is the correct URL
    }
  );

  if (error) {
    console.error('Error signing up:', error.message);
    return;
  }

  console.log('User signed up:', user);
}

export default signUp;
