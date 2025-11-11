import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { InsertResult, DeleteResult } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { orders } from 'src/seed/orders';
import { Customer } from 'src/customers/customer.entity';
// import { Customer } from 'src/customers/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Order)
    private customersRepository: Repository<Customer>,
  ) {}

  async seedOrders(): Promise<void> {
    for (const o of orders) {
      if (o instanceof Order) {
        const customer = await this.customersRepository.findOneBy({
          id: o.customer,
        });

        if (!customer) continue;

        const order = this.ordersRepository.create({
          ...o,
          customer,
        });

        await this.ordersRepository.save(order);
      }
    }
  }

  async getOrders(
    query: string,
    amount: number,
    page: number,
    orderBy: string,
    orderMode: 'ASC' | 'DESC',
  ): Promise<Order[] | []> {
    const result = await this.ordersRepository
      .createQueryBuilder('Order')
      .leftJoin('Order.customer', 'Customer')
      .select([
        'Order.id',
        'Order.title',
        'Order.items',
        'Order.orderDate',
        'Order.dueDate',
        'Order.status',
        'Customer.id',
        'Customer.name',
      ])
      .where('Order.title ilike :query', {
        query: `%${query}%`,
      })
      .take(amount >= 0 ? amount : undefined)
      .skip(page * 10)
      .orderBy(
        `${orderBy === 'customer.name' ? 'Customer.name' : `Order.${orderBy}`}`,
        orderMode,
      )
      .getMany();
    return result;
  }

  async getNumOfOrders(query: string): Promise<number> {
    const result = await this.ordersRepository
      .createQueryBuilder()
      .where('"Order".title ilike :query', {
        query: `%${query}%`,
      })
      .getCount();
    return result;
  }

  async getOrder(id: number): Promise<Order | null> {
    // const result = await this.ordersRepository.findOneBy({
    //   id: id,
    // });
    const result = await this.ordersRepository
      .createQueryBuilder('Order')
      .leftJoinAndSelect('Order.invoice', 'Invoice')
      .leftJoinAndSelect('Order.customer', 'Customer')
      .where('Order.id = :id', {
        id: `${id}`,
      })
      .getOne();
    return result;
  }

  async addOrder(order: CreateOrderDto): Promise<InsertResult> {
    const response = await this.ordersRepository.insert(order);
    return response;
  }

  async updateOrder(order: Order): Promise<Order | null> {
    const orderToUpdate = await this.ordersRepository.findOneBy({
      id: Number(order.id),
    });
    if (orderToUpdate) {
      orderToUpdate.id = Number(order.id);
      orderToUpdate.title = order.title;
      orderToUpdate.customer = order.customer;
      orderToUpdate.items = order.items;
      orderToUpdate.orderDate = order.orderDate;
      orderToUpdate.dueDate = order.dueDate;
      orderToUpdate.status = order.status;
      orderToUpdate.details = order.details;
      return await this.ordersRepository.save(orderToUpdate);
    }
    return null;
  }

  async deleteOrder(id: number): Promise<DeleteResult> {
    const response = await this.ordersRepository.delete(id);
    return response;
  }
}
