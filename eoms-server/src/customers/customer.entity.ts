import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  orders: string;

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
}
