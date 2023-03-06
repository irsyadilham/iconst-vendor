export type User = {
  id: number;
  name: string;
  contact_no: string;
  email: string;
}

export type Client = {
  id: number;
  user: User;
}