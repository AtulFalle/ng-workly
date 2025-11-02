import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserCardVariant, UserCardSize, UserCardAvatarPosition, UserCardData, UserCardConfig } from './user-card.types';

@Component({
  selector: 'lib-user-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  // Inputs
  user = input.required<UserCardData>();
  variant = input<UserCardVariant>('default');
  size = input<UserCardSize>('medium');
  avatarPosition = input<UserCardAvatarPosition>('left');
  showRole = input<boolean>(false);
  showEmail = input<boolean>(false);
  showDepartment = input<boolean>(false);
  showEmployeeId = input<boolean>(false);
  showStatus = input<boolean>(false);
  clickable = input<boolean>(false);
  bordered = input<boolean>(false);
  hoverable = input<boolean>(false);
  routerLink = input<string>();
  badge = input<string>();
  badgeSeverity = input<'success' | 'warning' | 'danger' | 'info'>('success');

  // Computed badge class
  badgeClass = computed(() => {
    return `lib-user-card-badge lib-user-card-badge--${this.badgeSeverity()}`;
  });

  // Outputs
  cardClick = output<UserCardData>();
  avatarClick = output<UserCardData>();

  // Computed properties
  userInitials = computed(() => {
    const userData = this.user();
    if (userData.initials) {
      return userData.initials;
    }
    if (!userData.name) return '';
    return this.getInitials(userData.name);
  });

  cardClass = computed(() => {
    const classes = ['lib-user-card'];
    classes.push(`lib-user-card--${this.variant()}`);
    classes.push(`lib-user-card--${this.size()}`);
    classes.push(`lib-user-card--avatar-${this.avatarPosition()}`);
    
    if (this.clickable()) {
      classes.push('lib-user-card--clickable');
    }
    if (this.bordered()) {
      classes.push('lib-user-card--bordered');
    }
    if (this.hoverable()) {
      classes.push('lib-user-card--hoverable');
    }
    
    return classes.join(' ');
  });

  avatarSize = computed(() => {
    const size = this.size();
    switch (size) {
      case 'small':
        return this.variant() === 'table' ? '24px' : '32px';
      case 'large':
        return this.variant() === 'header' ? '40px' : '64px';
      default:
        return this.variant() === 'header' ? '36px' : '48px';
    }
  });

  shouldShowRole = computed(() => {
    return this.showRole() || this.variant() === 'detailed';
  });

  shouldShowEmail = computed(() => {
    return this.showEmail() || this.variant() === 'detailed';
  });

  shouldShowDepartment = computed(() => {
    return this.showDepartment() || this.variant() === 'detailed';
  });

  shouldShowEmployeeId = computed(() => {
    return this.showEmployeeId() || this.variant() === 'detailed';
  });

  shouldShowStatus = computed(() => {
    return this.showStatus() || this.variant() === 'detailed';
  });

  statusClass = computed(() => {
    const status = this.user()?.status;
    if (!status) return '';
    return `lib-user-card-status--${status}`;
  });

  statusLabel = computed(() => {
    const status = this.user()?.status;
    if (!status) return '';
    const labels: Record<string, string> = {
      active: 'Active',
      inactive: 'Inactive',
      'on-leave': 'On Leave',
      pending: 'Pending'
    };
    return labels[status] || status;
  });

  // Methods
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  onCardClick(): void {
    if (this.clickable()) {
      this.cardClick.emit(this.user());
    }
  }

  onAvatarClick(event: Event): void {
    event.stopPropagation();
    this.avatarClick.emit(this.user());
  }
}

