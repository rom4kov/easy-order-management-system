import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Customer } from 'src/customers/customer.entity';
import { Invoice } from 'src/invoices/invoice.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Customer, (customer) => customer.orders, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  items: string;

  @Column()
  orderDate: Date;

  @Column()
  dueDate: Date;

  @Column()
  status: 'angelegt' | 'in Bearbeitung' | 'abgeschlossen' | 'storniert';

  @OneToOne(() => Invoice, (invoice) => invoice.order)
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;

  @Column({
    nullable: true,
  })
  details: string;
}
