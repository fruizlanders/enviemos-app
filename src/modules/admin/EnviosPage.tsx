import {useState} from 'react';
import {FaFilePdf} from 'react-icons/fa';

import {useEnvios} from './../../supabase/adminHooks.tsx';
import AddEnvioModal from './components/AddEnvioModal'; // Import the modal component
import styles from './../../../src/style.ts'; // Assuming you're using a CSS module
const supabaseUrl =
  'https://tdkewnuvozexjoeiuefo.supabase.co/storage/v1/object/public/boletas'; // Replace with your Supabase URL and bucket name

export const EnviosPage = () => {
  const envios = useEnvios();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`${styles.paddingY} min-h-screen bg-primary`}>
      <div className={`${styles.boxWidth} ${styles.flexCenter}`}>
        <div className="w-full max-w-screen-lg">
          <h1 className="text-3xl font-bold mb-4 text-center text-white">
            Lista de Envíos
          </h1>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
            onClick={() => setIsModalOpen(true)}
          >
            Agregar Envío
          </button>
          <div className="hidden sm:block max-w-screen-lg mx-auto">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-700">
                    {/* Table headers */}
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
                            download={envio.boleta}
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
        </div>
      </div>
      {isModalOpen && <AddEnvioModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default EnviosPage;
