import { Customer } from 'src/customers/customer.entity';

export class CreateOrderDto {
  title: string;
  customer: Customer;
  items: string;
  orderDate: Date;
  dueDate: Date;
  status: 'angelegt' | 'in Bearbeitung' | 'abgeschlossen' | 'storniert';
  details: string;
}
