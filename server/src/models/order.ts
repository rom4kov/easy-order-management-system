export interface Order {
  title: string;
  customer: number;
  items: string;
  orderDate: Date;
  dueDate: Date;
  status: 'angelegt' | 'in Bearbeitung' | 'abgeschlossen' | 'storniert';
  details: string;
}
