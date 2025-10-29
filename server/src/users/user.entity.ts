import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Customer } from 'src/customers/customer.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(() => Customer, (customer) => customer.user)
  customers: Customer[];

  @Column()
  items: string;

  @Column({
    nullable: true,
  })
  details: string;
}
