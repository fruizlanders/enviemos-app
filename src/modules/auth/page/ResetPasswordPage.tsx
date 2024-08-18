import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useSession} from '../../../supabase/auth'; // Asegúrate de que la ruta sea correcta

import styles, {layout} from '../../../style.ts';
import {resetPassword} from '../../../supabase/auth';

export function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {session} = useSession();

  // Obtain the token from the URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!token) {
      setError('Token no válido');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      if (error) {
        setError('Token de verificación inválido o expirado');
        return;
      }
      await resetPassword(password);
      alert('Contraseña restablecida exitosamente');
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      setError((error as Error).message);
    }

    if (!session) {
      return <p>Loading...</p>;
    }
  };

  return (
    <div className="flex flex-col bg-primary justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto p-1">
        <div className="w-full text-center">
          <h2 className={`${styles.heading4} text-black mb-2`}>
            Restablecer Contraseña
          </h2>
        </div>
      </div>
      <br />
      <div
        className={`${layout.section} ${styles.flexCenter} bg-white rounded-lg shadow-lg px-8 py-6 max-w-md w-full`}
      >
        <form onSubmit={handleResetPassword} className="w-full">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Nueva Contraseña
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Ingresa tu nueva contraseña"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirmar Nueva Contraseña
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirm-password"
              placeholder="Confirma tu nueva contraseña"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <span className="ml-2">Mostrar Contraseñas</span>
            </label>
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Restablecer Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
