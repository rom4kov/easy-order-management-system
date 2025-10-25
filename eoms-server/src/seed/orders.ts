import { Order } from 'src/orders/order.entity';

export const orders: Order[] = [
  {
    id: 1,
    title: 'Cloud Umgebung',
    customerId: 40,
    items: '["Lieferung Hardware", "Installation", "Konfiguration", "Testen"]',
    orderDate: new Date('2025-10-10'),
    dueDate: new Date('2025-11-10'),
    status: 'in Bearbeitung',
    details: '',
  },
  {
    id: 2,
    title: 'ERP-System',
    customerId: 38,
    items:
      '["Planung", "Entwicklung", "Installation vor Ort", "Konfiguration", "Testen"]',
    orderDate: new Date('2025-10-18'),
    dueDate: new Date('2025-11-12'),
    status: 'in Bearbeitung',
    details: '',
  },
  {
    id: 3,
    title: 'Server-Backup',
    customerId: 89,
    items:
      '["Planung", "Entwicklung", "Installation vor Ort", "Konfiguration", "Testen"]',
    orderDate: new Date('2025-10-29'),
    dueDate: new Date('2025-11-19'),
    status: 'angelegt',
    details: '',
  },
];
