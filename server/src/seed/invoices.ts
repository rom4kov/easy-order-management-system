import { Invoice } from 'src/models/invoice';

export const invoices: Invoice[] = [
  {
    invoiceNumber: '1',
    order: 15,
    customer: 1,
    createdAt: new Date('2025-11-10'),
    updatedAt: new Date('2025-11-10'),
    dueDate: new Date(),
    status: 'angelegt',
    items: '[]',
    total: 8000,
  },
  {
    invoiceNumber: '2',
    order: 17,
    customer: 1,
    createdAt: new Date('2025-11-10'),
    updatedAt: new Date('2025-11-10'),
    dueDate: new Date(),
    status: 'angelegt',
    items: '[]',
    total: 13000,
  },
  {
    invoiceNumber: '3',
    order: 22,
    customer: 1,
    createdAt: new Date('2025-11-10'),
    updatedAt: new Date('2025-11-10'),
    dueDate: new Date(),
    status: 'beglichen',
    items: '[]',
    total: 11500,
  },
];
