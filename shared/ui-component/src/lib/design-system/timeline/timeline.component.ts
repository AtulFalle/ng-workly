import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { ButtonComponent } from '../button/button.component';
import { TimelineItem, TimelineAlignment, TimelineSize, TimelineVariant } from './timeline.types';

@Component({
  selector: 'lib-timeline',
  imports: [CommonModule, TimelineModule, ButtonComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent {
  // Inputs
  items = input.required<TimelineItem[]>();
  alignment = input<TimelineAlignment>('left');
  size = input<TimelineSize>('medium');
  variant = input<TimelineVariant>('default');
  showIcons = input<boolean>(true);
  showDates = input<boolean>(true);
  showAvatars = input<boolean>(false);
  showActions = input<boolean>(true);
  styleClass = input<string>('');

  // Map alignment to PrimeNG align property
  get alignValue(): 'left' | 'right' | 'alternate' {
    return this.alignment();
  }

  // Computed properties for timeline class
  get timelineClass(): string {
    const classes = ['lib-timeline'];
    classes.push(`lib-timeline--${this.alignment()}`);
    classes.push(`lib-timeline--${this.size()}`);
    classes.push(`lib-timeline--${this.variant()}`);
    if (this.styleClass()) {
      classes.push(this.styleClass());
    }
    return classes.join(' ');
  }

  getItemClass(item: TimelineItem, index: number): string {
    const classes = ['lib-timeline-item'];
    if (item.status) {
      classes.push(`lib-timeline-item--${item.status}`);
    }
    if (item.variant) {
      classes.push(`lib-timeline-item--${item.variant}`);
    }
    return classes.join(' ');
  }

  getItemIcon(item: TimelineItem): string {
    if (item.icon) {
      return item.icon;
    }
    
    // Default icons based on status
    if (item.status === 'completed' || item.status === 'approved' || item.status === 'success') {
      return 'pi pi-check-circle';
    }
    if (item.status === 'rejected' || item.status === 'error') {
      return 'pi pi-times-circle';
    }
    if (item.status === 'in-progress' || item.status === 'pending') {
      return 'pi pi-clock';
    }
    if (item.status === 'warning') {
      return 'pi pi-exclamation-triangle';
    }
    if (item.status === 'info') {
      return 'pi pi-info-circle';
    }
    
    // Default icons based on variant
    switch (item.variant || this.variant()) {
      case 'employee':
        return 'pi pi-user';
      case 'leave':
        return 'pi pi-calendar';
      case 'attendance':
        return 'pi pi-clock';
      case 'performance':
        return 'pi pi-star';
      case 'training':
        return 'pi pi-book';
      case 'project':
        return 'pi pi-briefcase';
      case 'hiring':
        return 'pi pi-users';
      case 'payroll':
        return 'pi pi-dollar';
      default:
        return 'pi pi-circle';
    }
  }

  formatDate(date: Date): string {
    if (!this.showDates()) return '';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const months = Math.floor(diff / (86400000 * 30));
    const years = Math.floor(diff / (86400000 * 365));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    if (months < 12) return `${months}mo ago`;
    return `${years}y ago`;
  }

  formatDateFull(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  getMetadataEntries(metadata: Record<string, any>): Array<{ key: string; value: any }> {
    return Object.entries(metadata).map(([key, value]) => ({ key, value }));
  }

  handleAction(action: any, event: Event): void {
    event.stopPropagation();
    if (action.command) {
      action.command();
    }
  }
}
