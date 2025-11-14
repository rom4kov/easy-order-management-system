import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';
import { InsertResult, DeleteResult } from 'typeorm';
import { ApiCreatedResponse } from '@nestjs/swagger';
import TransformInterceptor from 'src/interceptors/transform.interceptor';

interface Params {
  id?: number;
  query?: string;
}

interface Query {
  search: string;
}

@UseInterceptors(TransformInterceptor)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  // @Get('seed')
  // seedCustomers(): Promise<InsertResult> {
  //   console.log('seeding (controller)');
  //   return this.customerService.seedCustomers();
  // }

  @Get()
  getCustomers(
    @Query('search') query: string,
    @Query('amount') amount: number,
    @Query('page') page: number,
    @Query('orderBy') orderBy: string,
    @Query('orderMode') orderMode: 'ASC' | 'DESC',
  ): Promise<Customer[]> {
    return this.customerService.getCustomers(
      query,
      amount,
      page,
      orderBy,
      orderMode,
    );
  }

  @Get('count')
  getCount(@Query() query: Query): Promise<number> {
    return this.customerService.getNumOfCustomers(query.search);
  }

  @Get(':id')
  getCustomer(@Param() params: Params): Promise<Customer | null> {
    return this.customerService.getCustomer(Number(params.id));
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async addCustomer(
    @Body() createCustomerDto: Customer,
  ): Promise<InsertResult> {
    console.log('customer:', createCustomerDto);
    const response = await this.customerService.addCustomer(createCustomerDto);
    return response;
  }

  @Put()
  async updateCustomer(
    @Body() createCustomerDto: Customer,
  ): Promise<Customer | null> {
    const response =
      await this.customerService.updateCustomer(createCustomerDto);
    return response;
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string): Promise<DeleteResult> {
    const response = await this.customerService.deleteCustomer(Number(id));
    return response;
  }
}
