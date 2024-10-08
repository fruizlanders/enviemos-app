export type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  dni: string;
  cellphone: string;
  email: string;
};

export type Admin = {
  id: string;
  profile: Profile;
};
