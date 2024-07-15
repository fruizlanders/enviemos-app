export type Commerce = {
  id: string;
  code: string;
  user_id: string;
  account_number: string;
  bank_id: number;
  bank: Bank;
  commerce_state_id: number;
  commerce_state: CommerceState;
  created_at: string;
  account_type: number;
};

export type Bank = {
  id: number;
  name: string;
};

export type CommerceState = {
  id: number;
  name: string;
};

export type CreateCommerceRequest = {
  bank_id: number;
  account: string;
  code: string;
  account_type: number;
};
