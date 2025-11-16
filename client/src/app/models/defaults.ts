import { Order } from './order';
import type { Customer } from './customer';
import type { Invoice } from './invoice';
import { User } from './user';

class InvoiceClass {
  id: number = 0;
  invoiceNumber: string = '';
  order: Order = EMPTY_ORDER;
  customer: Customer = EMPTY_CUSTOMER;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  dueDate: Date = new Date();
  status: 'angelegt' | 'offen' | 'beglichen' | 'überfällig' | 'storniert' = 'angelegt';
  items: string = '';
  total: number = 0;
}

export const EMPTY_CUSTOMER: Customer = {
  id: '',
  name: '',
  contactName: '',
  phone: 0,
  email: '',
  street: '',
  zipcode: 0,
  city: '',
  imgFilePath: '',
  industry: '',
  type: '',
  firstOrderDate: new Date(),
  status: '',
  notes: '',
};

export const EMPTY_ORDER: Order = {
  id: '',
  title: '',
  customer: EMPTY_CUSTOMER,
  orderDate: new Date(),
  dueDate: new Date(),
  status: 'angelegt',
  items: '',
  invoice: new InvoiceClass(),
  total: 0,
  details: '',
};

export const EMPTY_INVOICE: Invoice = {
  id: 0,
  invoiceNumber: '',
  order: EMPTY_ORDER,
  customer: EMPTY_CUSTOMER,
  createdAt: new Date(),
  updatedAt: new Date(),
  dueDate: new Date(),
  status: 'angelegt',
  items: '[]',
  total: 0,
};

export const EMPTY_USER: User = {
  id: 0,
  username: '',
  email: '',
  phone: 111,
  website: '',
  companyName: '',
  street: '',
  zipcode: 111,
  city: '',
  createdAt: new Date(),
  details: '',
};

