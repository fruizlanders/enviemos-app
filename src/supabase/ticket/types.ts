export type Ticket = {
  id: string;
  user_id: string;
  bank_id: number;
  bank: Bank;
  account_number: string;
  ticket_state_id: number;
  ticket_state: TicketState;
  created_at: string;
  name: string;
};

export type Bank = {
  id: number;
  name: string;
};

export type TicketState = {
  id: number;
  name: string;
};
