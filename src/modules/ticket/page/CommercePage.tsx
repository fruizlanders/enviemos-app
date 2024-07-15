import './commerce.css';
import {useNavbar} from '../../navbar/components/NavbarContext.tsx';
import {type FormEvent, useState} from 'react';
import styles from '../../../style.ts';
import {createCommerce, useBanks} from '../../../supabase/commerce';

export function CommercePage() {
  const banks = useBanks();
  const {setToggle} = useNavbar();

  const [bank, setBank] = useState<number>(1);
  const [account, setAccount] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [accountType, setAccountType] = useState<number>(1);
  const [validationMsg, setValidationMsg] = useState<{[key: string]: string}>(
    {}
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [createdCode, setCreatedCode] = useState<string>('');
  const [createdTime, setCreatedTime] = useState<string>('');

  const handleInputFocus = () => {
    setToggle(false); // Close the navbar when input is focused
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setToggle(false); // Close the navbar when typing

    switch (e.target.name) {
      case 'bank':
        setBank(parseInt(e.target.value, 10));
        validateAccount(account, parseInt(e.target.value, 10));
        break;
      case 'account':
        setAccount(e.target.value);
        validateAccount(e.target.value, bank);
        break;
      case 'code':
        setCode(e.target.value);
        break;
      case 'accountType':
        setAccountType(parseInt(e.target.value, 10));
        break;
    }
  };

  const validateAccount = (value: string, bankId: number) => {
    if (bankId === 4) {
      setValidationMsg((prev) => ({
        ...prev,
        account: '',
      }));
      return;
    }

    const bankLengths: {[key: string]: RegExp} = {
      '1': /^[0-9]{13,14}$/,
      '2': /^[0-9]{18}$/,
      '3': /^[0-9]{13}$/,
    };

    const isValid = bankLengths[bankId.toString()]?.test(value) || false;
    const msg = 'Ingrese número de cuenta correctamente';

    setValidationMsg((prev) => ({
      ...prev,
      account: isValid ? '' : msg,
    }));
  };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validationMsg.account && bank !== 4) {
      return;
    }
    createCommerce({
      bank_id: bank,
      account,
      code,
      account_type: accountType,
    })
      .then((commerce) => {
        console.log('created', commerce);
        setCreatedCode(code);
        setCreatedTime(new Date().toLocaleString());
        setShowModal(true);
      })
      .catch((error) => {
        console.error('Error creating commerce:', error);
      });
  }

  const closeModal = () => {
    setShowModal(false);
    window.location.href = '/summary';
  };

  return (
    <div
      className={`${styles.flexCenter} ${styles.paddingX} ${styles.paddingY} min-h-screen bg-primary`}
    >
      <div
        className={`${styles.boxWidth} ${styles.padding1} rounded-xl shadow-md`}
      >
        <h3 className={`${styles.heading3} text-center mb-8`}>Crear código</h3>

        <form onSubmit={onSubmit} className="commerce-form mx-auto">
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-white"
            >
              Código
            </label>
            <input
              type="text"
              name="code"
              value={code}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-700 text-white font-normal focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="account"
              className="block text-sm font-medium text-white"
            >
              Número de cuenta
            </label>
            <input
              type="text"
              name="account"
              value={account}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-700 text-white font-normal focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
            />
            {validationMsg.account && bank !== 4 && (
              <p className="text-red-500 text-xs mt-1">
                {validationMsg.account}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="accountType"
              className="block text-sm font-medium text-white"
            >
              Tipo de Cuenta
            </label>
            <select
              name="accountType"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              value={accountType}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-700 text-white font-normal focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
            >
              <option value={1}>Cuenta de Ahorros</option>
              <option value={2}>Cuenta Corriente</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="bank"
              className="block text-sm font-medium text-white"
            >
              Banco
            </label>
            <select
              name="bank"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              value={bank}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-700 text-white font-normal focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
            >
              {banks?.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Crear
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = '/summary')}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          </div>
        </form>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-lg font-bold mb-4">Código creado</h2>
              <p>Código: {createdCode}</p>
              <p>Hora de creación: {createdTime}</p>
              <p>Número de cuenta: {account}</p>
              <button
                onClick={closeModal}
                className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
