import './login.css';

import {Auth} from '@supabase/auth-ui-react';
import {ThemeSupa} from '@supabase/auth-ui-shared';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {useSession} from '../../../supabase/auth';
import {supabase} from '../../../supabase/client';

export function LoginPage() {
  const {session} = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [navigate, session]);

  return (
    <div className="main-wrap login-wrap">
      <Auth
        supabaseClient={supabase}
        appearance={{theme: ThemeSupa}}
        providers={[]}
      />
    </div>
  );
}
