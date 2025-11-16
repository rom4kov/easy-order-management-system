import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { User } from './users/user.entity';
import { Customer } from './customers/customer.entity';
import { Order } from './orders/order.entity';
import { Invoice } from './invoices/invoice.entity';

import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { CustomersModule } from './customers/customers.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { InvoicesController } from './invoices/invoices.controller';
import { InvoicesService } from './invoices/invoices.service';
import { InvoicesModule } from './invoices/invoices.module';
import { UploadModule } from './upload/upload.module';
import { UploadService } from './upload/upload.service';
import { UploadController } from './upload/upload.controller';

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
      password: process.env.NODE_ENV === 'development' ? '' : 'eoms_db',
      database: process.env.NODE_ENV === 'development' ? 'eoms-db' : 'eoms_db',
      entities: [User, Customer, Order, Invoice],
      synchronize: true,
      logging: ['error', 'query'],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false,
      },
    }),
    CustomersModule,
    OrdersModule,
    InvoicesModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [
    AppController,
    CustomersController,
    OrdersController,
    InvoicesController,
    UploadController,
  ],
  providers: [
    AppService,
    CustomersService,
    OrdersService,
    InvoicesService,
    UploadService,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
