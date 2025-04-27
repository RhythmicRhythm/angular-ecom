import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
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

  get submitButtonText(): string {
    return this.isSubmitting ? 'Logging in...' : 'Sign In';
  }

  get submitButtonDisabled(): boolean {
    return this.loginForm.invalid || this.isSubmitting;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (response) => {
          console.log('Login successful! Full response:', response);
          this.isSubmitting = false;
          this.router.navigate(['/dashboard']);
          this.toastr.success('Login successful!', 'Welcome');
        },
        error: (error) => {
          console.error('Login error:', error);
          this.isSubmitting = false;
          this.toastr.error('Invalid credentials', 'Login failed');
          this.errorMessage =
            error.error?.message || 'Login failed. Please try again.';
        },
      });
  }
}
