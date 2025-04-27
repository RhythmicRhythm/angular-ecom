import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Custom validator to check if passwords match
function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ mustMatch: true });
    return { mustMatch: true };
  }
  return null;
}

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    // Initialize form with validation
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        agreeToTerms: [false, [Validators.requiredTrue]],
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  // Getters for form controls to make access easier in the template
  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  get agreeToTerms() {
    return this.signupForm.get('agreeToTerms');
  }

  get submitButtonText(): string {
    return this.isSubmitting ? 'Creating Account...' : 'Sign Up';
  }

  get submitButtonDisabled(): boolean {
    return this.signupForm.invalid || this.isSubmitting;
  }

  onSubmit() {
    if (this.signupForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const { fullname, email, password } = this.signupForm.value;

    this.authService
      .signup(fullname, email, password)
      .subscribe({
        next: (response) => {
          console.log('Registration successful!', response);
          this.isSubmitting = false;
          this.toastr.success('Account created successfully!', 'Welcome');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.isSubmitting = false;
          this.toastr.error('Registration failed', 'Error');
          this.errorMessage =
            error.error?.message || 'Registration failed. Please try again.';
        },
      });
  }
}
