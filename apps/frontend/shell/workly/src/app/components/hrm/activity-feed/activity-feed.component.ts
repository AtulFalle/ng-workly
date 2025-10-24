import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'success' | 'info' | 'warning' | 'error';
  icon: string;
  user?: {
    name: string;
    avatar?: string;
  };
  action?: {
    label: string;
    url?: string;
    command?: () => void;
  };
}

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [CommonModule, CardModule, AvatarModule, BadgeModule, ButtonModule, SkeletonModule],
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityFeedComponent {
  // Inputs
  activities = input<ActivityItem[]>([]);
  loading = input<boolean>(false);
  maxItems = input<number>(10);
  showUserInfo = input<boolean>(true);
  showActions = input<boolean>(true);
  title = input<string>('Recent Activity');

  // Outputs
  onActivityClick = output<ActivityItem>();
  onActionClick = output<ActivityItem>();

  // Computed properties
  get displayActivities(): ActivityItem[] {
    return this.activities().slice(0, this.maxItems());
  }

  getActivityTypeClass(activity: ActivityItem): string {
    return `activity-item--${activity.type}`;
  }

  getActivityIconClass(activity: ActivityItem): string {
    return `activity-icon--${activity.type}`;
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

  handleActivityClick(activity: ActivityItem): void {
    this.onActivityClick.emit(activity);
  }

  handleActionClick(activity: ActivityItem, event: Event): void {
    event.stopPropagation();
    this.onActionClick.emit(activity);
    
    if (activity.action?.command) {
      activity.action.command();
    }
  }

  handleViewAll(): void {
    // Emit a special event for viewing all activities
    this.onActivityClick.emit({
      id: 'view-all',
      title: 'View All Activities',
      description: 'Show all activities',
      timestamp: new Date(),
      type: 'info',
      icon: 'pi pi-list'
    });
  }
}
