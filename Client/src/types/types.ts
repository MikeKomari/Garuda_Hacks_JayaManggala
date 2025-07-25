export type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  hearts: number;
  streak: number;
  age: number;
  username: string;
};

export type LoggedInUserPayload = {
  username: string;
  password: string;
};

export type RegisterUserPayload = {
  name: string;
  email: string;
  password: string;
  age: number;
  username: string;
};
