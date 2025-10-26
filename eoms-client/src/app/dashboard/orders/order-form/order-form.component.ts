import { Component, OnInit } from '@angular/core';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Order, OrderToEdit } from '../../../models/order';

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
    MatDatepickerModule,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent implements OnInit {
  errorMessage = '';

  orderForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private ordersService: OrdersService,
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

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.ordersService.getOrder(id)?.subscribe((res) => {
        const orderToEdit: OrderToEdit =
          this.ordersService.transformOrderToEdit(res.data);
        this.orderForm.patchValue(orderToEdit);
      });
    }
  }

  onSubmit() {
    console.log(this.orderForm.valid);
    if (this.orderForm.valid) {
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        const order: Order = this.orderForm.value;
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
}
