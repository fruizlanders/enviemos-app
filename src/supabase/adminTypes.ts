// src/commerce.ts
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
export type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  dni: string;
  cellphone: string;
  email: string;
};
export type Envio = {
  id: string;
  commerce_id: number;
  commerce: Commerce;
  amount: number;
  fee: number;
  origin_bank_id: number;
  origin_bank: Bank;
  date: string;
  envio_state_id: number;
  envio_state: EnvioState;
  operation_number: number;
  boleta: string;
};

export type EnvioState = {
  id: number;
  name: string;
};

export type CreateEnvioRequest = {
  id: number;
};
