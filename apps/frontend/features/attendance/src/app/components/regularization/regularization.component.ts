import { Component, signal, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
// import { CalendarModule } from 'primeng/calendar';
// import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { RegularizationDataService } from '../../services/regularization-data.service';
import { RegularizationUtilsService } from '../../services/regularization-utils.service';

export interface RegularizationRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: Date;
  originalCheckIn: Date | null;
  originalCheckOut: Date | null;
  requestedCheckIn: Date;
  requestedCheckOut: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  requestedAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  comments?: string;
  attachments?: string[];
}

export interface RegularizationForm {
  employeeId: string;
  date: Date;
  originalCheckIn: Date | null;
  originalCheckOut: Date | null;
  requestedCheckIn: Date;
  requestedCheckOut: Date;
  reason: string;
  attachments: string[];
}

@Component({
  selector: 'app-regularization',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TableModule,
    BadgeModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    // CalendarModule,
    // DropdownModule
  ],
  providers: [MessageService],
  templateUrl: './regularization.component.html',
  styleUrls: ['./regularization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegularizationComponent implements OnInit {
  private messageService = inject(MessageService);
  private dataService = inject(RegularizationDataService);
  private utilsService = inject(RegularizationUtilsService);

  // Constants for duplicate strings
  private readonly REGULARIZATION_REQUEST_SUBMITTED = 'Regularization request has been submitted successfully';
  private readonly REGULARIZATION_REQUEST_CANCELLED = 'Regularization request has been cancelled';
  private readonly REGULARIZATION_REQUEST_REVIEWED = 'Regularization request has been';
  private readonly ALL_STATUS = 'All Status';

  // Data signals
  regularizationRequests = signal<RegularizationRequest[]>([]);
  loading = signal<boolean>(true);

  // Dialog state
  showRequestDialog = signal<boolean>(false);
  showReviewDialog = signal<boolean>(false);
  selectedRequest = signal<RegularizationRequest | null>(null);

  // Form data
  requestForm = signal<RegularizationForm>({
    employeeId: '',
    date: new Date(),
    originalCheckIn: null,
    originalCheckOut: null,
    requestedCheckIn: new Date(),
    requestedCheckOut: new Date(),
    reason: '',
    attachments: []
  });

  reviewForm = signal<{
    status: 'approved' | 'rejected';
    comments: string;
  }>({
    status: 'approved',
    comments: ''
  });

  // Filter options
  statusOptions = signal<string[]>([
    this.ALL_STATUS,
    'Pending',
    'Approved',
    'Rejected'
  ]);

  selectedStatus = signal<string>(this.ALL_STATUS);

  ngOnInit(): void {
    this.loadRegularizationData();
  }

  loadRegularizationData(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.regularizationRequests.set(this.dataService.getMockRegularizationRequests());
      this.loading.set(false);
    }, 1500);
  }

  getFilteredRequests(): RegularizationRequest[] {
    const requests = this.regularizationRequests();
    const status = this.selectedStatus();

    if (status === this.ALL_STATUS) {
      return requests;
    }

    const statusMap: { [key: string]: string } = {
      'Pending': 'pending',
      'Approved': 'approved',
      'Rejected': 'rejected'
    };

    return requests.filter(request => 
      request.status === statusMap[status]
    );
  }

  handleNewRequest(): void {
    this.requestForm.set({
      employeeId: 'EMP001',
      date: new Date(),
      originalCheckIn: null,
      originalCheckOut: null,
      requestedCheckIn: new Date(),
      requestedCheckOut: new Date(),
      reason: '',
      attachments: []
    });
    this.showRequestDialog.set(true);
  }

  handleSubmitRequest(): void {
    const form = this.requestForm();
    
    if (!form.reason.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please provide a reason for regularization'
      });
      return;
    }

    const newRequest: RegularizationRequest = {
      id: `REG${Date.now()}`,
      employeeId: form.employeeId,
      employeeName: 'John Doe', // This would come from employee service
      department: 'Engineering',
      date: form.date,
      originalCheckIn: form.originalCheckIn,
      originalCheckOut: form.originalCheckOut,
      requestedCheckIn: form.requestedCheckIn,
      requestedCheckOut: form.requestedCheckOut,
      reason: form.reason,
      status: 'pending',
      requestedBy: 'John Doe',
      requestedAt: new Date(),
      attachments: form.attachments
    };

    this.regularizationRequests.update(requests => [newRequest, ...requests]);
    this.showRequestDialog.set(false);
    
    this.messageService.add({
      severity: 'success',
      summary: 'Request Submitted',
      detail: this.REGULARIZATION_REQUEST_SUBMITTED
    });
  }

  handleReviewRequest(request: RegularizationRequest): void {
    this.selectedRequest.set(request);
    this.reviewForm.set({
      status: 'approved',
      comments: ''
    });
    this.showReviewDialog.set(true);
  }

  handleSubmitReview(): void {
    const request = this.selectedRequest();
    const review = this.reviewForm();

    if (!request) return;

    const updatedRequest: RegularizationRequest = {
      ...request,
      status: review.status,
      reviewedBy: 'HR Manager',
      reviewedAt: new Date(),
      comments: review.comments
    };

    this.regularizationRequests.update(requests => 
      requests.map(r => r.id === request.id ? updatedRequest : r)
    );

    this.showReviewDialog.set(false);
    this.selectedRequest.set(null);

    this.messageService.add({
      severity: 'success',
      summary: 'Review Submitted',
      detail: `${this.REGULARIZATION_REQUEST_REVIEWED} ${review.status}`
    });
  }

  handleCancelRequest(request: RegularizationRequest): void {
    this.regularizationRequests.update(requests => 
      requests.filter(r => r.id !== request.id)
    );

    this.messageService.add({
      severity: 'info',
      summary: 'Request Cancelled',
      detail: this.REGULARIZATION_REQUEST_CANCELLED
    });
  }

  getStatusSeverity(status: RegularizationRequest['status']): 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' | null | undefined {
    return this.utilsService.getStatusSeverity(status);
  }

  getStatusLabel(status: RegularizationRequest['status']): string {
    return this.utilsService.getStatusLabel(status);
  }

  formatTime(date: Date | null): string {
    return this.utilsService.formatTime(date);
  }

  formatDate(date: Date): string {
    return this.utilsService.formatDate(date);
  }

  formatDuration(start: Date, end: Date): string {
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  }

  getTimeDifference(original: Date | null, requested: Date): string {
    if (!original) return 'New Entry';
    
    const diff = (requested.getTime() - original.getTime()) / (1000 * 60);
    const absDiff = Math.abs(diff);
    
    if (diff > 0) {
      return `+${Math.round(absDiff)}m`;
    } else if (diff < 0) {
      return `-${Math.round(absDiff)}m`;
    } else {
      return 'No Change';
    }
  }
}
