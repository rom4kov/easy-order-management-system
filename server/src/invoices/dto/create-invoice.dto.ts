export class CreateInvoiceDto {
  invoiceNumber: string;
  order: number;
  customer: number;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  items: string;
  status: 'angelegt' | 'offen' | 'beglichen' | 'überfällig' | 'storniert';
  total: number;
}
