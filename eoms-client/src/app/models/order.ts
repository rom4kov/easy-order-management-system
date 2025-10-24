export interface Order {
  id: string;
  title: string;
  items: string;
  invoice: string;
  orderDate: Date;
  dueDate: Date;
  status: 'offen' | 'in Bearbeitung' | 'abgeschlossen' | 'storniert';
  total: number;
  details: string;
}
