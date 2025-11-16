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
