import { Component, OnInit } from '@angular/core';
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
// import { merge } from 'rxjs';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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

  constructor(private formBuilder: FormBuilder) {
    // merge(this.email.statusChanges, this.email.valueChanges)
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      contact_person: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      industry: ['', Validators.required],
      type: ['', Validators.required],
      first_order_date: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      console.log('valid');
    }
  }
}
