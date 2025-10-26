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
    'customer',
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
  deletedOrderId: number = -1;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.ordersService.getOrders("", 0).subscribe((response) => {
      const orders = response.data;
      orders.forEach((order) => {
        const ordersSanitized = order.items?.replace(/'/g, '"');
        if (ordersSanitized) {
          order.items = JSON.parse(ordersSanitized);
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
      const orders = response.data;
      orders.forEach((order) => {
        const ordersSanitized = order.items?.replace(/'/g, '"');
        if (ordersSanitized) {
          order.items = JSON.parse(ordersSanitized);
        }
      });
      this.orders = orders;
    });
  }

  deleteCustomer(id: number) {
    this.deletedOrderId = id;
    console.log("clicked on delete");
    this.ordersService.deleteOrder(id).subscribe(() => {
      this.ordersService.getOrders("", 0).subscribe((response) => {
        this.orders = response.data;
        this.getCount('');
      });
    })
  }

  getCount(query: string): void {
    this.ordersService.getNumOfOrders(query).subscribe((res => {
      this.numOfOrders = res.data;
    }))
  }

  getNextPage(event: PageEvent): void {
    console.log(event);
    this.ordersService.getOrders("", event.pageIndex).subscribe((response) => {
      const orders = response.data;
      orders.forEach((order) => {
        const ordersSanitized = order.items?.replace(/'/g, '"');
        if (ordersSanitized) {
          order.items = JSON.parse(ordersSanitized);
        }
      });
      this.orders = response.data;
    });
  }

  goToOrderView(id: number) {
    if (this.deletedOrderId !== id) {
      this.router.navigate(['/dashboard/orders/' + id]);
      this.deletedOrderId = -1;
    }
  }

}
