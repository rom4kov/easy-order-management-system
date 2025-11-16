import { Customer } from "../../../../models/customer";
import { Order } from "../../../../models/order";
import { EMPTY_CUSTOMER, EMPTY_ORDER } from "../../../../models/defaults";

export class InvoiceDto {
  id?: number;
  invoiceNumber: string = '';
  order: number = 0;
  customer?: number = 0;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  dueDate: Date = new Date();
  status: 'angelegt' | 'offen' | 'beglichen' | 'überfällig' | 'storniert' =
    'angelegt';
  items: string = '';
  total: number = 0;
  details?: string = '';
}
