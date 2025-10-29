import { Order } from "./order";

export interface Customer {
  id: string;
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
}
