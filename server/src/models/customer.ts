import { Order } from './order';
import { Invoice } from './invoice';

export interface Customer {
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
  invoices?: Invoice[];
  firstOrderDate: Date;
  status: string;
  notes: string;
  user: number;
}
