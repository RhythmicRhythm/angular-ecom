import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Initialize form with empty fields
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe({
      next: (response) => {
        console.log('Login successful! Full response:', response);
        this.isSubmitting = false;
        // Handle successful login (navigation will be added later)
      },
      error: (error) => {
        console.error('Login error:', error);
        this.isSubmitting = false;
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
