import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Customer } from 'src/customers/customer.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({
    default: '1',
  })
  phone: number;

  @Column()
  website: string;

  @Column()
  companyName: string;

  @Column()
  street: string;

  @Column()
  zipcode: number;

  @Column()
  city: string;

  @OneToMany(() => Customer, (customer) => customer.user)
  customers: Customer[];

  @Column()
  createdAt: Date;

  @Column({
    nullable: true,
  })
  details: string;
}
