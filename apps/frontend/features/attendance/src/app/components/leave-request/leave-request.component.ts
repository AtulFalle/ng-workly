import { Component, signal, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { TextareaModule } from 'primeng/textarea';

// Design System Components
import {
  ButtonComponent,
  CardComponent,
  ChartComponent,
  StatCardComponent,
  TableComponent,
  TableColumn,
  TableConfig,
  DialogComponent,
  DynamicFormComponent,
  DynamicFormConfig,
  FormControlConfig,
  StatusChipStatus
} from '@workly/ui-component';

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

export interface Holiday {
  id: string;
  name: string;
  date: Date;
  type: 'public' | 'company';
  description?: string;
}

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TextareaModule,
    ButtonComponent,
    CardComponent,
    ChartComponent,
    StatCardComponent,
    TableComponent,
    DialogComponent,
    DynamicFormComponent
  ],
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveRequestComponent {
  private fb = inject(FormBuilder);

  // Signals
  showApplyLeaveDialog = signal(false);
  showApprovalDialog = signal(false);
  selectedRequestForApproval = signal<LeaveRequest | null>(null);
  approvalAction = signal<'approve' | 'reject'>('approve');
  approvalComments = signal('');
  approvalCommentsFormControl = this.fb.control('');

  leaveForm = signal<FormGroup>(this.createLeaveForm());

  // Helper methods for template
  getLeaveBalance = (leaveType: string): LeaveBalance | undefined => {
    return this.leaveBalances().find(b => b.leaveType === leaveType);
  };

  hasLeaveBalance = (leaveType: string): boolean => {
    const balance = this.getLeaveBalance(leaveType);
    return balance ? balance.remainingDays > 0 : false;
  };

  isLeaveTypeDisabled = (leaveType: string): boolean => {
    const balance = this.getLeaveBalance(leaveType);
    return balance ? balance.remainingDays === 0 : true;
  };
  leaveBalances = signal<LeaveBalance[]>([
    { leaveType: 'annual', totalDays: 21, usedDays: 5, remainingDays: 16 },
    { leaveType: 'sick', totalDays: 10, usedDays: 2, remainingDays: 8 },
    { leaveType: 'personal', totalDays: 5, usedDays: 1, remainingDays: 4 },
    { leaveType: 'emergency', totalDays: 3, usedDays: 0, remainingDays: 3 },
    { leaveType: 'maternity', totalDays: 90, usedDays: 0, remainingDays: 90 },
    { leaveType: 'paternity', totalDays: 14, usedDays: 0, remainingDays: 14 },
    { leaveType: 'study', totalDays: 5, usedDays: 0, remainingDays: 5 },
    { leaveType: 'bereavement', totalDays: 3, usedDays: 0, remainingDays: 3 }
  ]);

  pastLeaveRequests = signal<LeaveRequest[]>([
    {
      id: 'LR001',
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      leaveType: 'annual',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-20'),
      totalDays: 6,
      reason: 'Family vacation',
      status: 'approved',
      submittedDate: new Date('2024-01-10'),
      approvedBy: 'HR Manager',
      approvedDate: new Date('2024-01-11'),
      emergencyContact: 'Jane Doe - +1-555-0123',
      workHandover: 'Tasks delegated to Sarah Smith'
    },
    {
      id: 'LR002',
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      leaveType: 'sick',
      startDate: new Date('2024-02-05'),
      endDate: new Date('2024-02-07'),
      totalDays: 3,
      reason: 'Medical appointment',
      status: 'approved',
      submittedDate: new Date('2024-02-03'),
      approvedBy: 'HR Manager',
      approvedDate: new Date('2024-02-04'),
      emergencyContact: 'Dr. Johnson - +1-555-0456',
      workHandover: 'Urgent tasks forwarded to manager'
    }
  ]);

  pendingLeaveRequests = signal<LeaveRequest[]>([
    {
      id: 'LR003',
      employeeId: 'EMP002',
      employeeName: 'Jane Smith',
      leaveType: 'annual',
      startDate: new Date('2024-03-10'),
      endDate: new Date('2024-03-15'),
      totalDays: 6,
      reason: 'Personal vacation',
      status: 'pending',
      submittedDate: new Date('2024-02-28'),
      emergencyContact: 'John Smith - +1-555-0789',
      workHandover: 'Tasks delegated to Mike Johnson'
    },
    {
      id: 'LR004',
      employeeId: 'EMP003',
      employeeName: 'Mike Johnson',
      leaveType: 'sick',
      startDate: new Date('2024-03-08'),
      endDate: new Date('2024-03-10'),
      totalDays: 3,
      reason: 'Medical recovery',
      status: 'pending',
      submittedDate: new Date('2024-03-06'),
      emergencyContact: 'Emergency - +1-555-0321',
      workHandover: 'Critical tasks covered by team'
    }
  ]);

  holidays = signal<Holiday[]>([
    { id: 'H001', name: 'New Year\'s Day', date: new Date('2024-01-01'), type: 'public', description: 'Celebration of the new year' },
    { id: 'H002', name: 'Martin Luther King Jr. Day', date: new Date('2024-01-15'), type: 'public', description: 'Honoring civil rights leader' },
    { id: 'H003', name: 'Company Anniversary', date: new Date('2024-02-14'), type: 'company', description: 'Company founding anniversary - 15 years' },
    { id: 'H004', name: 'Presidents\' Day', date: new Date('2024-02-19'), type: 'public', description: 'Honoring past U.S. presidents' },
    { id: 'H005', name: 'Good Friday', date: new Date('2024-03-29'), type: 'public', description: 'Christian religious holiday' },
    { id: 'H006', name: 'Easter Monday', date: new Date('2024-04-01'), type: 'public', description: 'Day after Easter Sunday' },
    { id: 'H007', name: 'Memorial Day', date: new Date('2024-05-27'), type: 'public', description: 'Honoring fallen military personnel' },
    { id: 'H008', name: 'Juneteenth', date: new Date('2024-06-19'), type: 'public', description: 'Emancipation Day' },
    { id: 'H009', name: 'Independence Day', date: new Date('2024-07-04'), type: 'public', description: 'U.S. Independence Day celebration' },
    { id: 'H010', name: 'Labor Day', date: new Date('2024-09-02'), type: 'public', description: 'Celebrating workers and labor movement' },
    { id: 'H011', name: 'Thanksgiving Day', date: new Date('2024-11-28'), type: 'public', description: 'National day of giving thanks' },
    { id: 'H012', name: 'Day after Thanksgiving', date: new Date('2024-11-29'), type: 'company', description: 'Company holiday - extended Thanksgiving break' },
    { id: 'H013', name: 'Christmas Eve', date: new Date('2024-12-24'), type: 'company', description: 'Day before Christmas - half day' },
    { id: 'H014', name: 'Christmas Day', date: new Date('2024-12-25'), type: 'public', description: 'Christian holiday celebrating birth of Jesus' },
    { id: 'H015', name: 'New Year\'s Eve', date: new Date('2024-12-31'), type: 'company', description: 'Last day of the year - half day' }
  ]);

  leaveTypes = [
    { label: 'Annual Leave', value: 'annual' },
    { label: 'Sick Leave', value: 'sick' },
    { label: 'Personal Leave', value: 'personal' },
    { label: 'Emergency Leave', value: 'emergency' },
    { label: 'Maternity Leave', value: 'maternity' },
    { label: 'Paternity Leave', value: 'paternity' },
    { label: 'Study Leave', value: 'study' },
    { label: 'Bereavement Leave', value: 'bereavement' }
  ];

  isLoading = signal(false);
  isSubmitting = signal(false);
  isProcessingApproval = signal(false);

  // Computed properties
  totalLeaveBalance = computed(() => {
    return this.leaveBalances().reduce((sum, balance) => sum + balance.remainingDays, 0);
  });

  usedLeaveBalance = computed(() => {
    return this.leaveBalances().reduce((sum, balance) => sum + balance.usedDays, 0);
  });

  nextHoliday = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcoming = this.holidays().find(h => h.date >= today);
    return upcoming || null;
  });

  upcomingHolidays = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.holidays().filter(h => h.date >= today).slice(0, 5);
  });

  selectedLeaveType = computed(() => {
    const form = this.leaveForm();
    return form.get('leaveType')?.value;
  });

  minDate = new Date();

  getMinDate(): Date {
    return new Date();
  }

  selectedStartDate = computed(() => {
    const form = this.leaveForm();
    if (!form) return null;
    const value = form.get('startDate')?.value;
    if (!value) return null;
    // Convert string to Date if needed
    return typeof value === 'string' ? new Date(value) : value;
  });

  selectedEndDate = computed(() => {
    const form = this.leaveForm();
    if (!form) return null;
    const value = form.get('endDate')?.value;
    if (!value) return null;
    // Convert string to Date if needed
    return typeof value === 'string' ? new Date(value) : value;
  });

  totalDays = computed(() => {
    const startDate = this.selectedStartDate();
    const endDate = this.selectedEndDate();
    
    if (startDate && endDate) {
      const start = startDate instanceof Date ? startDate : new Date(startDate);
      const end = endDate instanceof Date ? endDate : new Date(endDate);
      const timeDiff = end.getTime() - start.getTime();
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

  // Chart data for leave balance distribution
  leaveBalanceChartData = computed<ChartData>(() => {
    const balances = this.leaveBalances();
    return {
      labels: balances.map(b => this.getLeaveTypeLabel(b.leaveType)),
      datasets: [
        {
          label: 'Remaining Days',
          data: balances.map(b => b.remainingDays),
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(251, 146, 60, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(14, 165, 233, 0.8)',
            'rgba(234, 179, 8, 0.8)',
            'rgba(20, 184, 166, 0.8)'
          ],
          borderWidth: 0
        }
      ]
    };
  });

  leaveBalanceChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 15
        }
      }
    }
  };

  // Chart data for leave usage trend
  leaveUsageChartData = computed<ChartData>(() => {
    const balances = this.leaveBalances();
    return {
      labels: balances.map(b => this.getLeaveTypeLabel(b.leaveType)),
      datasets: [
        {
          label: 'Used Days',
          data: balances.map(b => b.usedDays),
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 2
        },
        {
          label: 'Remaining Days',
          data: balances.map(b => b.remainingDays),
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2
        }
      ]
    };
  });

  leaveUsageChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Table columns for past leave requests
  pastLeaveTableColumns: TableColumn[] = [
    {
      field: 'leaveType',
      header: 'Leave Type',
      type: 'text',
      sortable: true,
      filterable: true,
      width: '150px'
    },
    {
      field: 'startDate',
      header: 'Start Date',
      type: 'date',
      sortable: true,
      filterable: false,
      width: '120px'
    },
    {
      field: 'endDate',
      header: 'End Date',
      type: 'date',
      sortable: true,
      filterable: false,
      width: '120px'
    },
    {
      field: 'totalDays',
      header: 'Days',
      type: 'text',
      sortable: true,
      filterable: false,
      width: '80px',
      align: 'center'
    },
    {
      field: 'status',
      header: 'Status',
      type: 'status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Pending', value: 'pending' }
      ],
      width: '120px',
      align: 'center'
    },
    {
      field: 'submittedDate',
      header: 'Submitted',
      type: 'date',
      sortable: true,
      filterable: false,
      width: '120px'
    }
  ];

  pastLeaveTableConfig: TableConfig = {
    variant: 'default',
    size: 'medium',
    striped: true,
    bordered: true,
    hoverable: true,
    sortable: true,
    filterable: true,
    pagination: true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
    scrollable: false,
    showHeader: true
  };

  pastLeaveTableRows = computed(() => {
    return this.pastLeaveRequests().map(req => ({
      id: req.id,
      leaveType: this.getLeaveTypeLabel(req.leaveType),
      startDate: req.startDate,
      endDate: req.endDate,
      totalDays: `${req.totalDays} days`,
      status: this.getStatusChipStatus(req.status),
      statusLabel: this.getStatusLabel(req.status),
      submittedDate: req.submittedDate,
      rawData: req
    }));
  });

  // Table columns for pending leave requests (approval)
  pendingLeaveTableColumns: TableColumn[] = [
    {
      field: 'employee',
      header: 'Employee',
      type: 'employee',
      sortable: true,
      filterable: true,
      width: '200px',
      frozen: true
    },
    {
      field: 'leaveType',
      header: 'Leave Type',
      type: 'text',
      sortable: true,
      filterable: true,
      width: '150px'
    },
    {
      field: 'startDate',
      header: 'Start Date',
      type: 'date',
      sortable: true,
      filterable: false,
      width: '120px'
    },
    {
      field: 'endDate',
      header: 'End Date',
      type: 'date',
      sortable: true,
      filterable: false,
      width: '120px'
    },
    {
      field: 'totalDays',
      header: 'Days',
      type: 'text',
      sortable: true,
      filterable: false,
      width: '80px',
      align: 'center'
    },
    {
      field: 'submittedDate',
      header: 'Submitted',
      type: 'date',
      sortable: true,
      filterable: false,
      width: '120px'
    }
  ];

  pendingLeaveTableConfig: TableConfig = {
    variant: 'default',
    size: 'medium',
    striped: true,
    bordered: true,
    hoverable: true,
    sortable: true,
    filterable: true,
    pagination: true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
    scrollable: false,
    showHeader: true,
    rowActions: [
      {
        label: 'Approve',
        icon: 'pi pi-check',
        severity: 'success',
        action: (row: any) => this.onApproveLeave(row.rawData)
      },
      {
        label: 'Reject',
        icon: 'pi pi-times',
        severity: 'danger',
        action: (row: any) => this.onRejectLeave(row.rawData)
      }
    ]
  };

  pendingLeaveTableRows = computed(() => {
    return this.pendingLeaveRequests().map(req => ({
      id: req.id,
      employee: {
        name: req.employeeName,
        employeeId: req.employeeId,
        subtitle: req.employeeId,
        avatar: undefined
      },
      leaveType: this.getLeaveTypeLabel(req.leaveType),
      startDate: req.startDate,
      endDate: req.endDate,
      totalDays: `${req.totalDays} days`,
      submittedDate: req.submittedDate,
      rawData: req
    }));
  });

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

  leaveFormConfigComputed = computed<DynamicFormConfig>(() => {
    return {
      layout: 'grid',
      gridColumns: 12,
      spacing: 'comfortable',
      className: 'leave-request-form',
      showActions: false, // Hide default actions - we'll use custom buttons
      controls: [
        {
          name: 'leaveType',
          type: 'select',
          label: 'Leave Type',
          placeholder: 'Select leave type',
          required: true,
          options: this.leaveTypes.map(type => ({
            label: `${type.label}${this.isLeaveTypeDisabled(type.value) ? ' (No balance)' : ` (${this.getLeaveBalance(type.value)?.remainingDays || 0} days available)`}`,
            value: type.value,
            disabled: this.isLeaveTypeDisabled(type.value)
          })),
          validators: [
            {
              type: 'required',
              message: 'Please select a leave type'
            }
          ],
          layout: {
            order: 1,
            columnSpan: 12
          }
        },
        {
          name: 'startDate',
          type: 'date',
          label: 'Start Date',
          placeholder: 'Select start date',
          required: true,
          validators: [
            {
              type: 'required',
              message: 'Please select a start date'
            }
          ],
          layout: {
            order: 2,
            columnSpan: 6
          }
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'End Date',
          placeholder: 'Select end date',
          required: true,
          validators: [
            {
              type: 'required',
              message: 'Please select a valid end date'
            }
          ],
          layout: {
            order: 3,
            columnSpan: 6
          }
        },
        {
          name: 'reason',
          type: 'textarea',
          label: 'Reason for Leave',
          placeholder: 'Please provide a detailed reason for your leave request...',
          required: true,
          rows: 4,
          validators: [
            {
              type: 'required',
              message: 'Please provide a reason'
            },
            {
              type: 'minLength',
              value: 10,
              message: 'Please provide a reason (minimum 10 characters)'
            }
          ],
          layout: {
            order: 4,
            columnSpan: 12
          }
        },
        {
          name: 'emergencyContact',
          type: 'text',
          label: 'Emergency Contact',
          placeholder: 'Name and phone number of emergency contact',
          required: true,
          validators: [
            {
              type: 'required',
              message: 'Please provide emergency contact details'
            }
          ],
          layout: {
            order: 5,
            columnSpan: 12
          }
        },
        {
          name: 'workHandover',
          type: 'textarea',
          label: 'Work Handover',
          placeholder: 'Describe how your work will be handled during your absence...',
          required: true,
          rows: 3,
          validators: [
            {
              type: 'required',
              message: 'Please describe work handover arrangements'
            }
          ],
          layout: {
            order: 6,
            columnSpan: 12
          }
        }
      ]
    };
  });

  onOpenApplyLeaveDialog(): void {
    this.leaveForm.set(this.createLeaveForm());
    this.showApplyLeaveDialog.set(true);
  }

  onCloseApplyLeaveDialog(): void {
    this.showApplyLeaveDialog.set(false);
    // Reset form - dynamic form will handle reset if needed
    const form = this.leaveForm();
    if (form) {
      form.reset();
    }
  }

  onDynamicFormReady(form: FormGroup): void {
    // Store reference to dynamic form's formGroup
    this.leaveForm.set(form);
  }

  onLeaveFormValueChange(value: any): void {
    // Values are already in the dynamic form's formGroup
    // Trigger date validation if dates changed
    if (value.startDate || value.endDate) {
      setTimeout(() => this.onDateChange(), 0);
    }
  }

  onLeaveFormSubmit(value: any): void {
    // Handle form submission from dynamic form
    this.onSubmitLeaveRequest();
  }

  onLeaveTypeChange(): void {
    const form = this.leaveForm();
    const leaveType = form.get('leaveType')?.value;
    if (leaveType) {
      const balance = this.getLeaveBalance(leaveType);
      if (balance && balance.remainingDays === 0) {
        // Optionally show a warning
      }
    }
  }

  onDateChange(): void {
    const form = this.leaveForm();
    const startDate = form.get('startDate')?.value;
    const endDate = form.get('endDate')?.value;
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end < start) {
        form.get('endDate')?.setErrors({ invalidDate: true });
      } else {
        form.get('endDate')?.setErrors(null);
      }
    }
  }

  onSubmitLeaveRequest(): void {
    const form = this.leaveForm();
    if (!form) return;
    
    // Mark all fields as touched to show validation errors
    Object.keys(form.controls).forEach(key => {
      form.get(key)?.markAsTouched();
    });
    
    if (form.valid && this.canSubmitRequest()) {
      this.isSubmitting.set(true);
      
      const formValue = form.value;
      const leaveRequest: LeaveRequest = {
        id: this.generateId(),
        employeeId: 'EMP001',
        employeeName: 'John Doe',
        leaveType: formValue.leaveType,
        startDate: typeof formValue.startDate === 'string' ? new Date(formValue.startDate) : formValue.startDate,
        endDate: typeof formValue.endDate === 'string' ? new Date(formValue.endDate) : formValue.endDate,
        totalDays: this.totalDays(),
        reason: formValue.reason,
        status: 'pending',
        submittedDate: new Date(),
        emergencyContact: formValue.emergencyContact,
        workHandover: formValue.workHandover
      };

      setTimeout(() => {
        this.isSubmitting.set(false);
        this.onCloseApplyLeaveDialog();
        
        // Add to pending requests (for demo)
        this.pendingLeaveRequests.update(requests => [...requests, leaveRequest]);
      }, 2000);
    } else {
      // Form validation errors will be shown in the template
    }
  }

  onApproveLeave(request: LeaveRequest): void {
    this.selectedRequestForApproval.set(request);
    this.approvalAction.set('approve');
    this.approvalComments.set('');
    this.showApprovalDialog.set(true);
  }

  onRejectLeave(request: LeaveRequest): void {
    this.selectedRequestForApproval.set(request);
    this.approvalAction.set('reject');
    this.approvalComments.set('');
    this.showApprovalDialog.set(true);
  }

  onProcessApproval(): void {
    const request = this.selectedRequestForApproval();
    if (!request) return;

    this.isProcessingApproval.set(true);
    const action = this.approvalAction();
    const comments = this.approvalCommentsFormControl.value || '';

    setTimeout(() => {
      const updatedRequest: LeaveRequest = {
        ...request,
        status: action === 'approve' ? 'approved' : 'rejected',
        approvedBy: 'Current User',
        approvedDate: new Date(),
        comments: comments
      };

      // Move from pending to past
      this.pendingLeaveRequests.update(requests => 
        requests.filter(r => r.id !== request.id)
      );
      this.pastLeaveRequests.update(requests => [updatedRequest, ...requests]);

      this.isProcessingApproval.set(false);
      this.showApprovalDialog.set(false);
      this.selectedRequestForApproval.set(null);
      this.approvalComments.set('');
      this.approvalCommentsFormControl.setValue('');
    }, 1500);
  }

  onCloseApprovalDialog(): void {
    this.showApprovalDialog.set(false);
    this.selectedRequestForApproval.set(null);
    this.approvalComments.set('');
    this.approvalCommentsFormControl.setValue('');
  }

  onPendingLeaveRowClick(row: any): void {
    const request = row.rawData as LeaveRequest;
    this.selectedRequestForApproval.set(request);
    this.approvalAction.set('approve');
    this.approvalComments.set('');
    this.showApprovalDialog.set(true);
  }

  onPendingLeaveActionClick(event: { action: string; row: any }): void {
    const request = event.row.rawData as LeaveRequest;
    if (event.action === 'Approve') {
      this.onApproveLeave(request);
    } else if (event.action === 'Reject') {
      this.onRejectLeave(request);
    }
  }

  private generateId(): string {
    return 'LR' + Date.now().toString(36).toUpperCase();
  }

  getLeaveTypeLabel(value: string): string {
    const type = this.leaveTypes.find(t => t.value === value);
    return type ? type.label : value;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'approved': return 'Approved';
      case 'pending': return 'Pending';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  }

  getStatusChipStatus(status: string): StatusChipStatus {
    switch (status) {
      case 'approved': return 'approved';
      case 'pending': return 'pending';
      case 'rejected': return 'rejected';
      default: return 'pending';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getDaysUntilHoliday(holiday: Holiday): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const holidayDate = new Date(holiday.date);
    holidayDate.setHours(0, 0, 0, 0);
    const diffTime = holidayDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
