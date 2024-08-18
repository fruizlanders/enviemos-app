import './profile.css';

import type {FormEvent} from 'react';
import React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import styles from '../../../style.ts';
import { saveProfile, SaveProfileRequest, useProfile, useSession } from "../../../supabase/auth";
import {useNavbar} from '../../navbar/components/NavbarContext.tsx';

export function ProfilePage() {
  const {session} = useSession();
  const profile = useProfile(session?.user.id);
  const {setToggle} = useNavbar();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dni, setDNI] = useState<string>('');
  const [cellphone, setCellphone] = useState<string>('');
  const [validationMsg, setValidationMsg] = useState<{
    dni: string;
    cellphone: string;
  }>({dni: '', cellphone: ''});
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleInputChange =
    (
      setter: React.Dispatch<React.SetStateAction<string>>,
      validator?: (value: string) => void
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setToggle(false); // Cierra el navbar cuando se escribe
      setter(e.target.value);
      if (validator) validator(e.target.value);
    };

  const handleInputFocus = () => {
    setToggle(false); // Cierra el navbar cuando se enfoca un input
  };

  const validateDni = (value: string) => {
    setValidationMsg((prev) => ({
      ...prev,
      dni: /^[0-9]{8}$/.test(value) ? '' : 'El DNI debe tener 8 dígitos',
    }));
  };

  const validateCellphone = (value: string) => {
    setValidationMsg((prev) => ({
      ...prev,
      cellphone: /^[0-9]{9}$/.test(value)
        ? ''
        : 'El celular debe tener 9 dígitos',
    }));
  };

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setDNI(profile.dni || '');
      setCellphone(profile.cellphone || '');
    }
  }, [profile]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (session) {
      await saveProfile({
        id: session?.user.id,
        email: session?.user.email,
        firstName,
        lastName,
        dni: dni || '',
        cellphone: cellphone || '',
      } as SaveProfileRequest);
      setShowModal(true);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/bienvenida');
    setToggle(false);
  };

  return (
    <div className="main-wrap" >
      <div className={`${styles.flexCenter} ${styles.padding1}`}>
        <div className={`${styles.padding1} w-full sm:w-2/3 md:w-1/2 lg:w-1/3`}>
          <h3 className="text-center text-white text-2xl font-bold mb-4">
            Actualizar datos personales
          </h3>
          <form onSubmit={onSubmit} className="profile-form mx-auto">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Correo
              </label>
              <input
                type="text"
                name="email"
                value={session?.user.email ?? '-'}
                disabled
                readOnly
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-700 text-white font-normal focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-white"
              >
                Nombres
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={firstName}
                onChange={handleInputChange(setFirstName)}
                onFocus={handleInputFocus}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-700 text-white font-normal focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
              />
              <p className="text-gray-400 text-xs mt-1">Ej. Carlos Enrique</p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-white"
              >
                Apellidos
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={lastName}
                onChange={handleInputChange(setLastName)}
                onFocus={handleInputFocus}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-700 text-white font-normal focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
              />
              <p className="text-gray-400 text-xs mt-1">
                Ej. Alvarez Fernandez
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="dni"
                className="block text-sm font-medium text-white"
              >
                DNI
              </label>
              <input
                type="text"
                name="dni"
                required
                value={dni}
                onChange={handleInputChange(setDNI, validateDni)}
                onFocus={handleInputFocus}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-700 text-white font-normal focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
              />
              {validationMsg.dni && (
                <p className="text-red-500 text-xs mt-1">{validationMsg.dni}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="cellphone"
                className="block text-sm font-medium text-white"
              >
                Celular
              </label>
              <input
                type="text"
                name="cellphone"
                required
                value={cellphone}
                onChange={handleInputChange(setCellphone, validateCellphone)}
                onFocus={handleInputFocus}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-700 text-white font-normal focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
              />
              {validationMsg.cellphone && (
                <p className="text-red-500 text-xs mt-1">
                  {validationMsg.cellphone}
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Guardar
              </button>
              <button
                type="button"
                className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate('/bienvenida')}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Éxito</h2>
            <p>Cambio se realizó correctamente</p>
            <button
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
