export type User = {
  id: number;
  name: string;
  email: string;
};

export type LoggedInUserPayload = {
  username: string;
  password: string;
};
