import { Order } from './order';
import { Customer } from './customer';
import { Invoice } from './invoice';

export const EMPTY_CUSTOMER: Customer = {
  id: '',
  name: '',
  contactName: '',
  phone: 0,
  email: '',
  street: '',
  zipcode: 0,
  city: '',
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
  invoice: '',
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
