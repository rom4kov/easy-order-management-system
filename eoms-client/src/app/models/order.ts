export interface Order {
  id: string;
  title: string;
  items: string;
  invoice: string;
  date: Date;
  status: 'offen' | 'in Bearbeitung' | 'abgeschlossen' | 'storniert';
  total: number;
  details: string;
}
