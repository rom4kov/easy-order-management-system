import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer';
import { CustomersService } from './customers.service';
import { RouterLink, Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule} from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    FormsModule,
    MatPaginatorModule,
    AngularSvgIconModule,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'contactName',
    'phone',
    'email',
    'orders',
    'status',
    'edit',
    'delete',
  ];
  customers: Customer[] = [];
  numOfCustomers: number = 0;

  constructor(
    private customerService: CustomersService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers("", 0).subscribe((response) => {
      const customers = response.data;
      customers.forEach((customer) => {
        const ordersSanitized = customer.orders?.replace(/'/g, '"');
        if (ordersSanitized) {
          customer.orders = JSON.parse(ordersSanitized);
        }
      });
      this.customers = customers;
      this.getCount('');
    });
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;

    this.getCount(searchTerm);

    this.customerService.getCustomers(searchTerm, 0).subscribe((response) => {
      const customers = response.data;
      customers.forEach((customer) => {
        const ordersSanitized = customer.orders?.replace(/'/g, '"');
        if (ordersSanitized) {
          customer.orders = JSON.parse(ordersSanitized);
        }
      });
      this.customers = customers;
    });
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(res => {
      console.log(res);
      this.customerService.getCustomers("", 0).subscribe((response) => {
        console.log(response);
        const customers = response.data;
        customers.forEach((customer) => {
          const ordersSanitized = customer.orders?.replace(/'/g, '"');
          if (ordersSanitized) {
            customer.orders = JSON.parse(ordersSanitized);
          }
        });
        this.customers = customers;
        this.getCount('');
      });
    })
  }

  getCount(query: string): void {
    this.customerService.getNumOfCustomers(query).subscribe((res => {
      this.numOfCustomers = res.data;
    }))
  }

  getNextPage(event: PageEvent): void {
    console.log(event);
    this.customerService.getCustomers("", event.pageIndex).subscribe((response) => {
      const customers = response.data;
      customers.forEach((customer) => {
        const ordersSanitized = customer.orders?.replace(/'/g, '"');
        if (ordersSanitized) {
          customer.orders = JSON.parse(ordersSanitized);
        }
      });
      this.customers = customers;
    });
  }

  goToCustomerView(id: number) {
    this.router.navigate(['/dashboard/customers/' + id]);
  }
}
