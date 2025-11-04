import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from 'src/orders/order.entity';
import { Customer } from 'src/customers/customer.entity';

@Entity({ name: 'invoice' })
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invoiceNumber: string;

  @OneToOne(() => Order, (order) => order.invoice, { eager: true })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Customer, (customer) => customer.invoices)
  customer: Customer;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  dueDate: Date;

  @Column()
  status: 'angelegt' | 'offen' | 'beglichen' | 'überfällig' | 'storniert';

  @Column()
  items: string;

  @Column()
  total: number;
}
