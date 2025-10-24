import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent, UserProfile, NotificationItem } from '../header/header.component';
import { SidebarComponent, SidebarSection } from '../sidebar/sidebar.component';

@Component({
  selector: 'lib-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
  // Inputs
  userProfile = input<UserProfile>();
  sidebarSections = input<SidebarSection[]>([]);
  notifications = input<NotificationItem[]>([]);
  pageTitle = input<string>('Dashboard');
  pageSubtitle = input<string>('');
  showSidebar = input<boolean>(true);
  showHeader = input<boolean>(true);
  showSearch = input<boolean>(true);
  showNotifications = input<boolean>(true);
  showUserMenu = input<boolean>(true);
  sidebarCollapsed = input<boolean>(false);

  // Outputs
  onSidebarToggle = output<boolean>();
  onUserMenuClick = output<void>();
  onNotificationClick = output<NotificationItem>();
  onLogout = output<void>();
  onSearch = output<string>();

  // Local state
  isSidebarCollapsed = signal(false);

  constructor() {
    this.isSidebarCollapsed.set(this.sidebarCollapsed());
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed.set(!this.isSidebarCollapsed());
    this.onSidebarToggle.emit(this.isSidebarCollapsed());
  }

  handleUserMenuClick(): void {
    this.onUserMenuClick.emit();
  }

  handleNotificationClick(notification: NotificationItem): void {
    this.onNotificationClick.emit(notification);
  }

  handleLogout(): void {
    this.onLogout.emit();
  }

  handleSearch(query: string): void {
    this.onSearch.emit(query);
  }
}
