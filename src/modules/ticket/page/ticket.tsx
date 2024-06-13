import './ticket.css';

import {type FormEvent, useState} from 'react';

import {useSession} from '../../../supabase/auth';
import {createTicket, useBanks, useTickets} from '../../../supabase/ticket';

export function TicketPage() {
  const {session} = useSession();
  const tickets = useTickets(session?.user.id);
  const banks = useBanks();

  const [bank, setBank] = useState<number>(1);
  const [account, setAccount] = useState<string>('');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    createTicket({
      bankId: bank,
      account,
    }).then((ticket) => {
      console.log('created', ticket);
      window.location.reload();
    });

    e.preventDefault();
  }

  return (
    <div className="main-wrap">
      <h3 style={{textAlign: 'center'}}>Create tickets</h3>

      <form onSubmit={onSubmit} className="ticket-form">
        <label htmlFor="bank">Bank</label>
        <select
          name="bank"
          onChange={(e) => setBank(parseInt(e.target.value, 10))}
          value={bank}
          required
        >
          {banks?.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="email">Account Number</label>
        <input
          type="text"
          name="account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          required
        />
        <br />
        <input type="submit" value="Create" />
      </form>

      <br />
      <br />
      <hr />
      <br />
      <h3>Past tickets</h3>
      <table className="tickets">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bank</th>
            <th>State</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tickets?.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.bank.name}</td>
              <td>{t.ticket_state.name}</td>
              <td>{new Date(t.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
