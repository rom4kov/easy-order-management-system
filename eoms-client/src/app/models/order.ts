import { Customer } from "./customer";

export interface Order {
  id: string;
  title: string;
  customer: Customer;
  items: string;
  invoice: string;
  orderDate: Date;
  dueDate: Date;
  status: 'angelegt' | 'in Bearbeitung' | 'abgeschlossen' | 'storniert';
  total: number;
  details: string;
}

export interface OrderToEdit {
  id: string;
  title: string;
  customerId: number;
  customerName: string;
  items: string;
  invoice: string;
  orderDate: Date;
  dueDate: Date;
  status: 'angelegt' | 'in Bearbeitung' | 'abgeschlossen' | 'storniert';
  total: number;
  details: string;
}

