import { Component, signal, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
    this.statsLoading.set(true);
    this.attendanceLoading.set(true);
    this.userAttendanceLoading.set(true);

    // Simulate API calls
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
    }, 1000);

    setTimeout(() => {
      this.todayAttendance.set([
        {
          id: '1',
          employeeId: 'EMP001',
          employeeName: 'John Doe',
          date: new Date(),
          checkIn: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
          checkOut: null,
          totalHours: 8,
          status: 'present',
          location: 'Office',
          device: 'Mobile App'
        },
        {
          id: '2',
          employeeId: 'EMP002',
          employeeName: 'Jane Smith',
          date: new Date(),
          checkIn: new Date(Date.now() - 7.5 * 60 * 60 * 1000), // 7.5 hours ago
          checkOut: new Date(Date.now() - 0.5 * 60 * 60 * 1000), // 30 minutes ago
          totalHours: 7,
          status: 'present',
          location: 'Office',
          device: 'Desktop'
        },
        {
          id: '3',
          employeeId: 'EMP003',
          employeeName: 'Mike Johnson',
          date: new Date(),
          checkIn: null,
          checkOut: null,
          totalHours: 0,
          status: 'absent',
          notes: 'Sick leave'
        }
      ]);
      this.attendanceLoading.set(false);
    }, 1500);

    setTimeout(() => {
      this.currentUserAttendance.set({
        id: 'current',
        employeeId: 'EMP001',
        employeeName: 'John Doe',
        date: new Date(),
        checkIn: new Date(Date.now() - 8 * 60 * 60 * 1000),
        checkOut: null,
        totalHours: 8,
        status: 'present',
        location: 'Office',
        device: 'Mobile App'
      });
      this.userAttendanceLoading.set(false);
      this.canCheckIn.set(false);
      this.canCheckOut.set(true);
    }, 2000);
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
        device: 'Mobile App'
      });
      
      this.canCheckIn.set(false);
      this.canCheckOut.set(true);
      this.isCheckingIn.set(false);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Check-in Successful',
        detail: `Checked in at ${now.toLocaleTimeString()}`
      });
    }, 1500);
  }

  handleCheckOut(): void {
    this.isCheckingOut.set(true);
    
    setTimeout(() => {
      const now = new Date();
      const currentAttendance = this.currentUserAttendance();
      
      if (currentAttendance) {
        const checkInTime = currentAttendance.checkIn!;
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
    }, 1500);
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
    if (!date) return '--';
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }

  formatDuration(hours: number): string {
    if (hours === 0) return '--';
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
