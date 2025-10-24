import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';

// Import HRM components
import { StatsCardsComponent, StatCard } from '../stats-cards/stats-cards.component';
import { ActivityFeedComponent, ActivityItem } from '../activity-feed/activity-feed.component';
import { QuickActionsComponent, QuickAction } from '../quick-actions/quick-actions.component';

@Component({
  selector: 'app-hrm-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    DividerModule,
    BadgeModule,
    StatsCardsComponent,
    ActivityFeedComponent,
    QuickActionsComponent
  ],
  templateUrl: './hrm-dashboard.component.html',
  styleUrls: ['./hrm-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrmDashboardComponent {
  // Loading states
  statsLoading = signal(false);
  activitiesLoading = signal(false);
  actionsLoading = signal(false);

  // Stats data
  statsCards = signal<StatCard[]>([
    {
      id: 'total-employees',
      title: 'Total Employees',
      value: '156',
      icon: 'pi pi-users',
      color: 'primary',
      trend: {
        value: 12,
        direction: 'up'
      },
      subtitle: 'Active employees'
    },
    {
      id: 'present-today',
      title: 'Present Today',
      value: '142',
      icon: 'pi pi-clock',
      color: 'success',
      trend: {
        value: 5,
        direction: 'up'
      },
      subtitle: '91% attendance'
    },
    {
      id: 'leave-requests',
      title: 'Leave Requests',
      value: '8',
      icon: 'pi pi-calendar',
      color: 'warning',
      trend: {
        value: 2,
        direction: 'down'
      },
      subtitle: 'Pending approval'
    },
    {
      id: 'monthly-payroll',
      title: 'Monthly Payroll',
      value: '$45,230',
      icon: 'pi pi-dollar',
      color: 'info',
      trend: {
        value: 8,
        direction: 'up'
      },
      subtitle: 'This month'
    }
  ]);

  // Activities data
  activities = signal<ActivityItem[]>([
    {
      id: '1',
      title: 'New Employee Onboarded',
      description: 'Sarah Johnson has been added to the system',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      type: 'success',
      icon: 'pi pi-check',
      user: {
        name: 'HR Team',
        avatar: 'https://via.placeholder.com/24'
      },
      action: {
        label: 'View Profile',
        command: () => {
          // Handle view employee profile
        }
      }
    },
    {
      id: '2',
      title: 'Leave Request Submitted',
      description: 'Mike Wilson has requested 3 days leave',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      type: 'info',
      icon: 'pi pi-info-circle',
      user: {
        name: 'Mike Wilson',
        avatar: 'https://via.placeholder.com/24'
      },
      action: {
        label: 'Review',
        command: () => {
          // Handle review leave request
        }
      }
    },
    {
      id: '3',
      title: 'Attendance Alert',
      description: '5 employees are late today',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      type: 'warning',
      icon: 'pi pi-exclamation-triangle',
      action: {
        label: 'View Details',
        command: () => {
          // Handle view attendance details
        }
      }
    },
    {
      id: '4',
      title: 'Payroll Processing',
      description: 'Monthly payroll has been processed successfully',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      type: 'success',
      icon: 'pi pi-check-circle',
      action: {
        label: 'View Report',
        command: () => {
          // Handle view payroll report
        }
      }
    }
  ]);

  // Quick actions data
  quickActions = signal<QuickAction[]>([
    {
      id: 'add-employee',
      label: 'Add Employee',
      icon: 'pi pi-user-plus',
      color: 'primary',
      description: 'Add new employee to the system',
      command: () => {
        // Handle add employee
      }
    },
    {
      id: 'process-leave',
      label: 'Process Leave',
      icon: 'pi pi-calendar-plus',
      color: 'success',
      description: 'Review and process leave requests',
      command: () => {
        // Handle process leave
      },
      badge: {
        text: '3',
        color: 'warning'
      }
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      icon: 'pi pi-file-pdf',
      color: 'info',
      description: 'Create and download reports',
      command: () => {
        // Handle generate report
      }
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'pi pi-cog',
      color: 'warning',
      description: 'Configure system settings',
      command: () => {
        // Handle settings
      }
    }
  ]);

  // Event handlers
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onStatsCardClick(_card: StatCard): void {
    // Handle stats card click
  }

  onActivityClick(event: Event): void {
    // Handle activity click - event will be handled by the child component
    console.log('Activity clicked:', event);
  }

  onActionClick(event: Event): void {
    // Handle quick action click - event will be handled by the child component
    console.log('Action clicked:', event);
  }

  // Simulate loading states
  refreshStats(): void {
    this.statsLoading.set(true);
    setTimeout(() => {
      this.statsLoading.set(false);
    }, 1000);
  }

  refreshActivities(): void {
    this.activitiesLoading.set(true);
    setTimeout(() => {
      this.activitiesLoading.set(false);
    }, 1000);
  }

  refreshActions(): void {
    this.actionsLoading.set(true);
    setTimeout(() => {
      this.actionsLoading.set(false);
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
}
