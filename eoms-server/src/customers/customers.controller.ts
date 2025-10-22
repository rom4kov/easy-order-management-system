import { Controller, Get } from '@nestjs/common';
import { Customer } from 'src/models/customer';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Get()
  getCustomers(): Customer[] {
    return this.customerService.getCustomers();
  }
}
