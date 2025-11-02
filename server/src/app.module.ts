import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from './users/user.entity';
import { Customer } from './customers/customer.entity';
import { Order } from './orders/order.entity';

import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { CustomersModule } from './customers/customers.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'eoms_db',
      database: 'eoms_db',
      entities: [User, Customer, Order],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    CustomersModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController, CustomersController, OrdersController],
  providers: [AppService, CustomersService, OrdersService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
