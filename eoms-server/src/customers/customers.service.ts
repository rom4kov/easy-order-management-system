import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, DeleteResult } from 'typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { customers } from '../customers';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async seedCustomers(): Promise<InsertResult> {
    return await this.customersRepository
      .createQueryBuilder()
      .insert()
      .into(Customer)
      .values(customers)
      .execute();
  }

  async getCustomers(query: string, page: number): Promise<Customer[] | []> {
    const result = await this.customersRepository
      .createQueryBuilder()
      .take(10)
      .skip(page * 10)
      .where('"Customer".name ilike :query', {
        query: `%${query}%`,
      })
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

  getCustomer(id: number): Promise<Customer | null> {
    return this.customersRepository.findOneBy({
      id: id,
    });
  }

  async addCustomer(customer: CreateCustomerDto): Promise<InsertResult> {
    console.log('service:', customer);
    const response = await this.customersRepository.insert(customer);
    console.log(response);
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
