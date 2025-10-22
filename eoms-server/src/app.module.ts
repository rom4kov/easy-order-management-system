import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Customer } from './customers/customer.entity';

import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'eoms-user',
      password: '',
      database: 'eoms-db',
      entities: [Customer],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    CustomersModule,
  ],
  controllers: [AppController, CustomersController],
  providers: [AppService, CustomersService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
