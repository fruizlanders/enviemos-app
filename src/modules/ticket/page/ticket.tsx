import './ticket.css';

import {useSession} from '../../../supabase/auth';
import {useTickets} from '../../../supabase/ticket';

export function TicketPage() {
  const {session} = useSession();
  const tickets = useTickets(session?.user.id);

  return (
    <div className="main-wrap">
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
            <tr>
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
