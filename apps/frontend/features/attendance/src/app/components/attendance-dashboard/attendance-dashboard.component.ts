import { Component, signal, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AttendanceUtilsService } from '../../services/attendance-utils.service';
import { AttendanceDataService } from '../../services/attendance-data.service';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  totalHours: number;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'regularization-pending';
  notes?: string;
  location?: string;
  device?: string;
}

export interface AttendanceStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  averageHours: number;
  attendanceRate: number;
}

@Component({
  selector: 'app-attendance-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    DividerModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './attendance-dashboard.component.html',
  styleUrls: ['./attendance-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendanceDashboardComponent implements OnInit {
  private messageService = inject(MessageService);
  private utilsService = inject(AttendanceUtilsService);
  private dataService = inject(AttendanceDataService);

  // Constants
  private readonly TIMEOUT_STATS = 1000;
  private readonly TIMEOUT_ATTENDANCE = 1500;
  private readonly TIMEOUT_USER = 2000;
  private readonly HOURS_IN_MS = 60 * 60 * 1000;
  private readonly EIGHT_HOURS_AGO = 8 * this.HOURS_IN_MS;
  private readonly MOBILE_APP_DEVICE = 'Mobile App';

  // Signals for data and loading states
  attendanceStats = signal<AttendanceStats>({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
    averageHours: 0,
    attendanceRate: 0
  });
  statsLoading = signal<boolean>(true);

  todayAttendance = signal<AttendanceRecord[]>([]);
  attendanceLoading = signal<boolean>(true);

  currentUserAttendance = signal<AttendanceRecord | null>(null);
  userAttendanceLoading = signal<boolean>(true);

  // Check-in/Check-out state
  canCheckIn = signal<boolean>(true);
  canCheckOut = signal<boolean>(false);
  isCheckingIn = signal<boolean>(false);
  isCheckingOut = signal<boolean>(false);

  ngOnInit(): void {
    this.loadAttendanceData();
  }

  loadAttendanceData(): void {
    this.initializeLoadingStates();
    this.loadAttendanceStats();
    this.loadTodayAttendance();
    this.loadCurrentUserAttendance();
  }

  private initializeLoadingStates(): void {
    this.statsLoading.set(true);
    this.attendanceLoading.set(true);
    this.userAttendanceLoading.set(true);
  }

  private loadAttendanceStats(): void {
    setTimeout(() => {
      this.attendanceStats.set({
        totalEmployees: 156,
        presentToday: 142,
        absentToday: 8,
        lateToday: 6,
        averageHours: 8.2,
        attendanceRate: 91.0
      });
      this.statsLoading.set(false);
    }, this.TIMEOUT_STATS);
  }

  private loadTodayAttendance(): void {
    setTimeout(() => {
      this.todayAttendance.set(this.dataService.getMockAttendanceData());
      this.attendanceLoading.set(false);
    }, this.TIMEOUT_ATTENDANCE);
  }

  private loadCurrentUserAttendance(): void {
    setTimeout(() => {
      this.currentUserAttendance.set(this.dataService.getMockCurrentUserAttendance());
      this.userAttendanceLoading.set(false);
      this.canCheckIn.set(false);
      this.canCheckOut.set(true);
    }, this.TIMEOUT_USER);
  }


  handleCheckIn(): void {
    this.isCheckingIn.set(true);
    
    setTimeout(() => {
      const now = new Date();
      this.currentUserAttendance.set({
        id: 'current',
        employeeId: 'EMP001',
        employeeName: 'John Doe',
        date: now,
        checkIn: now,
        checkOut: null,
        totalHours: 0,
        status: 'present',
        location: 'Office',
        device: this.MOBILE_APP_DEVICE
      });
      
      this.canCheckIn.set(false);
      this.canCheckOut.set(true);
      this.isCheckingIn.set(false);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Check-in Successful',
        detail: `Checked in at ${now.toLocaleTimeString()}`
      });
    }, this.TIMEOUT_ATTENDANCE);
  }

  handleCheckOut(): void {
    this.isCheckingOut.set(true);
    
    setTimeout(() => {
      const now = new Date();
      const currentAttendance = this.currentUserAttendance();
      
      if (currentAttendance && currentAttendance.checkIn) {
        const checkInTime = currentAttendance.checkIn;
        const totalHours = (now.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
        
        this.currentUserAttendance.set({
          ...currentAttendance,
          checkOut: now,
          totalHours: Math.round(totalHours * 10) / 10
        });
      }
      
      this.canCheckIn.set(true);
      this.canCheckOut.set(false);
      this.isCheckingOut.set(false);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Check-out Successful',
        detail: `Checked out at ${now.toLocaleTimeString()}`
      });
    }, this.TIMEOUT_ATTENDANCE);
  }

  handleRegularizationRequest(record: AttendanceRecord): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Regularization Request',
      detail: `Regularization request submitted for ${record.employeeName}`
    });
  }

  handleViewAttendance(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Navigation',
      detail: 'Navigating to attendance list'
    });
  }

  handleViewReports(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Navigation',
      detail: 'Navigating to attendance reports'
    });
  }

  handleExportData(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Export Started',
      detail: 'Attendance data export has been initiated'
    });
  }

  getStatusSeverity(status: AttendanceRecord['status']): 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' | null | undefined {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'danger';
      case 'late': return 'warn';
      case 'half-day': return 'info';
      case 'regularization-pending': return 'contrast';
      default: return 'secondary';
    }
  }

  getStatusLabel(status: AttendanceRecord['status']): string {
    switch (status) {
      case 'present': return 'Present';
      case 'absent': return 'Absent';
      case 'late': return 'Late';
      case 'half-day': return 'Half Day';
      case 'regularization-pending': return 'Pending';
      default: return 'Unknown';
    }
  }

  formatTime(date: Date | null): string {
    return this.utilsService.formatTime(date);
  }

  formatDuration(hours: number): string {
    return this.utilsService.formatDuration(hours);
  }

  getCurrentDate(): string {
    return this.utilsService.getCurrentDate();
  }
}
