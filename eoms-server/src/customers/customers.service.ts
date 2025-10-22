import { Injectable } from '@nestjs/common';
import { Customer } from 'src/models/customer';
import { customers } from '../customers';

@Injectable()
export class CustomersService {
  getCustomers(): Customer[] {
    return customers;
  }
}
