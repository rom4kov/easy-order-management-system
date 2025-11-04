import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from 'src/orders/order.entity';
import { User } from 'src/users/user.entity';
import { Invoice } from 'src/invoices/invoice.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contactName: string;

  @Column()
  phone: number;

  @Column()
  email: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  zipcode: number;

  @Column()
  industry: string;

  @Column()
  type: string;

  @Column()
  firstOrderDate: Date;

  @Column()
  status: string;

  @Column({
    nullable: true,
  })
  notes: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];

  @ManyToOne(() => User, (user) => user.customers, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
