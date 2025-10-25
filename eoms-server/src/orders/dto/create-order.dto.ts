export class CreateOrderDto {
  title: string;
  customerId: number;
  items: string;
  orderDate: Date;
  dueDate: Date;
  status: 'angelegt' | 'in Bearbeitung' | 'abgeschlossen' | 'storniert';
  details: string;
}
