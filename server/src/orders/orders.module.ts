import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { Customer } from 'src/customers/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Customer])],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [TypeOrmModule],
})
export class OrdersModule {}
