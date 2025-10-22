import { Controller, Get, Post, Body } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';
import { InsertResult } from 'typeorm';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Get('seed')
  seedCustomers(): Promise<InsertResult> {
    return this.customerService.seedCustomers();
  }

  @Get()
  getCustomers(): Promise<Customer[]> {
    return this.customerService.getCustomers();
  }

  @Post()
  addCustomer(@Body() customer: Customer): Promise<InsertResult> {
    // console.log(customer);
    return this.customerService.addCustomer(customer);
  }
}
