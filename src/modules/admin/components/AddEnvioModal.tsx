import {useState} from 'react';

import {supabase} from '../../../supabase/client';
import {useAllCommerces, useBanks} from './../../../supabase/adminHooks.tsx';

const AddEnvioModal = ({onClose}: {onClose: () => void}) => {
  const commerces = useAllCommerces();
  const banks = useBanks();
  const [selectedCommerce, setSelectedCommerce] = useState('');
  const [amount, setAmount] = useState('');
  const [fee, setFee] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [date, setDate] = useState('');
  const [operationNumber, setOperationNumber] = useState('');
  const [boletaFile, setBoletaFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setBoletaFile(files[0]);
    }
  };

  const handleAddEnvio = async () => {
    let boletaFileName = null;

    if (boletaFile) {
      const fileName = `${boletaFile.name}`; // Create a unique file name

      const {error: uploadError} = await supabase.storage
        .from('boletas')
        .upload(`${fileName}`, boletaFile);

      if (uploadError) {
        console.error('Error uploading boleta:', uploadError);
        return;
      }

      boletaFileName = fileName;
    }
    const newEnvio = {
      commerce_id: selectedCommerce,
      amount: parseFloat(amount),
      fee: parseFloat(fee),
      origin_bank_id: selectedBank,
      date,
      envio_state_id: 1,
      operation_number: operationNumber,
      boleta: boletaFileName,
    };

    const {error} = await supabase.from('envio').insert([newEnvio]);

    if (error) {
      console.error('Error adding envio:', error);
    } else {
      onClose(); // Close the modal after adding
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Agregar Nuevo Envío</h2>

        {/* Commerce Combobox */}
        <div className="mb-4">
          <label className="block text-gray-700">Comercio</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedCommerce}
            onChange={(e) => setSelectedCommerce(e.target.value)}
          >
            <option value="">Selecciona un Comercio</option>
            {commerces?.map((commerce) => (
              <option key={commerce.id} value={commerce.id}>
                {commerce.code}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Monto</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Fee Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Comisión</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
        </div>

        {/* Bank Combobox */}
        <div className="mb-4">
          <label className="block text-gray-700">Banco de Origen</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            <option value="">Selecciona un Banco</option>
            {banks?.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de Envío</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Operation Number Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Número de Operación</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={operationNumber}
            onChange={(e) => setOperationNumber(e.target.value)}
          />
        </div>
        {/* Boleta File Upload */}
        <div className="mb-4">
          <label className="block text-gray-700">Boleta (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            className="w-full p-2 border rounded"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
            onClick={handleAddEnvio}
          >
            Guardar
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEnvioModal;
