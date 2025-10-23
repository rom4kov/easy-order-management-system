import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { Customer } from '../../../models/customer';
// import { merge } from 'rxjs';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  providers: [provideNativeDateAdapter(), CustomersService],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
})
export class CustomerFormComponent implements OnInit {
  errorMessage = '';

  customerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    // merge(this.email.statusChanges, this.email.valueChanges)
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      contactName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      industry: ['', Validators.required],
      type: ['', Validators.required],
      firstOrderDate: ['', Validators.required],
      status: ['', Validators.required],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);

    if (id) {
      this.customerService.getCustomer(id)?.subscribe(res => {
        console.log(res);
        this.customerForm.patchValue(res.data);
      });
    }

  }

  onSubmit() {
    if (this.customerForm.valid) {
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(id);

      if (id) {
        const customer: Customer = this.customerForm.value;
        customer.id = id;
        this.customerService.updateCustomer(this.customerForm.value).subscribe(res => {
          if (res) {
            this.router.navigate(['/dashboard/customers']);
          }
        })
      } else {
        this.customerService.addCustomer(this.customerForm.value).subscribe(res => {
          if (res) {
            this.router.navigate(['/dashboard/customers']);
          }
        });
      }
    }
  }
}
