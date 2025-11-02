import { Customer } from "./customer";

export type User = {
  id: number;
  username: string;
  email: string;
  password?: string;
  customers?: Customer[];
  createdAt: Date;
  details?: string;
}
