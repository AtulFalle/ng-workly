import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

// PrimeNG Components
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageService);

  // Component state
  isLoading = signal(false);
  showPassword = signal(false);
  isFormSubmitted = signal(false);

  // Form configuration
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  // Field validation methods
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.isFormSubmitted()));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return 'Password must be at least 6 characters long';
      }
    }
    return '';
  }

  // Form submission
  onSubmit(): void {
    this.isFormSubmitted.set(true);
    
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      
      // Simulate API call with better UX
      setTimeout(() => {
        this.isLoading.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Welcome Back!',
          detail: 'You have been successfully logged in.',
          life: 3000
        });
        
        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
      }, 2000);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please check your input and try again',
        life: 4000
      });
    }
  }

  // Social login methods
  loginWithGoogle(): void {
    this.isLoading.set(true);
    
    // Simulate Google OAuth
    setTimeout(() => {
      this.isLoading.set(false);
      this.messageService.add({
        severity: 'info',
        summary: 'Google Authentication',
        detail: 'Redirecting to Google OAuth...',
        life: 3000
      });
      
      // In real implementation, redirect to Google OAuth
      // window.location.href = '/auth/google';
    }, 1000);
  }

  loginWithGitHub(): void {
    this.isLoading.set(true);
    
    // Simulate GitHub OAuth
    setTimeout(() => {
      this.isLoading.set(false);
      this.messageService.add({
        severity: 'info',
        summary: 'GitHub Authentication',
        detail: 'Redirecting to GitHub OAuth...',
        life: 3000
      });
      
      // In real implementation, redirect to GitHub OAuth
      // window.location.href = '/auth/github';
    }, 1000);
  }

  // Utility methods
  togglePasswordVisibility(): void {
    this.showPassword.update(show => !show);
  }

  // Demo credentials for testing
  fillDemoCredentials(): void {
    this.loginForm.patchValue({
      email: 'demo@workly.com',
      password: 'demo123'
    });
  }
}
