import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from '../dashboard-layout/dashboard-layout.component';
import { UserProfile, NotificationItem } from '../header/header.component';
import { SidebarSection } from '../sidebar/sidebar.component';

@Component({
  selector: 'lib-hrm-demo',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent],
  templateUrl: './hrm-demo.component.html',
  styleUrls: ['./hrm-demo.component.scss']
})
export class HrmDemoComponent {
  // Demo data
  userProfile: UserProfile = {
    name: 'John Doe',
    email: 'admin@hrm.com',
    avatar: 'https://via.placeholder.com/40',
    role: 'Administrator'
  };

  notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'New Employee Onboarded',
      message: 'Sarah Johnson has been added to the system',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      type: 'success'
    },
    {
      id: '2',
      title: 'Leave Request Pending',
      message: 'Mike Wilson has requested 3 days leave',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      type: 'info'
    },
    {
      id: '3',
      title: 'Payroll Processing',
      message: 'Monthly payroll has been processed successfully',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      type: 'success'
    }
  ];

  sidebarSections: SidebarSection[] = [
    {
      title: 'Dashboard',
      items: [
        {
          label: 'Overview',
          icon: 'pi pi-home',
          routerLink: '/dashboard'
        },
        {
          label: 'Analytics',
          icon: 'pi pi-chart-bar',
          routerLink: '/analytics'
        }
      ]
    },
    {
      title: 'Employee Management',
      items: [
        {
          label: 'All Employees',
          icon: 'pi pi-users',
          routerLink: '/employees'
        },
        {
          label: 'Add Employee',
          icon: 'pi pi-user-plus',
          routerLink: '/employees/add'
        },
        {
          label: 'Departments',
          icon: 'pi pi-building',
          routerLink: '/departments'
        }
      ]
    },
    {
      title: 'Attendance',
      items: [
        {
          label: 'Time Tracking',
          icon: 'pi pi-clock',
          routerLink: '/attendance'
        },
        {
          label: 'Reports',
          icon: 'pi pi-file-pdf',
          routerLink: '/attendance/reports'
        }
      ]
    },
    {
      title: 'Leave Management',
      items: [
        {
          label: 'Leave Requests',
          icon: 'pi pi-calendar',
          routerLink: '/leave'
        },
        {
          label: 'Leave Balance',
          icon: 'pi pi-calendar-plus',
          routerLink: '/leave/balance'
        }
      ]
    },
    {
      title: 'Payroll',
      items: [
        {
          label: 'Salary Management',
          icon: 'pi pi-dollar',
          routerLink: '/payroll'
        },
        {
          label: 'Payslips',
          icon: 'pi pi-file',
          routerLink: '/payroll/payslips'
        }
      ]
    },
    {
      title: 'Settings',
      items: [
        {
          label: 'Company Settings',
          icon: 'pi pi-cog',
          routerLink: '/settings'
        },
        {
          label: 'User Management',
          icon: 'pi pi-shield',
          routerLink: '/settings/users'
        }
      ]
    }
  ];

  // Local state
  isSidebarCollapsed = signal(false);

  onSidebarToggle(collapsed: boolean): void {
    this.isSidebarCollapsed.set(collapsed);
  }

  onUserMenuClick(): void {
    console.log('User menu clicked');
  }

  onNotificationClick(notification: NotificationItem): void {
    console.log('Notification clicked:', notification);
  }

  onLogout(): void {
    console.log('Logout clicked');
  }

  onSearch(query: string): void {
    console.log('Search query:', query);
  }
}
