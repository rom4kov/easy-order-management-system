export class CreateOrderDto {
  title: string;
  customerId: number;
  items: string;
  orderDate: Date;
  dueDate: Date;
  status: 'offen' | 'in Bearbeitung' | 'abgeschlossen' | 'storniert';
  details: string;
}
