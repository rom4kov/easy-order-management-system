import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, AsyncPipe } from '@angular/common';
import { Order } from '../../models/order';
import { OrdersService } from './orders.service';
import { LoadingService } from '../../loading/loading.service';
import { RouterLink, Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClickStopPropagationDirective } from '../../directives/click-stop-propagation.directive';

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
    MatSelectModule,
    MatChipsModule,
    FormsModule,
    MatPaginatorModule,
    AngularSvgIconModule,
    DatePipe,
    AsyncPipe,
    ClickStopPropagationDirective,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'customer',
    'items',
    'order_date',
    'due_date',
    'remaining_days',
    'status',
    'edit',
    'delete',
  ];
  orders: Order[] = [];
  numOfOrders: number = 0;
  deletedOrderId: number = -1;
  today: Date = new Date();
  loading$ = this.loadingService.loading$;
  searchTerm: string = '';
  filterBy: string = 'id';
  filterMode: 'ASC' | 'DESC' = 'DESC';

  constructor(
    private ordersService: OrdersService,
    private loadingService: LoadingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    try {
      this.loadingService.loadingOn();
      console.log("order component frontend");
      this.ordersService
        .getOrders('', 10, 0, this.filterBy, this.filterMode)
        .subscribe((response) => {
          const orders = response.data;
          orders.forEach((order) => {
            const ordersSanitized = order.items?.replace(/'/g, '"');
            if (ordersSanitized) {
              order.items = JSON.parse(ordersSanitized);
            }
          });
          this.orders = orders;
          console.log(orders);
          this.getCount('');
        });
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.loadingOff();
    }
  }

  applySearchFilter(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;

    this.getCount(this.searchTerm);

    this.ordersService
      .getOrders(this.searchTerm, 10, 0, this.filterBy, this.filterMode)
      .subscribe((response) => {
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

  applySortFilter(value: string): void {
    this.filterBy = value;

    this.getCount(this.searchTerm);

    this.ordersService
      .getOrders(this.searchTerm, 10, 0, this.filterBy, this.filterMode)
      .subscribe((response) => {
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

  applySortFilterMode(value: 'ASC' | 'DESC'): void {
    this.filterMode = value;

    this.getCount(this.searchTerm);

    this.ordersService
      .getOrders(this.searchTerm, 10, 0, this.filterBy, this.filterMode)
      .subscribe((response) => {
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

  deleteOrder(id: number) {
    this.deletedOrderId = id;
    console.log('clicked on delete');
    this.ordersService.deleteOrder(id).subscribe(() => {
      this.ordersService
        .getOrders('', 10, 0, this.filterBy, this.filterMode)
        .subscribe((response) => {
          this.orders = response.data;
          this.getCount('');
        });
    });
  }

  getCount(query: string): void {
    this.ordersService.getNumOfOrders(query).subscribe((res) => {
      this.numOfOrders = res.data;
    });
  }

  getNextPage(event: PageEvent): void {
    console.log(event);
    this.ordersService
      .getOrders('', 10, event.pageIndex, this.filterBy, this.filterMode)
      .subscribe((response) => {
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

  getDiffDays(sDate: Date, eDate: Date) {
    var startDate = new Date(sDate);
    var endDate = new Date(eDate);

    var Time = endDate.getTime() - startDate.getTime();
    return Math.ceil(Time / (1000 * 3600 * 24));
  }
}
