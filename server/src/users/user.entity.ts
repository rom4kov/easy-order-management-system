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
    nullable: true,
  })
  phone: number;

  @Column({
    nullable: true,
  })
  website: string;

  @Column({
    nullable: true,
  })
  companyName: string;

  @Column({
    nullable: true,
  })
  street: string;

  @Column({
    nullable: true,
  })
  zipcode: number;

  @Column({
    nullable: true,
  })
  city: string;

  @OneToMany(() => Customer, (customer) => customer.user)
  customers: Customer[];

  @Column({
    nullable: true,
  })
  createdAt: Date;

  @Column({
    nullable: true,
  })
  details: string;
}
