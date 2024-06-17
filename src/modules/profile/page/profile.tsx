import './profile.css';

import type {FormEvent} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';

import {saveProfile, useProfile, useSession} from '../../../supabase/auth';

export function ProfilePage() {
  const {session} = useSession();
  const profile = useProfile(session?.user.id);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dni, setDNI] = useState<string>('');
  const [cellphone, setCellphone] = useState<string>('');

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setDNI(profile.dni || '');
      setCellphone(profile.cellphone || '');
    }
  }, [profile]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    if (session) {
      saveProfile({
        id: session?.user.id,
        firstName,
        lastName,
        dni: dni || '',
        cellphone: cellphone || '',
      }).then((profile) => {
        console.log('saved', profile);
      });
    }

    e.preventDefault();
  }

  return (
    <div className="main-wrap">
      <h3 style={{textAlign: 'center'}}>Profile</h3>
      <form onSubmit={onSubmit} className="profile-form">
        <label htmlFor="email">Correo</label>
        <input
          type="text"
          name="email"
          value={session?.user.email ?? '-'}
          disabled
          readOnly
        />
        <br />
        <label htmlFor="firstName">Nombres</label>
        <input
          type="text"
          name="firstName"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <label htmlFor="lastName">Apellidos</label>
        <input
          type="text"
          name="lastName"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <label htmlFor="dni">DNI</label>
        <input
          type="text"
          name="dni"
          required
          value={dni}
          onChange={(e) => setDNI(e.target.value)}
        />
        <br />
        <label htmlFor="cellphone">Celular</label>
        <input
          type="text"
          name="cellphone"
          required
          value={cellphone}
          onChange={(e) => setCellphone(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}
