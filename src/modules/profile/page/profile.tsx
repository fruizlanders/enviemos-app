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

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
    }
  }, [profile]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    if (session) {
      saveProfile({
        id: session?.user.id,
        firstName,
        lastName,
      }).then((profile) => {
        console.log('saved', profile);
      });
    }

    e.preventDefault();
  }

  return (
    <div className="main-wrap">
      <form onSubmit={onSubmit} className="profile-form">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={session?.user.email ?? '-'}
          disabled
          readOnly
        />
        <br />
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}
