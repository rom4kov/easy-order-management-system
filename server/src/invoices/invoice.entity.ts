import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Order } from 'src/orders/order.entity';

@Entity({ name: 'invoice' })
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invoiceNumber: string;
}
