import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from 'src/orders/order.entity';

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

  @Column({
    nullable: true,
  })
  invoices: string;

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
}
