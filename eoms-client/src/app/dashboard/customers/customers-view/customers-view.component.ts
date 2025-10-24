import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../customers.service';
import { Customer } from '../../../models/customer';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customers-view',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, DatePipe],
  templateUrl: './customers-view.component.html',
  styleUrl: './customers-view.component.css'
})
export class CustomersViewComponent implements OnInit {
  customer: Customer = {
    id: "",
    name: "",
    contactName: "",
    phone: 0,
    email: "",
    street: "",
    zipcode: 0,
    city: "",
    industry: "",
    type: "",
    firstOrderDate: new Date(),
    status: "",
    notes: "",
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomersService
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.customerService.getCustomer(id)?.subscribe(res => {
        const ordersSanitized = res.data.orders?.replace(/'/g, '"');
        if (ordersSanitized) {
          res.data.orders = JSON.parse(ordersSanitized);
        }
        const invoicesSanitized = res.data.invoices?.replace(/'/g, '"');
        if (invoicesSanitized) {
          res.data.invoices = JSON.parse(invoicesSanitized);
        }
        this.customer = res.data;
      });
    }
  }

}
