import React from 'react';
import {useEnvios} from '../../../supabase/envio';
import {useNavbar} from '../../navbar/components/NavbarContext.tsx';
import {FaFilePdf} from 'react-icons/fa'; // Import the PDF icon from react-icons
import styles from '../../../style.ts'; // Make sure to import your styles

const EnvioPage: React.FC = () => {
  const envios = useEnvios();
  const {setToggle} = useNavbar();
  const handleInputFocus = () => {
    setToggle(false); // Close the navbar when input is focused
  };
  const supabaseUrl =
    'https://tdkewnuvozexjoeiuefo.supabase.co/storage/v1/object/public/boletas'; // Replace with your Supabase URL and bucket name

  return (
    <div className={`${styles.paddingY} min-h-screen bg-primary`}>
      <div
        onClick={handleInputFocus}
        onFocus={handleInputFocus}
        className={`${styles.boxWidth} ${styles.flexCenter}`}
      >
        <div className="w-full max-w-screen-lg">
          <h1 className="text-3xl font-bold mb-4 text-center text-white">
            Lista de Envíos
          </h1>

          {/* Table for larger screens */}
          <div className="hidden sm:block max-w-screen-lg mx-auto">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="py-3 px-6 text-left">Comercio</th>
                    <th className="py-3 px-6 text-left">Monto</th>
                    <th className="py-3 px-6 text-left">Comisión</th>
                    <th className="py-3 px-6 text-left">Banco de Origen</th>
                    <th className="py-3 px-6 text-left">Fecha de Envío</th>
                    <th className="py-3 px-6 text-left">Estado</th>
                    <th className="py-3 px-6 text-left">Número de Operación</th>
                    <th className="py-3 px-6 text-left">Boleta</th>
                  </tr>
                </thead>
                <tbody>
                  {envios?.map((envio) => (
                    <tr
                      key={envio.id}
                      className="bg-gray-800 border-b border-gray-700"
                    >
                      <td className="py-3 px-6">{envio.commerce.code}</td>
                      <td className="py-3 px-6">S/{envio.amount}</td>
                      <td className="py-3 px-6">S/{envio.fee}</td>
                      <td className="py-3 px-6">{envio.origin_bank.name}</td>
                      <td className="py-3 px-6">{envio.date}</td>
                      <td className="py-3 px-6">{envio.envio_state.name}</td>
                      <td className="py-3 px-6">{envio.operation_number}</td>
                      <td className="py-3 px-6">
                        {envio.boleta ? (
                          <a
                            href={`${supabaseUrl}/${envio.boleta}`}
                            download={envio.boleta} // Especifica el nombre del archivo para la descarga
                          >
                            <FaFilePdf className="text-red-500" />
                          </a>
                        ) : (
                          'N/A'
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
            {envios?.map((envio) => (
              <div
                key={envio.id}
                className="bg-gray-800 text-white rounded-lg shadow-md mb-4 p-4 max-w-xs mx-auto"
              >
                <div className="mb-2">
                  <span className="font-bold">Comercio: </span>
                  {envio.commerce.code}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Monto: </span>S/{envio.amount}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Comisión: </span>S/{envio.fee}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Banco de Origen: </span>
                  {envio.origin_bank.name}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Fecha de Envío: </span>
                  {envio.date}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Estado: </span>
                  {envio.envio_state.name}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Número de Operación: </span>
                  {envio.operation_number}
                </div>
                <div className="mb-2 text-center">
                  {envio.boleta ? (
                    <a
                      href={`${supabaseUrl}/${envio.boleta}`}
                      download={`${envio.boleta}.pdf`} // Forzar la extensión del archivo
                    >
                      <FaFilePdf className="text-red-500" />
                    </a>
                  ) : (
                    'N/A'
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => (window.location.href = '/bienvenida')}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvioPage;
