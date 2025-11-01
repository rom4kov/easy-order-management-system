import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers/customers.service';
import { OrdersService } from '../orders/orders.service';
import { MatCardModule } from '@angular/material/card';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Customer } from '../../models/customer';
import { Order } from '../../models/order';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [MatCardModule, AngularSvgIconModule],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.css',
})
export class DashboardOverviewComponent implements OnInit {
  customers: Customer[] | null = [];
  orders: Order[] | null = [];
  customerCount: number = 0;
  orderCount: number = 0;
  customerData = {
    active: 0,
    inactive: 0,
  };
  orderData = {
    completed: 0,
    created: 0,
    inProgress: 0,
    canceled: 0,
  };

  constructor(
    private customersService: CustomersService,
    private orderssService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.customersService.getCustomers('', -1, 0).subscribe((res) => {
      this.customers = res.data;
      this.customerCount = this.customers.length;
      for (const customer of this.customers) {
        if (customer.status === 'aktiv') {
          this.customerData.active++;
        } else {
          this.customerData.inactive++;
        }
      }
    });
    this.orderssService.getOrders('', -1, 0).subscribe((res) => {
      this.orders = res.data;
      this.orderCount = this.orders.length;
      for (const order of this.orders) {
        switch (order.status) {
          case 'angelegt':
            this.orderData.created++;
            break;
          case 'in Bearbeitung':
            this.orderData.inProgress++;
            break;
          case 'abgeschlossen':
            this.orderData.completed++;
            break;
          case 'storniert':
            this.orderData.canceled++;
            break;
          default:
            break;
        }
      }
      console.log(this.orderCount);
    });
  }

  getAvgOrders() {
    return (this.orderCount / this.customerCount).toFixed(1);
  }
}
