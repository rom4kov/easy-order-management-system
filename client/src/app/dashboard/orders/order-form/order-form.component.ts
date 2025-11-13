import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
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
import { Order, OrderToEdit } from '../../../models/order';
import { Customer } from '../../../models/customer';
import { CustomersService } from '../../customers/customers.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-order-form',
  standalone: true,
  providers: [provideNativeDateAdapter(), OrdersService],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatListModule,
    AngularSvgIconModule,
    RouterLink,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent implements OnInit {
  errorMessage = '';

  orderForm: FormGroup = new FormGroup({});
  customers: Customer[] = [];
  newOrder: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private customersService: CustomersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      title: ['', Validators.required],
      customerId: [0],
      customerName: ['', Validators.required],
      orderDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      items: [[], Validators.required],
      status: ['', Validators.required],
      details: [''],
    });

    this.customersService.getCustomers('', -1, 0, 'id', 'ASC').subscribe((response) => {
      this.customers = response.data;
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.newOrder = false;
      this.ordersService.getOrder(id)?.subscribe((res) => {
        console.log(res.data);
        const orderToEdit: OrderToEdit =
          this.ordersService.transformOrderToEdit(res.data);
        console.log("orderToEdit:", orderToEdit);
        const ordersSanitized = orderToEdit.items?.replace(/'/g, '"');
        if (ordersSanitized) {
          orderToEdit.items = JSON.parse(ordersSanitized);
        }
        console.log(id);
        this.orderForm.patchValue(orderToEdit);
      });
    }
  }

  onSubmit() {
    if (this.orderForm.valid) {
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        const order: Order = this.orderForm.value;

        const origItems = order.items;
        order.items = JSON.stringify(order.items);
        order.id = id;

        const customer = this.customers.find(
          (customer) =>
            customer.name === this.orderForm.get('customerName')?.value,
        );
        if (!customer) return;
        order.customer = customer;

        this.ordersService
          .updateOrder(this.orderForm.value)
          .subscribe((res) => {
            if (res) {
              this.router.navigate(['/dashboard/orders']);
            }
          });
        order.items = origItems;
      } else {
        const order: Order = this.orderForm.value;

        order.items = JSON.stringify(order.items);

        const customer = this.customers.find(
          (customer) =>
            customer.name === this.orderForm.get('customerName')?.value,
        );
        if (!customer) return;
        order.customer = customer;
        this.ordersService.addOrder(order).subscribe((res) => {
          if (res) {
            this.router.navigate(['/dashboard/orders']);
          }
        });
      }
    }
  }

  addItem(event: Event) {
    const itemsInput = event.target as HTMLInputElement;
    this.orderForm.value.items.push(itemsInput.value);
    this.orderForm.patchValue(this.orderForm.value);
    itemsInput.value = '';
  }

  deleteItem(event: MouseEvent) {
    const deleteBtnSpan = event.target as HTMLButtonElement;
    const itemValue =
      deleteBtnSpan.parentElement?.parentElement?.firstElementChild?.innerHTML;
    const newItemsArray = this.orderForm.value.items.filter(
      (item: string) => item !== itemValue,
    );
    this.orderForm.value.items = newItemsArray;
    this.orderForm.patchValue(this.orderForm.value);
  }
}
