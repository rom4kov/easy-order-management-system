import { Order } from "./order";
import { User } from "./user";

export interface Customer {
  id: number;
  name: string;
  contactName: string;
  phone: number;
  email: string;
  street: string;
  city: string;
  zipcode: number;
  industry: string;
  type: string;
  orders?: Order[];
  invoices?: string;
  firstOrderDate: Date;
  status: string;
  notes: string;
  user: User;
}
