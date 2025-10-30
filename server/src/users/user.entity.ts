import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Customer } from 'src/customers/customer.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Customer, (customer) => customer.user)
  customers: Customer[];

  @Column()
  created_at: Date;

  @Column({
    nullable: true,
  })
  details: string;
}
