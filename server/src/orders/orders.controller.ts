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
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
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
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get('seed')
  seedOrders(): Promise<void> {
    return this.orderService.seedOrders();
  }

  @Get()
  getOrders(
    @Query('search') query: string,
    @Query('amount') amount: number,
    @Query('page') page: number,
    @Query('orderBy') orderBy: string,
    @Query('orderMode') orderMode: 'ASC' | 'DESC',
  ): Promise<Order[]> {
    return this.orderService.getOrders(query, amount, page, orderBy, orderMode);
  }

  @Get('count')
  getCount(@Query() query: Query): Promise<number> {
    return this.orderService.getNumOfOrders(query.search);
  }

  @Get(':id')
  getOrder(@Param() params: Params): Promise<Order | null> {
    return this.orderService.getOrder(Number(params.id));
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async addOrder(@Body() createOrderDto: Order): Promise<InsertResult> {
    const response = await this.orderService.addOrder(createOrderDto);
    console.log('response:', response);
    return response;
  }

  @Put()
  async updateOrder(@Body() createOrderDto: Order): Promise<Order | null> {
    const response = await this.orderService.updateOrder(createOrderDto);
    return response;
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<DeleteResult> {
    const response = await this.orderService.deleteOrder(Number(id));
    return response;
  }
}
