import './summary.css';

import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons'; // Added faInfoCircle icon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useNavigate} from 'react-router-dom';
import {footerLinks} from '../../../constants';

import styles from '../../../style.ts';
import {useSession} from '../../../supabase/auth';
import {bajaCommerce, useCommerces} from '../../../supabase/commerce';
import {useNavbar} from '../../navbar/components/NavbarContext.tsx';

function formatAccountNumber(accountNumber: string, bankId: number): string {
  switch (bankId) {
    case 1:
      return `${accountNumber.slice(0, 3)}-${accountNumber.slice(3, 10)}-${accountNumber.slice(10, 11)}-${accountNumber.slice(11)}`;
    case 2:
      return `${accountNumber.slice(0, 4)}-${accountNumber.slice(4, 8)}-${accountNumber.slice(8)}`;
    case 3:
      return `${accountNumber.slice(0, 3)}-${accountNumber.slice(3)}`;
    default:
      return accountNumber;
  }
}

export function SummaryPage() {
  const {session} = useSession();
  const commerces = useCommerces(session?.user.id);
  const {setToggle} = useNavbar();
  const navigate = useNavigate();

  const deleteReq = async (id: number) => {
    try {
      const updatedCommerce = await bajaCommerce(id);
      console.log(`Estado del comercio actualizado: ${updatedCommerce}`);
    } catch (error) {
      console.error('Error al actualizar el estado del comercio:', error);
    }
  };

  const handleInputFocus = () => {
    setToggle(false); // Cierra la barra de navegación cuando se enfoca cualquier input
  };

  return (
    <div
      className={`justify-center items-center${styles.paddingY} min-h-screen bg-primary`}
      onClick={handleInputFocus}
    >
      <div className={`${styles.boxWidth} ${styles.flexCenter}`}>
        <div className="w-full max-w-screen-lg">
          <h3 className="text-center text-white text-2xl font-bold mb-4">
            Códigos creados
          </h3>

          {commerces?.length === 0 ? (
            <div className="text-white text-center mb-4">
              <p className="text-lg">
                Aún no tienes códigos de pago. Para poder recibir envíos
                mediante la app del banco primero debes crear un código, indicar
                la cuenta a la que quieres que llegue, esperar a que se active y
                listo, podrás empezar a hacer operaciones.
              </p>
            </div>
          ) : (
            <div className="text-white text-center mb-4">
              <p className="text-lg">
                Ahora cuentas con código de pago para recibir envíos mediante la
                app del banco.
                <br /> Confirma que tengas el código en estado activo y ya
                puedes empezar a realizar operaciones.
              </p>
              <p className="text-lg">
                Si tienes dudas, puedes escribirnos al 983383977. Aquí un{' '}
                <a
                  href={footerLinks[0].links[0].link}
                  className="text-blue-500 underline"
                >
                  link al manual
                </a>
                .
              </p>
            </div>
          )}

          {/* Table for larger screens */}
          <div className="hidden sm:block max-w-screen-lg mx-auto">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="py-3 px-6 text-left">Nombre</th>
                    <th className="py-3 px-6 text-left">Banco</th>
                    <th className="py-3 px-6 text-left">Número de cuenta</th>
                    <th className="py-3 px-6 text-left">Estado del código</th>
                    <th className="py-3 px-6 text-left">Configuración</th>
                  </tr>
                </thead>
                <tbody>
                  {commerces?.map((t) => (
                    <tr
                      key={t.id}
                      className="bg-gray-800 border-b border-gray-700"
                    >
                      <td className="py-3 px-6">{t.code}</td>
                      <td className="py-3 px-6">{t.bank?.name}</td>
                      <td className="py-3 px-6">
                        {formatAccountNumber(t.account_number, t.bank?.id)}
                      </td>
                      <td className="py-3 px-6">{t.commerce_state?.name}</td>
                      <td className="py-3 px-6">
                        {t.commerce_state_id !== 4 &&
                          t.commerce_state_id !== 5 && (
                            <div className="flex">
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="cursor-pointer text-blue-500 mr-2"
                                onClick={() => navigate(`/edit/${t.id}`)} // Redirigir a la página de edición
                              />
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="cursor-pointer text-red-500"
                                onClick={() => deleteReq(Number(t.id))}
                              />
                            </div>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards for small screens */}
          <div className="block sm:hidden">
            {commerces?.map((t) => (
              <div
                key={t.id}
                className="bg-gray-800 text-white rounded-lg shadow-md mb-4 p-4 max-w-xs mx-auto"
              >
                <div className="mb-2">
                  <span className="font-bold">Nombre: </span>
                  {t.code}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Banco: </span>
                  {t.bank?.name}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Número de cuenta: </span>
                  {formatAccountNumber(t.account_number, t.bank?.id)}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Estado del código: </span>
                  {t.commerce_state?.name}
                </div>
                <div className="mb-2 flex justify-end">
                  {t.commerce_state_id !== 4 && t.commerce_state_id !== 5 && (
                    <div className="flex">
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="cursor-pointer text-blue-500 mr-2"
                        onClick={() => navigate(`/edit/${t.id}`)} // Redirigir a la página de edición
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="cursor-pointer text-red-500"
                        onClick={() => deleteReq(Number(t.id))}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Create and Back buttons */}
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/commerce')}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Crear código
            </button>
            <button
              type="button"
              onClick={() => navigate('/bienvenida')}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
