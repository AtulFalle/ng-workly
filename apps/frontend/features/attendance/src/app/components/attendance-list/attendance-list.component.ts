import { Component, signal, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
// import { CalendarModule } from 'primeng/calendar';
// import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { AttendanceListDataService } from '../../services/attendance-list-data.service';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  totalHours: number;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'regularization-pending';
  notes?: string;
  location?: string;
  device?: string;
  regularizationRequest?: {
    id: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    requestedBy: string;
    requestedAt: Date;
  };
}

export interface AttendanceFilter {
  dateRange: Date[];
  department: string;
  status: string;
  employee: string;
}

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TableModule,
    ButtonModule,
    CardModule,
    BadgeModule,
    // CalendarModule,
    // DropdownModule,
    InputTextModule
  ],
  providers: [MessageService],
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendanceListComponent implements OnInit {
  private messageService = inject(MessageService);

  // Data signals
  attendanceRecords = signal<AttendanceRecord[]>([]);
  filteredRecords = signal<AttendanceRecord[]>([]);
  loading = signal<boolean>(true);

  // Filter signals
  filters = signal<AttendanceFilter>({
    dateRange: [],
    department: '',
    status: '',
    employee: ''
  });

  // Dropdown options
  departments = signal<string[]>([
    'All Departments',
    'Human Resources',
    'Engineering',
    'Marketing',
    'Sales',
    'Finance',
    'Operations'
  ]);

  statusOptions = signal<string[]>([
    'All Status',
    'Present',
    'Absent',
    'Late',
    'Half Day',
    'Regularization Pending'
  ]);

  // Table configuration
  selectedRecords = signal<AttendanceRecord[]>([]);
  globalFilter = signal<string>('');

  private dataService = inject(AttendanceListDataService);

  // Constants for message strings
  private readonly REGULARIZATION_REQUEST = 'Regularization Request';
  private readonly REGULARIZATION_APPROVED = 'Regularization Approved';
  private readonly REGULARIZATION_REJECTED = 'Regularization Rejected';
  private readonly REGULARIZATION_PENDING = 'regularization-pending';

  ngOnInit(): void {
    this.loadAttendanceData();
  }

  loadAttendanceData(): void {
    this.loading.set(true);
    setTimeout(() => {
      const records = this.dataService.getMockAttendanceRecords();
      this.attendanceRecords.set(records);
      this.filteredRecords.set(records);
      this.loading.set(false);
    }, 1500);
  }

  applyFilters(): void {
    const filters = this.filters();
    let filtered = [...this.attendanceRecords()];

    // Date range filter
    if (filters.dateRange && filters.dateRange.length === 2) {
      const startDate = filters.dateRange[0];
      const endDate = filters.dateRange[1];
      filtered = filtered.filter(record => 
        record.date >= startDate && record.date <= endDate
      );
    }

    // Department filter
    if (filters.department && filters.department !== 'All Departments') {
      filtered = filtered.filter(record => 
        record.department === filters.department
      );
    }

    // Status filter
    if (filters.status && filters.status !== 'All Status') {
      const statusMap: { [key: string]: string } = {
        'Present': 'present',
        'Absent': 'absent',
        'Late': 'late',
        'Half Day': 'half-day',
        'Regularization Pending': this.REGULARIZATION_PENDING
      };
      filtered = filtered.filter(record => 
        record.status === statusMap[filters.status]
      );
    }

    // Employee filter
    if (filters.employee) {
      filtered = filtered.filter(record => 
        record.employeeName.toLowerCase().includes(filters.employee.toLowerCase()) ||
        record.employeeId.toLowerCase().includes(filters.employee.toLowerCase())
      );
    }

    this.filteredRecords.set(filtered);
  }

  clearFilters(): void {
    this.filters.set({
      dateRange: [],
      department: '',
      status: '',
      employee: ''
    });
    this.globalFilter.set('');
    this.filteredRecords.set([...this.attendanceRecords()]);
  }

  handleRegularizationRequest(record: AttendanceRecord): void {
    this.messageService.add({
      severity: 'info',
      summary: this.REGULARIZATION_REQUEST,
      detail: `Regularization request submitted for ${record.employeeName}`
    });
  }

  handleApproveRegularization(record: AttendanceRecord): void {
    if (record.regularizationRequest) {
      this.messageService.add({
        severity: 'success',
        summary: this.REGULARIZATION_APPROVED,
        detail: `Regularization approved for ${record.employeeName}`
      });
    }
  }

  handleRejectRegularization(record: AttendanceRecord): void {
    if (record.regularizationRequest) {
      this.messageService.add({
        severity: 'warn',
        summary: this.REGULARIZATION_REJECTED,
        detail: `Regularization rejected for ${record.employeeName}`
      });
    }
  }

  handleExportData(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Export Started',
      detail: 'Attendance data export has been initiated'
    });
  }

  handleBulkAction(action: string): void {
    const selected = this.selectedRecords();
    this.messageService.add({
      severity: 'info',
      summary: 'Bulk Action',
      detail: `${action} applied to ${selected.length} records`
    });
  }

  getStatusSeverity(status: AttendanceRecord['status']): 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' | null | undefined {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'danger';
      case 'late': return 'warn';
      case 'half-day': return 'info';
      case this.REGULARIZATION_PENDING: return 'contrast';
      default: return 'secondary';
    }
  }

  getStatusLabel(status: AttendanceRecord['status']): string {
    switch (status) {
      case 'present': return 'Present';
      case 'absent': return 'Absent';
      case 'late': return 'Late';
      case 'half-day': return 'Half Day';
      case this.REGULARIZATION_PENDING: return 'Pending';
      default: return 'Unknown';
    }
  }

  formatTime(date: Date | null): string {
    if (!date) return '--';
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatDuration(hours: number): string {
    if (hours === 0) return '--';
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  }

  getRegularizationSeverity(status: string): 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' | null | undefined {
    switch (status) {
      case 'pending': return 'warn';
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  }
}
