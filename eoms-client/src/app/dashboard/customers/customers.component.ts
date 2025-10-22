import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Customer } from '../../models/customer';
import { CustomersService } from './customers.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterLink],
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
  ];
  customers: Customer[] = [];

  constructor(private customerService: CustomersService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      console.log(customers);
      this.customers = customers;
    });
  }
}
