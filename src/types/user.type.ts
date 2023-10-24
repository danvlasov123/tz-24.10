export type TypeUsersTable = {
  count: number;
  next: string;
  previous: string;
  results: TypeUser[];
};

export type TypeUser = {
  id: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
};
