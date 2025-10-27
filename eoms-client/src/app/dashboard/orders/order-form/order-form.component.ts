import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { OrdersService } from '../orders.service';
import { Router, ActivatedRoute } from '@angular/router';
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
import {
  MatSelectSearchOptions,
  NgxMatSelectSearchModule,
} from 'ngx-mat-select-search';
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
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    NgxMatSelectSearchModule,
    MatDatepickerModule,
    MatListModule,
    AngularSvgIconModule,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent implements OnInit {
  errorMessage = '';

  orderForm: FormGroup = new FormGroup({});
  customers: Customer[] = [];

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
      customerName: ['', Validators.required],
      orderDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      items: ['', Validators.required],
      status: ['', Validators.required],
      details: ['', Validators.required],
    });

    this.customersService.getCustomers('', 0).subscribe((response) => {
      this.customers = response.data;
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.ordersService.getOrder(id)?.subscribe((res) => {
        const orderToEdit: OrderToEdit =
          this.ordersService.transformOrderToEdit(res.data);
        const ordersSanitized = orderToEdit.items?.replace(/'/g, '"');
        if (ordersSanitized) {
          orderToEdit.items = JSON.parse(ordersSanitized);
        }
        this.orderForm.patchValue(orderToEdit);
      });
    }
  }

  onSubmit(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
    console.log(this.orderForm.valid);
    if (this.orderForm.valid) {
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        const order: Order = this.orderForm.value;
        console.log(order);
        order.items = JSON.stringify(order.items);
        order.id = id;
        this.ordersService
          .updateOrder(this.orderForm.value)
          .subscribe((res) => {
            if (res) {
              this.router.navigate(['/dashboard/orders']);
            }
          });
      } else {
        this.ordersService.addOrder(this.orderForm.value).subscribe((res) => {
          if (res) {
            this.router.navigate(['/dashboard/orders']);
          }
        });
      }
    }
  }

  addItem(event: KeyboardEvent) {
    console.log(event);
    const itemsInput = event.target as HTMLInputElement;
    if (event.key === 'Enter') {
      this.orderForm.value.items.push(itemsInput.value);
      this.orderForm.patchValue(this.orderForm.value);
      itemsInput.value = '';
    }
  }

  deleteItem(event: MouseEvent) {
    const deleteBtnSpan = event.target as HTMLButtonElement;
    const itemValue = deleteBtnSpan.parentElement?.parentElement?.firstElementChild?.innerHTML;
    const newItemsArray = this.orderForm.value.items.filter(
      (item: string) => item !== itemValue,
    );
    this.orderForm.value.items = newItemsArray;
    this.orderForm.patchValue(this.orderForm.value);
  }

  checkIfEnterSubmit(event: KeyboardEvent) {
    if (event.key === "Enter") return;
  }
}
