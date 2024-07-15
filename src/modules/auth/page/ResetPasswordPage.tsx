import React, {useState} from 'react';
import {supabase} from '../../../supabase/client';
import {useNavigate, useLocation} from 'react-router-dom';
import styles, {layout} from '../../../style.ts';

export function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener el token de la URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleResetPassword = async (event) => {
    event.preventDefault();

    const {error} = await supabase.auth.updateUser({
      token,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert('Contraseña restablecida exitosamente');
      navigate('/login'); // redirigir a la página de inicio de sesión
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
              type="password"
              id="password"
              placeholder="Ingresa tu nueva contraseña"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
