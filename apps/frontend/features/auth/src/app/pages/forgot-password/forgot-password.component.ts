import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

// PrimeNG Components
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [MessageService],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageService);

  isLoading = signal(false);
  isResending = signal(false);
  isEmailSent = signal(false);

  forgotPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  isFieldInvalid(fieldName: string): boolean {
    const field = this.forgotPasswordForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.forgotPasswordForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isLoading.set(true);
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading.set(false);
        this.isEmailSent.set(true);
        this.messageService.add({
          severity: 'success',
          summary: 'Email Sent',
          detail: 'Password reset link has been sent to your email'
        });
      }, 2000);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please enter a valid email address'
      });
    }
  }

  resendEmail(): void {
    this.isResending.set(true);
    
    // Simulate API call
    setTimeout(() => {
      this.isResending.set(false);
      this.messageService.add({
        severity: 'success',
        summary: 'Email Resent',
        detail: 'Password reset link has been sent again'
      });
    }, 1500);
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }
}
