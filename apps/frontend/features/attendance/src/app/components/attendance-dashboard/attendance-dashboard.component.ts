import { Component, signal, computed, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';

// Design System Components
import { 
  ButtonComponent, 
  CardComponent, 
  ChartComponent,
  StatCardComponent,
  TableComponent,
  TableColumn,
  TableConfig,
  AttendancePunchCardComponent,
  AttendancePunchCardData,
  AttendancePunchCardConfig,
  StatusChipStatus
} from '@workly/ui-component';

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
    ButtonComponent,
    CardComponent,
    ChartComponent,
    StatCardComponent,
    TableComponent,
    AttendancePunchCardComponent
  ],
  templateUrl: './attendance-dashboard.component.html',
  styleUrls: ['./attendance-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendanceDashboardComponent implements OnInit {
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
    }, this.TIMEOUT_ATTENDANCE);
  }

  handleRegularizationRequest(record: AttendanceRecord): void {
    // Regularization request handled
  }

  handleViewAttendance(): void {
    // Navigation handled by routerLink
  }

  handleViewReports(): void {
    // Navigation handled by routerLink
  }

  handleExportData(): void {
    // Export functionality
  }

  onAttendanceRowClick(row: any): void {
    // Handle row click - could navigate to details or show more info
    if (row?.rawData) {
      // Navigate to attendance details if needed
    }
  }

  // Chart data for weekly attendance trend
  weeklyAttendanceChartData = computed<ChartData>(() => {
    const stats = this.attendanceStats();
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Present',
          data: [138, 140, 142, 145, 142, 90, 80],
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2
        },
        {
          label: 'Absent',
          data: [10, 8, 6, 3, 6, 60, 70],
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 2
        },
        {
          label: 'Late',
          data: [8, 8, 6, 5, 8, 2, 2],
          backgroundColor: 'rgba(251, 146, 60, 0.8)',
          borderColor: 'rgba(251, 146, 60, 1)',
          borderWidth: 2
        }
      ]
    };
  });

  weeklyAttendanceChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  // Monthly attendance trend chart
  monthlyAttendanceChartData = computed<ChartData>(() => {
    const stats = this.attendanceStats();
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Attendance Rate',
          data: [88.5, 89.2, 90.1, 90.8, 91.0, 91.0],
          fill: true,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          tension: 0.4
        }
      ]
    };
  });

  monthlyAttendanceChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return value !== null && value !== undefined ? `${value.toFixed(1)}%` : 'N/A';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 85,
        max: 95,
        ticks: {
          callback: (value) => `${value}%`
        }
      }
    }
  };

  // Department attendance distribution
  departmentAttendanceChartData = computed<ChartData>(() => ({
    labels: ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations'],
    datasets: [
      {
        data: [
          this.attendanceStats().presentToday * 0.30,
          this.attendanceStats().presentToday * 0.08,
          this.attendanceStats().presentToday * 0.20,
          this.attendanceStats().presentToday * 0.13,
          this.attendanceStats().presentToday * 0.10,
          this.attendanceStats().presentToday * 0.19
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(14, 165, 233, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  }));

  departmentAttendanceChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = typeof context.parsed === 'number' ? context.parsed : 0;
            const dataArray = context.dataset.data;
            let total = 0;
            for (const item of dataArray) {
              if (typeof item === 'number') {
                total += item;
              }
            }
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return `${label}: ${Math.round(value)} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Check-in/Check-out time distribution
  checkInTimeChartData = computed<ChartData>(() => ({
    labels: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30+'],
    datasets: [
      {
        label: 'Check-ins',
        data: [45, 62, 28, 12, 8, 7],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2
      }
    ]
  }));

  checkInTimeChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10
        }
      }
    }
  };

  getStatusSeverity(status: AttendanceRecord['status']): 'success' | 'warning' | 'danger' | 'info' {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'danger';
      case 'late': return 'warning';
      case 'half-day': return 'info';
      case 'regularization-pending': return 'info';
      default: return 'info';
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

  // Convert attendance status to StatusChipStatus
  getStatusChipStatus(status: AttendanceRecord['status']): StatusChipStatus {
    switch (status) {
      case 'present': return 'present';
      case 'absent': return 'absent';
      case 'late': return 'late';
      case 'half-day': return 'half-day';
      case 'regularization-pending': return 'pending';
      default: return 'pending';
    }
  }

  // Table columns configuration for Today's Attendance
  attendanceTableColumns: TableColumn[] = [
    {
      field: 'employee',
      header: 'Employee',
      type: 'employee',
      sortable: true,
      filterable: true,
      width: '250px',
      frozen: true
    },
    {
      field: 'checkIn',
      header: 'Check-in',
      type: 'text',
      sortable: true,
      filterable: false,
      width: '120px',
      align: 'center'
    },
    {
      field: 'checkOut',
      header: 'Check-out',
      type: 'text',
      sortable: true,
      filterable: false,
      width: '120px',
      align: 'center'
    },
    {
      field: 'totalHours',
      header: 'Hours',
      type: 'text',
      sortable: true,
      filterable: false,
      width: '100px',
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
        { label: 'Present', value: 'present' },
        { label: 'Absent', value: 'absent' },
        { label: 'Late', value: 'late' },
        { label: 'Half Day', value: 'half-day' },
        { label: 'Pending', value: 'regularization-pending' }
      ],
      width: '130px',
      align: 'center'
    }
  ];

  // Table configuration
  attendanceTableConfig: TableConfig = {
    variant: 'attendance',
    size: 'medium',
    striped: true,
    bordered: true,
    hoverable: true,
    sortable: true,
    filterable: true,
    pagination: true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
    scrollable: true,
    scrollHeight: '400px',
    loading: false,
    emptyMessage: 'No attendance records found',
    showHeader: true
  };

  // Prepare table rows from attendance records
  attendanceTableRows = computed(() => {
    return this.todayAttendance().map(record => ({
      id: record.id,
      employee: {
        name: record.employeeName,
        employeeId: record.employeeId,
        subtitle: record.employeeId,
        avatar: undefined
      },
      checkIn: this.formatTime(record.checkIn),
      checkOut: this.formatTime(record.checkOut),
      totalHours: this.formatDuration(record.totalHours),
      status: this.getStatusChipStatus(record.status),
      statusLabel: this.getStatusLabel(record.status),
      rawData: record // Store original record for reference
    }));
  });

  // Attendance punch card data
  attendancePunchCardData = computed<AttendancePunchCardData | null>(() => {
    const attendance = this.currentUserAttendance();
    if (!attendance) return null;

    let status: AttendancePunchCardData['status'] = 'not-checked-in';
    if (attendance.status === 'present' || attendance.status === 'late') {
      status = attendance.checkOut ? 'checked-out' : 'checked-in';
      if (attendance.status === 'late') {
        status = 'late';
      }
    } else if (attendance.status === 'absent') {
      status = 'absent';
    }

    return {
      status,
      checkIn: attendance.checkIn,
      checkOut: attendance.checkOut,
      totalHours: attendance.totalHours,
      location: attendance.location,
      device: attendance.device
    };
  });

  // Attendance punch card config
  attendancePunchCardConfig: AttendancePunchCardConfig = {
    variant: 'default',
    size: 'medium',
    showLocation: true,
    showDevice: true,
    showBreakInfo: false,
    showOvertime: false,
    showScheduledTime: false,
    compactActions: false,
    allowCheckIn: true,
    allowCheckOut: true,
    allowBreakActions: false
  };

  // Handle punch card check in
  onPunchCardCheckIn(): void {
    this.handleCheckIn();
  }

  // Handle punch card check out
  onPunchCardCheckOut(): void {
    this.handleCheckOut();
  }
}
