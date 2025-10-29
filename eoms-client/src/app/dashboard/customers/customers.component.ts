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
  deletedCustomerId: number = -1;

  constructor(
    private customerService: CustomersService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers("", 10, 0).subscribe((response) => {
      this.customers = response.data;
      console.log(this.customers[0].orders)
      this.getCount('');
    });
  }

  applyFilter(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;

    this.getCount(searchTerm);

    this.customerService.getCustomers(searchTerm, 10, 0).subscribe((response) => {
      this.customers = response.data;
    });
  }

  deleteCustomer(id: number) {
    this.deletedCustomerId = id;
    console.log("clicked on delete");
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.customerService.getCustomers("", 10, 0).subscribe((response) => {
        this.customers = response.data;
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
    this.customerService.getCustomers("", 10, event.pageIndex).subscribe((response) => {
      this.customers = response.data;
    });
  }

  goToCustomerView(id: number) {
    if (this.deletedCustomerId !== id) {
      this.router.navigate(['/dashboard/customers/' + id]);
      this.deletedCustomerId = -1;
    }
  }
}
