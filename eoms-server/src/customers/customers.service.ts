import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult } from 'typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { customers } from '../customers';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async seedCustomers(): Promise<InsertResult> {
    // const customersJSON: string = JSON.stringify(customers);
    // const customersArray: Customer[] = JSON.parse(customersJSON);

    return await this.customersRepository
      .createQueryBuilder()
      .insert()
      .into(Customer)
      .values(customers)
      .execute();
  }

  getCustomers(): Promise<Customer[] | []> {
    return this.customersRepository.find();
  }

  addCustomer(customer: Customer): Promise<InsertResult> {
    return this.customersRepository.insert(customer);
  }
}
