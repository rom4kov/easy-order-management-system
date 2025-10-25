import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Order } from '../../models/order';
import { OrdersService } from './orders.service';
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
  selector: 'app-orders',
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
    DatePipe,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'items',
    'order_date',
    'due_date',
    'status',
    'total',
    'edit',
    'delete',
  ];
  orders: Order[] = [];
  numOfOrders: number = 0;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.ordersService.getOrders("", 0).subscribe((response) => {
      const orders = response.data;
      orders.forEach((customer) => {
        const ordersSanitized = customer.items?.replace(/'/g, '"');
        if (ordersSanitized) {
          customer.items = JSON.parse(ordersSanitized);
        }
      });
      this.orders = orders;
      this.getCount('');
    });
  }

  applyFilter(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;

    this.getCount(searchTerm);

    this.ordersService.getOrders(searchTerm, 0).subscribe((response) => {
      const customers = response.data;
      customers.forEach((customer) => {
        const ordersSanitized = customer.items?.replace(/'/g, '"');
        if (ordersSanitized) {
          customer.items = JSON.parse(ordersSanitized);
        }
      });
      this.orders = customers;
    });
  }

  getCount(query: string): void {
    this.ordersService.getNumOfOrders(query).subscribe((res => {
      this.numOfOrders = res.data;
    }))
  }

}
