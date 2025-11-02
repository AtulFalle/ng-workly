import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { LeaveRequest } from '../leave-request/leave-request.component';

@Component({
  selector: 'app-leave-approval',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    TableModule,
    TagModule,
    DividerModule,
    BadgeModule,
    ProgressSpinnerModule,
    DialogModule,
    SelectModule,
    DatePickerModule
  ],
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.scss']
})
export class LeaveApprovalComponent {
  private router = inject(Router);
  private messageService = inject(MessageService);

  // Signals
  leaveRequests = signal<LeaveRequest[]>([]);
  filteredRequests = signal<LeaveRequest[]>([]);
  selectedRequest = signal<LeaveRequest | null>(null);
  isLoading = signal(false);
  isProcessing = signal(false);
  showApprovalDialog = signal(false);
  approvalComments = signal('');
  approvalAction = signal<'approve' | 'reject'>('approve');

  // Filter options
  statusFilter = signal('all');
  leaveTypeFilter = signal('all');
  dateRange = signal<Date[]>([]);

  // Computed properties
  pendingRequests = computed(() => 
    this.leaveRequests().filter(req => req.status === 'pending')
  );

  approvedRequests = computed(() => 
    this.leaveRequests().filter(req => req.status === 'approved')
  );

  rejectedRequests = computed(() => 
    this.leaveRequests().filter(req => req.status === 'rejected')
  );

  totalRequests = computed(() => this.leaveRequests().length);
  pendingCount = computed(() => this.pendingRequests().length);

  statusOptions = signal([
    { label: 'All Requests', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' }
  ]);

  leaveTypeOptions = signal([
    { label: 'All Types', value: 'all' },
    { label: 'Annual Leave', value: 'annual' },
    { label: 'Sick Leave', value: 'sick' },
    { label: 'Personal Leave', value: 'personal' },
    { label: 'Emergency Leave', value: 'emergency' },
    { label: 'Maternity Leave', value: 'maternity' },
    { label: 'Paternity Leave', value: 'paternity' },
    { label: 'Study Leave', value: 'study' },
    { label: 'Bereavement Leave', value: 'bereavement' }
  ]);

  constructor() {
    this.loadLeaveRequests();
  }

  private loadLeaveRequests(): void {
    this.isLoading.set(true);
    
    // Mock data - replace with actual service call
    setTimeout(() => {
      const mockRequests: LeaveRequest[] = [
        {
          id: 'LR001',
          employeeId: 'EMP001',
          employeeName: 'John Doe',
          leaveType: 'annual',
          startDate: new Date('2024-02-15'),
          endDate: new Date('2024-02-20'),
          totalDays: 6,
          reason: 'Family vacation to Europe',
          status: 'pending',
          submittedDate: new Date('2024-01-15'),
          emergencyContact: 'Jane Doe - +1-555-0123',
          workHandover: 'Tasks delegated to Sarah Smith'
        },
        {
          id: 'LR002',
          employeeId: 'EMP002',
          employeeName: 'Jane Smith',
          leaveType: 'sick',
          startDate: new Date('2024-02-10'),
          endDate: new Date('2024-02-12'),
          totalDays: 3,
          reason: 'Medical appointment and recovery',
          status: 'pending',
          submittedDate: new Date('2024-01-20'),
          emergencyContact: 'Dr. Johnson - +1-555-0456',
          workHandover: 'Urgent tasks forwarded to manager'
        },
        {
          id: 'LR003',
          employeeId: 'EMP003',
          employeeName: 'Mike Johnson',
          leaveType: 'personal',
          startDate: new Date('2024-02-25'),
          endDate: new Date('2024-02-25'),
          totalDays: 1,
          reason: 'Personal matters to attend',
          status: 'approved',
          submittedDate: new Date('2024-01-18'),
          approvedBy: 'HR Manager',
          approvedDate: new Date('2024-01-19'),
          emergencyContact: 'Spouse - +1-555-0789',
          workHandover: 'No critical tasks'
        },
        {
          id: 'LR004',
          employeeId: 'EMP004',
          employeeName: 'Sarah Wilson',
          leaveType: 'maternity',
          startDate: new Date('2024-03-01'),
          endDate: new Date('2024-05-30'),
          totalDays: 90,
          reason: 'Maternity leave for childbirth',
          status: 'approved',
          submittedDate: new Date('2024-01-10'),
          approvedBy: 'HR Director',
          approvedDate: new Date('2024-01-12'),
          emergencyContact: 'Partner - +1-555-0321',
          workHandover: 'Full handover to replacement team'
        }
      ];

      this.leaveRequests.set(mockRequests);
      this.applyFilters();
      this.isLoading.set(false);
    }, 1000);
  }

  private applyFilters(): void {
    let filtered = [...this.leaveRequests()];

    // Status filter
    if (this.statusFilter() !== 'all') {
      filtered = filtered.filter(req => req.status === this.statusFilter());
    }

    // Leave type filter
    if (this.leaveTypeFilter() !== 'all') {
      filtered = filtered.filter(req => req.leaveType === this.leaveTypeFilter());
    }

    // Date range filter
    if (this.dateRange().length === 2) {
      const [startDate, endDate] = this.dateRange();
      filtered = filtered.filter(req => 
        req.startDate >= startDate && req.endDate <= endDate
      );
    }

    this.filteredRequests.set(filtered);
  }

  onStatusFilterChange(): void {
    this.applyFilters();
  }

  onLeaveTypeFilterChange(): void {
    this.applyFilters();
  }

  onDateRangeChange(): void {
    this.applyFilters();
  }

  onViewRequest(request: LeaveRequest): void {
    this.selectedRequest.set(request);
    this.showApprovalDialog.set(true);
  }

  onApproveRequest(): void {
    this.approvalAction.set('approve');
    this.approvalComments.set('');
    this.showApprovalDialog.set(true);
  }

  onRejectRequest(): void {
    this.approvalAction.set('reject');
    this.approvalComments.set('');
    this.showApprovalDialog.set(true);
  }

  onProcessApproval(): void {
    if (!this.selectedRequest()) return;

    this.isProcessing.set(true);
    
    const request = this.selectedRequest()!;
    const action = this.approvalAction();
    const comments = this.approvalComments();

    // Mock API call
    setTimeout(() => {
      const updatedRequests = this.leaveRequests().map(req => 
        req.id === request.id 
          ? {
              ...req,
              status: action === 'approve' ? 'approved' as const : 'rejected' as const,
              approvedBy: 'Current User', // Get from auth service
              approvedDate: new Date(),
              comments: comments
            }
          : req
      );

      this.leaveRequests.set(updatedRequests);
      this.applyFilters();
      
      this.messageService.add({
        severity: 'success',
        summary: 'Request Processed',
        detail: `Leave request has been ${action}d successfully.`
      });

      this.isProcessing.set(false);
      this.showApprovalDialog.set(false);
      this.selectedRequest.set(null);
      this.approvalComments.set('');
    }, 1500);
  }

  onCloseDialog(): void {
    this.showApprovalDialog.set(false);
    this.selectedRequest.set(null);
    this.approvalComments.set('');
  }

  onExportData(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Export Data',
      detail: 'Export functionality will be implemented.'
    });
  }

  getLeaveTypeLabel(type: string): string {
    const option = this.leaveTypeOptions().find(opt => opt.value === type);
    return option ? option.label : type;
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warn';
      case 'rejected': return 'danger';
      default: return 'info';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'approved': return 'Approved';
      case 'pending': return 'Pending';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatDuration(days: number): string {
    return days === 1 ? '1 day' : `${days} days`;
  }
}
