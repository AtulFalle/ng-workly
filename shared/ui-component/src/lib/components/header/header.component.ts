import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // Inputs
  userProfile = input<UserProfile>();
  notifications = input<NotificationItem[]>([]);
  showNotifications = input<boolean>(true);
  showUserMenu = input<boolean>(true);
  showSearch = input<boolean>(true);
  title = input<string>('Dashboard');
  subtitle = input<string>('');

  // Outputs
  toggleSidebar = output<void>();
  userMenuClick = output<void>();
  notificationClick = output<NotificationItem>();
  logoutClick = output<void>();
  searchQuery = output<string>();

  // Local state
  isUserMenuOpen = false;
  isNotificationMenuOpen = false;
  searchQueryValue = '';

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    this.isNotificationMenuOpen = false;
  }

  toggleNotificationMenu(): void {
    this.isNotificationMenuOpen = !this.isNotificationMenuOpen;
    this.isUserMenuOpen = false;
  }

  handleSearch(): void {
    this.searchQuery.emit(this.searchQueryValue);
  }

  handleNotificationClick(notification: NotificationItem): void {
    this.notificationClick.emit(notification);
    this.isNotificationMenuOpen = false;
  }

  handleLogout(): void {
    this.logoutClick.emit();
    this.isUserMenuOpen = false;
  }

  handleToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  getUnreadNotificationCount(): number {
    return this.notifications().filter(n => !n.read).length;
  }

  formatTimestamp(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }
}