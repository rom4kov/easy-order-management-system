import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  customerId: number;

  @Column()
  items: string;

  @Column()
  orderDate: Date;

  @Column()
  dueDate: Date;

  @Column()
  status: 'offen' | 'in Bearbeitung' | 'abgeschlossen' | 'storniert';

  @Column({
    nullable: true,
  })
  details: string;
}
