import './commerce.css';

import type {FormEvent} from 'react';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import styles from '../../../style.ts';
import {getCommerceById, updateCommerce} from '../../../supabase/commerce';
import {useBanks} from '../../../supabase/commerce/hooks.tsx';
import {useNavbar} from '../../navbar/components/NavbarContext.tsx';

type Commerce = {
  id: string;
  bank_id: number;
  account: string;
  code: string;
  account_type: number;
  state_id: number;
};

export function EditCommerceForm() {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const banks = useBanks();
  const {setToggle} = useNavbar();
  const [commerce, setCommerce] = useState<Commerce | null>(null);
  const [bank, setBank] = useState<number | null>(null);
  const [account, setAccount] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [accountType, setAccountType] = useState<number | null>(null); // Añadir estado para accountType
  const [validationMsg, setValidationMsg] = useState<{[key: string]: string}>(
    {}
  );

  useEffect(() => {
    if (id) {
      getCommerceById(id).then((data) => {
        // @ts-ignore
        setCommerce(data);
        // @ts-ignore
        setBank(data.bank_id);
        // @ts-ignore
        setAccount(data?.account_number);
        // @ts-ignore
        setCode(data.code);
        // @ts-ignore
        setAccountType(data.account_type);
      });
    }
  }, [id]);

  const handleInputFocus = () => {
    setToggle(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setToggle(false);

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
      case 'accountType': // Añadir manejador para accountType
        setAccountType(parseInt(e.target.value, 10));
        break;
    }
  };

  const validateAccount = (value: string, bank_id: number | null) => {
    const bankLengths: {[key: string]: RegExp} = {
      '1': /^[0-9]{13,14}$/,
      '2': /^[0-9]{18}$/,
      '3': /^[0-9]{13}$/,
    };

    const isValid = bank_id
      ? bankLengths[bank_id.toString()]?.test(value) || false
      : false;
    const msg = 'Ingrese número de cuenta correctamente';

    setValidationMsg((prev) => ({
      ...prev,
      account: isValid ? '' : msg,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validationMsg.account) {
      return;
    }

    if (bank === null || accountType === null) {
      console.error('Bank or account type cannot be null');
      return;
    }

    updateCommerce({
      id: commerce?.id || '',
      bank_id: bank,
      account,
      code,
      account_type: accountType, // Pasar accountType a updateCommerce
      commerce_state_id: 2, // Asignar state_id a 2 al actualizar el commerce
    })
      .then((updatedCommerce) => {
        console.log('updated', updatedCommerce);
        setCommerce((prevCommerce) => {
          if (!prevCommerce) return null;
          return {
            ...prevCommerce,
            state_id: 2, // Actualizar el estado id del commerce a 2
          };
        });
        navigate('/summary'); // Navegar a /summary después de la actualización exitosa
      })
      .catch((error) => {
        console.error('Error updating commerce:', error);
      });
  };

  const handleCancel = () => {
    navigate('/summary');
  };

  if (!commerce) return <div>Loading...</div>;

  return (
    <div
      className={`${styles.flexCenter} ${styles.paddingX} ${styles.paddingY} min-h-screen bg-primary`}
    >
      <div
        className={`${styles.boxWidth} ${styles.padding1} rounded-xl shadow-md`}
      >
        <h3 className={`${styles.heading3} text-center mb-8`}>Editar código</h3>

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
            {validationMsg.account && (
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
              value={accountType ?? ''}
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
              value={bank ?? ''}
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
              className="w-5/12 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-5/12 bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
