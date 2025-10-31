import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemingService, Theme } from '@workly/ui-component';
import { ColorPaletteService } from '@workly/ui-component';

// Shared UI Components
import { 
  DashboardLayoutComponent as UIDashboardLayoutComponent,
  UserProfile, 
  FooterSection, 
  SocialLink,
  SidebarSection,
  NotificationItem
} from '@workly/ui-component';

// HRM Components
import { HrmDashboardComponent } from '../components/hrm/hrm-dashboard/hrm-dashboard.component';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    UIDashboardLayoutComponent,
    HrmDashboardComponent,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutComponent {
  protected title = 'Workly Dashboard';
  
  themingService = inject(ThemingService);
  colorPaletteService = inject(ColorPaletteService);
  messageService = inject(MessageService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  
  availableThemes: Theme[] = this.themingService.availableThemes;
  currentTheme = this.themingService.currentTheme;
  selectedTheme = signal<Theme>(this.themingService.getCurrentTheme());
  
  // Sidebar state
  isSidebarCollapsed = signal(false);
  
  // HRM Dashboard configuration

  userProfile = signal<UserProfile>({
    name: 'John Doe',
    email: 'admin@hrm.com',
    role: 'Administrator',
    avatar: 'https://via.placeholder.com/40'
  });

  // HRM Notifications
  notifications = signal<NotificationItem[]>([
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
  ]);

  // HRM Sidebar configuration
  sidebarSections = signal<SidebarSection[]>([
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
          routerLink: '/dashboard/analytics'
        }
      ]
    },
    {
      title: 'Employee Management',
      items: [
        {
          label: 'All Employees',
          icon: 'pi pi-users',
          routerLink: '/dashboard/employees'
        },
        {
          label: 'Add Employee',
          icon: 'pi pi-user-plus',
          routerLink: '/dashboard/employees/add'
        },
        {
          label: 'Departments',
          icon: 'pi pi-building',
          routerLink: '/dashboard/departments'
        }
      ]
    },
    {
      title: 'Attendance',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          routerLink: '/dashboard/attendance/dashboard'
        },
        {
          label: 'Time Tracking',
          icon: 'pi pi-clock',
          routerLink: '/dashboard/attendance'
        },
        {
          label: 'Attendance List',
          icon: 'pi pi-list',
          routerLink: '/dashboard/attendance/list'
        },
        {
          label: 'Reports',
          icon: 'pi pi-file-pdf',
          routerLink: '/dashboard/attendance/reports'
        },
        {
          label: 'Regularization',
          icon: 'pi pi-calendar-plus',
          routerLink: '/dashboard/attendance/regularization'
        },
        {
          label: 'Request Leave',
          icon: 'pi pi-calendar-minus',
          routerLink: '/dashboard/attendance/leave-request'
        },
        {
          label: 'Approve Leave',
          icon: 'pi pi-check-circle',
          routerLink: '/dashboard/attendance/leave-approval'
        }
      ]
    },
    {
      title: 'Leave Management',
      items: [
        {
          label: 'Leave Requests',
          icon: 'pi pi-calendar',
          routerLink: '/dashboard/leave'
        },
        {
          label: 'Leave Balance',
          icon: 'pi pi-calendar-plus',
          routerLink: '/dashboard/leave/balance'
        }
      ]
    },
    {
      title: 'Payroll',
      items: [
        {
          label: 'Salary Management',
          icon: 'pi pi-dollar',
          routerLink: '/dashboard/payroll'
        },
        {
          label: 'Payslips',
          icon: 'pi pi-file',
          routerLink: '/dashboard/payroll/payslips'
        }
      ]
    },
    {
      title: 'Settings',
      items: [
        {
          label: 'Company Settings',
          icon: 'pi pi-cog',
          routerLink: '/dashboard/settings'
        },
        {
          label: 'User Management',
          icon: 'pi pi-shield',
          routerLink: '/dashboard/settings/users'
        }
      ]
    }
  ]);

  // Footer configuration
  footerSections = signal<FooterSection[]>([
    {
      title: 'Product',
      links: [
        { label: 'Features', url: '/features' },
        { label: 'Pricing', url: '/pricing' },
        { label: 'Documentation', url: '/docs' },
        { label: 'API', url: '/api' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', url: '/about' },
        { label: 'Blog', url: '/blog' },
        { label: 'Careers', url: '/careers' },
        { label: 'Contact', url: '/contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', url: '/help' },
        { label: 'Community', url: '/community' },
        { label: 'Status', url: '/status' },
        { label: 'Security', url: '/security' }
      ]
    }
  ]);

  socialLinks = signal<SocialLink[]>([
    { name: 'GitHub', icon: 'pi pi-github', url: 'https://github.com/workly', color: '#333' },
    { name: 'Twitter', icon: 'pi pi-twitter', url: 'https://twitter.com/workly', color: '#1da1f2' },
    { name: 'LinkedIn', icon: 'pi pi-linkedin', url: 'https://linkedin.com/company/workly', color: '#0077b5' },
    { name: 'Discord', icon: 'pi pi-discord', url: 'https://discord.gg/workly', color: '#5865f2' }
  ]);
  
  setTheme(theme: Theme): void {
    this.themingService.setTheme(theme);
    this.selectedTheme.set(theme);
  }
  
  toggleTheme(): void {
    this.themingService.toggleTheme();
    this.selectedTheme.set(this.themingService.getCurrentTheme());
  }

  // HRM Event Handlers

  // HRM Demo Event Handlers
  onHrmSidebarToggle(event: Event): void {
    // Extract collapsed state from event or toggle current state
    this.isSidebarCollapsed.set(!this.isSidebarCollapsed());
    // Handle sidebar toggle
  }

  onHrmUserMenuClick(): void {
    // Handle user menu click
    this.messageService.add({
      severity: 'info',
      summary: 'User Menu',
      detail: 'User menu action triggered'
    });
  }

  onHrmNotificationClick(event: Event): void {
    // Handle notification click - event will be handled by the child component
    this.messageService.add({
      severity: 'info',
      summary: 'Notification',
      detail: 'Notification clicked'
    });
  }

  onHrmLogout(): void {
    // Handle logout
    this.messageService.add({
      severity: 'warn',
      summary: 'Logout',
      detail: 'User logged out successfully'
    });
  }

  onHrmSearch(event: Event): void {
    // Handle search query - event will be handled by the child component
    this.messageService.add({
      severity: 'info',
      summary: 'Search',
      detail: 'Search triggered'
    });
  }

  hasChildRoute(): boolean {
    // Check if there are any child routes active
    return this.route.firstChild !== null;
  }
}
