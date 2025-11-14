import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers/customers.service';
import { OrdersService } from '../orders/orders.service';
import { InvoicesService } from '../invoices/invoices.service';
import { MatCardModule } from '@angular/material/card';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Customer } from '../../models/customer';
import { Order } from '../../models/order';
import { Invoice } from '../../models/invoice';

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
  invoices: Invoice[] | null = [];
  customerCount: number = 0;
  orderCount: number = 0;
  invoiceCount: number = 0;
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
  invoiceData = {
    created: 0,
    pending: 0,
    overDue: 0,
    paid: 0,
    canceled: 0,
  };

  constructor(
    private customersService: CustomersService,
    private ordersService: OrdersService,
    private invoicesService: InvoicesService,
  ) {}

  ngOnInit(): void {
    this.customersService
      .getCustomers('', -1, 0, 'id', 'ASC')
      .subscribe((res) => {
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
    this.ordersService.getOrders('', -1, 0, 'id', 'ASC').subscribe((res) => {
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
    this.invoicesService.getInvoices('', -1, 0, 'id', 'ASC').subscribe((res) => {
      this.invoices = res.data;
      this.invoiceCount = this.invoices.length;
      for (const invoice of this.invoices) {
        switch (invoice.status) {
          case 'angelegt':
            this.invoiceData.created++;
            break;
          case 'offen':
            this.invoiceData.pending++;
            break;
          case 'überfällig':
            this.invoiceData.overDue++;
            break;
          case 'beglichen':
            this.invoiceData.paid++;
            break;
          case 'storniert':
            this.invoiceData.canceled++;
            break;
          default:
            break;
        }
      }
      console.log(this.invoiceCount);
    });
  }

  getAvgOrders() {
    return (this.orderCount / this.customerCount).toFixed(1);
  }
}
