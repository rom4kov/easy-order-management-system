import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Customer } from '../../../models/customer';

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
    RouterLink,
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
})
export class CustomerFormComponent implements OnInit {
  errorMessage = '';
  customerForm: FormGroup = new FormGroup({});
  newCustomer: boolean = true;
  file: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      contactName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      imgFilePath: [null, Validators.required],
      industry: ['', Validators.required],
      type: ['', Validators.required],
      firstOrderDate: ['', Validators.required],
      status: ['', Validators.required],
      notes: ['', Validators.required],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.newCustomer = false;
      this.customerService.getCustomer(id)?.subscribe(res => {
        this.customerForm.patchValue(res.data);
      });
    }
  }

  onSubmit() {
    console.log(this.customerForm.valid);
    if (this.customerForm.valid) {
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        const customer: Customer = this.customerForm.value;
        customer.id = id;
        if (this.file) {
          customer.imgFilePath = this.file?.name;
        }
        this.customerService.updateCustomer(customer).subscribe(res => {
          console.log(this.customerForm.value.imgFilePath);
          console.log(this.file?.name);
          console.log(this.file);
          if (this.file) {
            console.log(this.file.name);
            this.customerService.uploadCustomerImage(this.file).subscribe();
          }
          if (res) {
            this.router.navigate(['/dashboard/customers']);
          }
        })
      } else {
        this.customerForm.value.imgFilePath = this.file?.name;
        this.customerService.addCustomer(this.customerForm.value).subscribe(res => {
          if (this.file) {
            this.customerService.uploadCustomerImage(this.file).subscribe();
          }
          if (res) {
            this.router.navigate(['/dashboard/customers']);
          }
        });
      }
    }
  }

  // Source - https://stackoverflow.com/a
// Posted by JackMorrissey
// Retrieved 2025-11-14, License - CC BY-SA 4.0

  onFileSelected(event: Event) {
    if (event.target) {
      this.file = (event.target as HTMLInputElement).files![0];
      // this.customerForm.get('image')?.updateValueAndValidity();
    }
    // const inputNode: any = document.querySelector('#file');
    //
    // if (typeof (FileReader) !== 'undefined') {
    //   const reader = new FileReader();
    //
    //   reader.onload = (e: any) => {
    //     this.srcResult = e.target;
    //     console.log(this.srcResult);
    //   };
    //
    //   reader.readAsArrayBuffer(inputNode.files[0]);
    // }
  }

}
