import { Customer } from './customer';
import { Order } from './order';

export interface Invoice {
  id: number;
  invoiceNumber: string;
  order: Order;
  customer: Customer;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  status: 'angelegt' | 'offen' | 'beglichen' | 'überfällig' | 'storniert';
  items: string;
  total: number;
  details?: string;
}

export interface InvoiceToEdit {
  invoiceNumber: string;
  order: Order;
  orderTitle: string;
  customer: Customer;
  customerName: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  status: 'angelegt' | 'offen' | 'beglichen' | 'überfällig' | 'storniert';
  items: string;
  total: number;
  details?: string;
}
