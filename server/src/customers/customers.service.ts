import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, DeleteResult } from 'typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async seedCustomers(): Promise<void> {
    // console.log('seeding');
    // try {
    //   const result = await this.customersRepository
    //     .createQueryBuilder()
    //     .insert()
    //     .into(Customer)
    //     .values(customers)
    //     .execute();
    //
    //   console.log('✅ Seeding successful:', result);
    //   return result;
    // } catch (error: unknown) {
    //   if (error instanceof Error) {
    //     console.error('❌ Error during seeding:', error.message);
    //     console.error(error.stack);
    //     throw new Error(`Seeding failed: ${error.message}`);
    //   } else {
    //     console.error('❌ Unknown error during seeding:', error);
    //     throw new Error('Seeding failed: Unknown error');
    //   }
    // }
  }

  async getCustomers(
    query: string,
    amount: number,
    page: number,
    orderBy: string,
    orderMode: 'ASC' | 'DESC',
  ): Promise<Customer[] | []> {
    const result = await this.customersRepository
      .createQueryBuilder('Customer')
      .leftJoinAndSelect('Customer.orders', 'Order')
      .where('"Customer".name ilike :query', {
        query: `%${query}%`,
      })
      .take(amount >= 0 ? amount : undefined)
      .skip(page * 10)
      .orderBy(`Customer.${orderBy}`, orderMode)
      .getMany();
    return result;
  }

  async getNumOfCustomers(query: string): Promise<number> {
    const result = await this.customersRepository
      .createQueryBuilder()
      .where('"Customer".name ilike :query', {
        query: `%${query}%`,
      })
      .getCount();
    return result;
  }

  async getCustomer(id: number): Promise<Customer | null> {
    const result = await this.customersRepository
      .createQueryBuilder('Customer')
      .leftJoinAndSelect('Customer.orders', 'Order')
      .where('"Customer".id = :id', {
        id: `${id}`,
      })
      .getOne();
    return result;
  }

  async addCustomer(customer: Customer): Promise<InsertResult> {
    const response = await this.customersRepository.insert(customer);
    return response;
  }

  async updateCustomer(customer: Customer): Promise<Customer | null> {
    const customerToUpdate = await this.customersRepository.findOneBy({
      id: Number(customer.id),
    });
    if (customerToUpdate) {
      customerToUpdate.id = Number(customer.id);
      customerToUpdate.name = customer.name;
      customerToUpdate.contactName = customer.contactName;
      customerToUpdate.phone = customer.phone;
      customerToUpdate.email = customer.email;
      customerToUpdate.street = customer.street;
      customerToUpdate.zipcode = customer.zipcode;
      customerToUpdate.city = customer.city;
      customerToUpdate.industry = customer.industry;
      customerToUpdate.type = customer.type;
      customerToUpdate.firstOrderDate = customer.firstOrderDate;
      customerToUpdate.status = customer.status;
      return await this.customersRepository.save(customerToUpdate);
    }
    return null;
  }

  async deleteCustomer(id: number): Promise<DeleteResult> {
    const response = await this.customersRepository.delete(id);
    return response;
  }
}
