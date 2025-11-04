import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../invoices.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Invoice } from '../../../models/invoice';
import { Order } from '../../../models/order';
import { OrdersService } from '../../orders/orders.service';
import { CustomersService } from '../../customers/customers.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-invoices-form',
  standalone: true,
  providers: [provideNativeDateAdapter(), InvoicesService],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatListModule,
    AngularSvgIconModule,
    RouterLink,
  ],
  templateUrl: './invoices-form.component.html',
  styleUrl: './invoices-form.component.css'
})
export class InvoicesFormComponent implements OnInit {
  errorMessage = '';

  invoiceForm: FormGroup = new FormGroup({});
  invoices: Invoice[] = [];
  orders: Order[] = [];
  newInvoice: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private invoicesService: InvoicesService,
    private ordersService: OrdersService,
    private customersService: CustomersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.invoiceForm = this.formBuilder.group({
      invoiceNumber: ['', Validators.required],
      customer: ['', Validators.required],
      order: ['', Validators.required],
      items: [[], Validators.required],
      dueDate: ['', Validators.required],
      total: ['', Validators.required],
      status: ['', Validators.required],
    })

    this.ordersService.getOrders('', -1, 0, 'id', 'ASC').subscribe(response => {
      this.orders = response.data;
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.newInvoice = false;
      this.invoicesService.getInvoice(id)?.subscribe((res) => {
        console.log(res.data);
        this.invoiceForm.patchValue(res.data);
      })
    }
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        const invoice: Invoice = this.invoiceForm.value;

        invoice.items = JSON.stringify(invoice.items);
        invoice.id = Number(id)

        const order = this.orders.find(
          (order) =>
            order.title === this.invoiceForm.get('order.title')?.value,
        );
        if (!order) return;
        invoice.customer = Number(order.customer.id);

        this.invoicesService
          .updateInvoice(this.invoiceForm.value)
          .subscribe((res) => {
            if (res) {
              this.router.navigate(['/dashboard/invoices']);
            }
          });
      } else {
        const invoice: Invoice = this.invoiceForm.value;

        invoice.items = JSON.stringify(invoice.items);

        const order = this.orders.find(
          (order) =>
            order.title === this.invoiceForm.get('order.title')?.value,
        );
        if (!order) return;
        invoice.customer = Number(order.customer.id);

        this.invoicesService.addInvoice(invoice).subscribe((res) => {
          if (res) {
            this.router.navigate(['/dashboard/invoices']);
          }
        });
      }
    }
  }

  addItem(event: KeyboardEvent) {
    console.log(event);
    const itemsInput = event.target as HTMLInputElement;
    if (event.key === 'Enter') {
      this.invoiceForm.value.items.push(itemsInput.value);
      this.invoiceForm.patchValue(this.invoiceForm.value);
      itemsInput.value = '';
    }
  }

  deleteItem(event: MouseEvent) {
    const deleteBtnSpan = event.target as HTMLButtonElement;
    const itemValue =
      deleteBtnSpan.parentElement?.parentElement?.firstElementChild?.innerHTML;
    const newItemsArray = this.invoiceForm.value.items.filter(
      (item: string) => item !== itemValue,
    );
    this.invoiceForm.value.items = newItemsArray;
    this.invoiceForm.patchValue(this.invoiceForm.value);
  }
}
