import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';

// Design System Components
import { 
  ButtonComponent, 
  CardComponent, 
  ChartComponent,
  StatCardComponent
} from '@workly/ui-component';

import { TimelineItem } from '@workly/ui-component';

@Component({
  selector: 'app-hrm-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    CardComponent,
    ChartComponent,
    StatCardComponent
    
  ],
  templateUrl: './hrm-dashboard.component.html',
  styleUrls: ['./hrm-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrmDashboardComponent {
  // Loading states
  statsLoading = signal(false);
  activitiesLoading = signal(false);

  // Recent activities for timeline
  activities = signal<TimelineItem[]>([
    {
      id: '1',
      title: 'New Employee Onboarded',
      description: 'Sarah Johnson has been added to the system',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'success',
      variant: 'employee',
      user: {
        name: 'HR Team',
        avatar: 'https://via.placeholder.com/32'
      },
      actions: [
        {
          label: 'View Profile',
          icon: 'pi pi-eye',
          variant: 'primary',
          command: () => console.log('View profile')
        }
      ]
    },
    {
      id: '2',
      title: 'Leave Request Submitted',
      description: 'Mike Wilson has requested 3 days leave',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'pending',
      variant: 'leave',
      user: {
        name: 'Mike Wilson',
        avatar: 'https://via.placeholder.com/32'
      },
      actions: [
        {
          label: 'Review',
          icon: 'pi pi-check',
          variant: 'success',
          command: () => console.log('Review leave')
        }
      ]
    },
    {
      id: '3',
      title: 'Attendance Alert',
      description: '5 employees are late today',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      status: 'warning',
      variant: 'attendance',
      actions: [
        {
          label: 'View Details',
          icon: 'pi pi-list',
          variant: 'secondary',
          command: () => console.log('View details')
        }
      ]
    },
    {
      id: '4',
      title: 'Payroll Processing',
      description: 'Monthly payroll has been processed successfully',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'success',
      variant: 'payroll',
      actions: [
        {
          label: 'View Report',
          icon: 'pi pi-file-pdf',
          variant: 'primary',
          command: () => console.log('View report')
        }
      ]
    }
  ]);

  // Quick actions data
  quickActions = signal([
    {
      id: 'add-employee',
      label: 'Add Employee',
      icon: 'pi pi-user-plus',
      severity: 'primary' as const,
      description: 'Add new employee to the system',
      routerLink: '/dashboard/employees/add'
    },
    {
      id: 'process-leave',
      label: 'Process Leave',
      icon: 'pi pi-calendar-plus',
      severity: 'success' as const,
      description: 'Review and process leave requests',
      routerLink: '/dashboard/leave',
      badge: '3'
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      icon: 'pi pi-file-pdf',
      severity: 'info' as const,
      description: 'Create and download reports',
      routerLink: '/dashboard/reports'
    },
    {
      id: 'attendance',
      label: 'View Attendance',
      icon: 'pi pi-clock',
      severity: 'secondary' as const,
      description: 'View attendance records',
      routerLink: '/dashboard/attendance'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'pi pi-cog',
      severity: 'secondary' as const,
      description: 'Configure system settings',
      routerLink: '/dashboard/settings'
    }
  ]);

  // Event handlers
  refreshStats(): void {
    this.statsLoading.set(true);
    setTimeout(() => {
      this.statsLoading.set(false);
    }, 1000);
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Chart data for attendance trends
  attendanceChartData = computed<ChartData>(() => ({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Present',
        data: [142, 145, 140, 148, 142, 90, 80],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2
      },
      {
        label: 'Absent',
        data: [8, 5, 10, 2, 8, 60, 70],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2
      }
    ]
  }));

  attendanceChartOptions: ChartOptions = {
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
        beginAtZero: true,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  // Employee growth chart
  employeeGrowthChartData = computed<ChartData>(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Employees',
        data: [120, 125, 135, 145, 150, 156],
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        tension: 0.4
      }
    ]
  }));

  employeeGrowthChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Department distribution chart
  departmentChartData = computed<ChartData>(() => ({
    labels: ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations'],
    datasets: [
      {
        data: [45, 12, 28, 18, 15, 38],
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

  departmentChartOptions: ChartOptions = {
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

  // Monthly payroll trend
  payrollChartData = computed<ChartData>(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Payroll Amount',
        data: [42000, 43000, 44000, 43000, 45000, 45230],
        fill: true,
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        borderColor: 'rgba(251, 146, 60, 1)',
        borderWidth: 2,
        tension: 0.4
      }
    ]
  }));

  payrollChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `$${value}k`
        }
      }
    }
  };
}
