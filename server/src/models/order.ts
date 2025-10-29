export interface Order {
  id: number;
  title: string;
  customer: number;
  items: string;
  orderDate: Date;
  dueDate: Date;
  status: 'offen' | 'in Bearbeitung' | 'abgeschlossen' | 'storniert';
  details: string;
}
