import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: Date;
  approvedBy?: string;
  approvedDate?: Date;
  comments?: string;
  emergencyContact?: string;
  workHandover?: string;
}

export interface LeaveBalance {
  leaveType: string;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
}

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    DatePickerModule,
    SelectModule,
    ToastModule,
    DividerModule,
    BadgeModule,
    ProgressSpinnerModule
  ],
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageService);

  // Signals
  leaveForm = signal<FormGroup>(this.createLeaveForm());
  leaveBalances = signal<LeaveBalance[]>([]);
  leaveTypes = signal([
    { label: 'Annual Leave', value: 'annual' },
    { label: 'Sick Leave', value: 'sick' },
    { label: 'Personal Leave', value: 'personal' },
    { label: 'Emergency Leave', value: 'emergency' },
    { label: 'Maternity Leave', value: 'maternity' },
    { label: 'Paternity Leave', value: 'paternity' },
    { label: 'Study Leave', value: 'study' },
    { label: 'Bereavement Leave', value: 'bereavement' }
  ]);
  isLoading = signal(false);
  isSubmitting = signal(false);

  // Computed properties
  selectedLeaveType = computed(() => {
    const form = this.leaveForm();
    return form.get('leaveType')?.value;
  });

  selectedStartDate = computed(() => {
    const form = this.leaveForm();
    return form.get('startDate')?.value;
  });

  selectedEndDate = computed(() => {
    const form = this.leaveForm();
    return form.get('endDate')?.value;
  });

  totalDays = computed(() => {
    const startDate = this.selectedStartDate();
    const endDate = this.selectedEndDate();
    
    if (startDate && endDate) {
      const timeDiff = endDate.getTime() - startDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
      return daysDiff > 0 ? daysDiff : 0;
    }
    return 0;
  });

  availableBalance = computed(() => {
    const selectedType = this.selectedLeaveType();
    const balance = this.leaveBalances().find(b => b.leaveType === selectedType);
    return balance ? balance.remainingDays : 0;
  });

  canSubmitRequest = computed(() => {
    return this.totalDays() > 0 && 
           this.totalDays() <= this.availableBalance() && 
           this.leaveForm().valid;
  });

  constructor() {
    this.loadLeaveBalances();
  }

  private createLeaveForm(): FormGroup {
    return this.fb.group({
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]],
      emergencyContact: ['', Validators.required],
      workHandover: ['', Validators.required]
    });
  }

  private loadLeaveBalances(): void {
    // Mock data - replace with actual service call
    this.leaveBalances.set([
      { leaveType: 'annual', totalDays: 21, usedDays: 5, remainingDays: 16 },
      { leaveType: 'sick', totalDays: 10, usedDays: 2, remainingDays: 8 },
      { leaveType: 'personal', totalDays: 5, usedDays: 1, remainingDays: 4 },
      { leaveType: 'emergency', totalDays: 3, usedDays: 0, remainingDays: 3 },
      { leaveType: 'maternity', totalDays: 90, usedDays: 0, remainingDays: 90 },
      { leaveType: 'paternity', totalDays: 14, usedDays: 0, remainingDays: 14 },
      { leaveType: 'study', totalDays: 5, usedDays: 0, remainingDays: 5 },
      { leaveType: 'bereavement', totalDays: 3, usedDays: 0, remainingDays: 3 }
    ]);
  }

  onLeaveTypeChange(): void {
    const form = this.leaveForm();
    const leaveType = form.get('leaveType')?.value;
    
    if (leaveType) {
      const balance = this.leaveBalances().find(b => b.leaveType === leaveType);
      if (balance && balance.remainingDays === 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'No Leave Balance',
          detail: 'You have no remaining days for this leave type.'
        });
      }
    }
  }

  onDateChange(): void {
    const form = this.leaveForm();
    const startDate = form.get('startDate')?.value;
    const endDate = form.get('endDate')?.value;
    
    if (startDate && endDate) {
      if (endDate < startDate) {
        form.get('endDate')?.setErrors({ invalidDate: true });
        this.messageService.add({
          severity: 'error',
          summary: 'Invalid Date',
          detail: 'End date cannot be before start date.'
        });
      } else {
        form.get('endDate')?.setErrors(null);
      }
    }
  }

  onSubmit(): void {
    if (this.leaveForm().valid && this.canSubmitRequest()) {
      this.isSubmitting.set(true);
      
      const formValue = this.leaveForm().value;
      const leaveRequest: LeaveRequest = {
        id: this.generateId(),
        employeeId: 'EMP001', // Get from auth service
        employeeName: 'John Doe', // Get from auth service
        leaveType: formValue.leaveType,
        startDate: formValue.startDate,
        endDate: formValue.endDate,
        totalDays: this.totalDays(),
        reason: formValue.reason,
        status: 'pending',
        submittedDate: new Date(),
        emergencyContact: formValue.emergencyContact,
        workHandover: formValue.workHandover
      };

      // Mock API call
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Leave Request Submitted',
          detail: 'Your leave request has been submitted successfully.'
        });
        
        this.isSubmitting.set(false);
        this.leaveForm().reset();
        this.router.navigate(['/attendance/dashboard']);
      }, 2000);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Form',
        detail: 'Please fill in all required fields correctly.'
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/attendance/dashboard']);
  }

  onReset(): void {
    this.leaveForm().reset();
  }

  private generateId(): string {
    return 'LR' + Date.now().toString(36).toUpperCase();
  }

  getLeaveTypeLabel(value: string): string {
    const type = this.leaveTypes().find(t => t.value === value);
    return type ? type.label : value;
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warning' | 'danger' {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'danger';
      default: return 'info';
    }
  }
}
