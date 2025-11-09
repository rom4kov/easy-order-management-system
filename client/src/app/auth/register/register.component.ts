import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SignUpDto } from '../dto/sign-up.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  errorMessage = '';
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      companyName: ['', Validators.required],
      phone: ['', Validators.required],
      website: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newUser: SignUpDto = this.registerForm.value;
      newUser.createdAt = new Date();
      console.log(newUser);

      this.authService.registerUser(newUser).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
