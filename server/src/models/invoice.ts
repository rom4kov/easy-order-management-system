export interface Invoice {
  invoiceNumber: string;
  order: number;
  customer: number;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  status: 'angelegt' | 'offen' | 'beglichen' | 'überfällig' | 'storniert';
  items: string;
  total: number;
}
