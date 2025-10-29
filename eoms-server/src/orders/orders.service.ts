import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { InsertResult, DeleteResult } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { orders } from 'src/seed/orders';
// import { Customer } from 'src/customers/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async seedOrders(): Promise<InsertResult> {
    return await this.ordersRepository
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values(orders)
      .execute();
  }

  async getOrders(query: string, page: number): Promise<Order[] | []> {
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
      .take(10)
      .skip(page * 10)
      .getMany();
    console.log('result:', result);
    return result;
  }

  async getNumOfOrders(query: string): Promise<number> {
    const result = await this.ordersRepository
      .createQueryBuilder()
      .where('"Order".title ilike :query', {
        query: `%${query}%`,
      })
      .getCount();
    console.log(result);
    return result;
  }

  async getOrder(id: number): Promise<Order | null> {
    const result = await this.ordersRepository.findOneBy({
      id: id,
    });
    console.log('getOrder result: ', result);
    return result;
  }

  async addOrder(order: CreateOrderDto): Promise<InsertResult> {
    const response = await this.ordersRepository.insert(order);
    console.log(response);
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
