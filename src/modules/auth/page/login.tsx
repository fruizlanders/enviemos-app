import './login.css';
import {Auth} from '@supabase/auth-ui-react';
import {ThemeSupa} from '@supabase/auth-ui-shared';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {logo} from '../../../assets';
import styles, {layout} from '../../../style.ts';
import {useSession} from '../../../supabase/auth';
import {supabase} from '../../../supabase/client';

export function LoginPage() {
  const {session} = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/bienvenida');
    }
  }, [navigate, session]);

  const spanishLocalization = {
    variables: {
      sign_in: {
        email_label: 'Correo Electrónico',
        password_label: 'Contraseña',
        button_label: 'Iniciar sesión',
        loading_button_label: 'Iniciando...',
        link_text: '¿Ya tienes cuenta? Inicia sesión',
        email_placeholder: 'Correo Electrónico',
        password_placeholder: 'Contraseña',
      },
      sign_up: {
        email_label: 'Correo Electrónico',
        password_label: 'Contraseña',
        button_label: 'Registrarse',
        loading_button_label: 'Registrando...',
        link_text: '¿No tienes cuenta? Regístrate',
        email_placeholder: 'Correo Electrónico',
        password_placeholder: 'Contraseña',
      },
      forgotten_password: {
        email_label: 'Correo Electrónico',
        button_label: 'Enviar enlace de restablecimiento',
        loading_button_label: 'Enviando...',
        link_text: '¿Olvidaste tu contraseña?',
      },
      update_password: {
        password_label: 'Nueva Contraseña',
        button_label: 'Actualizar Contraseña',
        loading_button_label: 'Actualizando...',
      },
    },
  };

  return (
    <div className="flex flex-col bg-primary justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto p-1">
        <div className="w-full text-center">
          <h2 className={`${styles.heading4} text-black mb-2`}>
            Ingresa a tu cuenta
          </h2>
        </div>
      </div>
      <br />
      <div
        className={`${layout.section} ${styles.flexCenter} bg-white rounded-lg shadow-lg px-8 py-6 max-w-md w-full`}
      >
        <div className="flex flex-col items-center">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#327F32',
                    brandAccent: '#FF4500',
                    inputBackground: '#FFFACD',
                    inputBorder: '#FFD700',
                    inputText: '#8B0000',
                  },
                },
              },
            }}
            providers={[]}
            localization={spanishLocalization}
          />
          <img src={logo} alt="hoobank" className="w-[300px] h-[86px]" />
        </div>
      </div>
    </div>
  );
}
