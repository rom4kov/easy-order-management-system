export interface Order {
  id: string;
  title: string;
  date: Date;
  status: 'offen' | 'in Bearbeitung' | 'abgeschlossen' | 'storniert';
  total: number;
}
