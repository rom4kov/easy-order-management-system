import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Invoice } from './invoice.entity';
import { Order } from 'src/orders/order.entity';
import { Customer } from 'src/customers/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Order, Customer])],
  providers: [InvoicesService],
  controllers: [InvoicesController],
  exports: [TypeOrmModule],
})
export class InvoicesModule {}
