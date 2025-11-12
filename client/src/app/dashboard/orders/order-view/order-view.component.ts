import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../orders.service';
import { InvoicesService } from '../../invoices/invoices.service';
import { Order } from '../../../models/order';
import { InvoiceDto } from '../../invoices/invoice-pdf/dto/invoice.dto';
import { EMPTY_ORDER } from '../../../models/defaults';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css',
})
export class OrderViewComponent implements OnInit {
  order: Order = {
    ...EMPTY_ORDER,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private invoicesService: InvoicesService,
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.ordersService.getOrder(id)?.subscribe((res) => {
        const itemsSanitized = res.data.items?.replace(/'/g, '"');
        if (itemsSanitized) {
          res.data.items = JSON.parse(itemsSanitized);
        }
        this.order = res.data;
        console.log(this.order);
      });
    }
  }

  createInvoice(): void {
    const items = JSON.stringify(Array.from(Object.values(this.order.items)));
    console.log(items);
    this.invoicesService.getNumOfInvoices('').subscribe((res) => {
      const numOfinvoices = res.data;
      const currDate = new Date();
      const currYear = currDate.getFullYear();
      const dueDate = new Date(
        currDate.setDate(currDate.getDate() + 30)
      );
      console.log(dueDate);
      const invoice: InvoiceDto = {
        invoiceNumber: `RE-${currYear}-${(numOfinvoices + 1).toString().padStart(3, '0')}`,
        order: Number(this.order.id),
        customer: Number(this.order.customer.id),
        createdAt: new Date(),
        updatedAt: new Date(),
        dueDate: dueDate,
        status: 'angelegt',
        items: items,
        total: 10000,
      };
      this.invoicesService.addInvoice(invoice).subscribe((_) => {
        this.ordersService.getOrder(this.order.id)?.subscribe((res) => {
          const itemsSanitized = res.data.items?.replace(/'/g, '"');
          if (itemsSanitized) {
            res.data.items = JSON.parse(itemsSanitized);
          }
          this.order = res.data;
        });
      });
    });
  }
}
