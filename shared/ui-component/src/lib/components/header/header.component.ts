import { Component, input, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../design-system/button/button.component';
import { InputComponent } from '../../design-system/input/input.component';
import { UserCardComponent } from '../user-card/user-card.component';

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
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    UserCardComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private router = inject(Router);

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
  isUserMenuOpen = signal(false);
  isNotificationMenuOpen = signal(false);
  searchQueryValue = signal('');

  toggleUserMenu(): void {
    this.isUserMenuOpen.update(value => !value);
    this.isNotificationMenuOpen.set(false);
  }

  toggleNotificationMenu(): void {
    this.isNotificationMenuOpen.update(value => !value);
    this.isUserMenuOpen.set(false);
  }

  handleSearch(): void {
    this.searchQuery.emit(this.searchQueryValue());
  }

  onSearchInputChange(value: string): void {
    this.searchQueryValue.set(value);
    this.handleSearch();
  }

  handleNotificationClick(notification: NotificationItem): void {
    this.notificationClick.emit(notification);
    this.isNotificationMenuOpen.set(false);
  }

  handleLogout(): void {
    this.logoutClick.emit();
    this.isUserMenuOpen.set(false);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
    this.isUserMenuOpen.set(false);
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
    this.isUserMenuOpen.set(false);
  }

  navigateToHelp(): void {
    this.router.navigate(['/help']);
    this.isUserMenuOpen.set(false);
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