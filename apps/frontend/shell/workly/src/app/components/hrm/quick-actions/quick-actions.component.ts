import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { SkeletonModule } from 'primeng/skeleton';

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'info' | 'danger';
  description?: string;
  url?: string;
  command?: () => void;
  disabled?: boolean;
  badge?: {
    text: string;
    color: 'primary' | 'success' | 'warning' | 'info' | 'danger';
  };
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, BadgeModule, SkeletonModule],
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickActionsComponent {
  // Inputs
  actions = input<QuickAction[]>([]);
  loading = input<boolean>(false);
  title = input<string>('Quick Actions');
  columns = input<number>(4); // Responsive grid columns
  showDescriptions = input<boolean>(true);

  // Outputs
  onActionClick = output<QuickAction>();

  // Computed properties
  get gridColumns(): string {
    const cols = this.columns();
    return `repeat(auto-fit, minmax(${100 / cols}%, 1fr))`;
  }

  getActionColorClass(action: QuickAction): string {
    return `action-button--${action.color}`;
  }

  getBadgeColorClass(badge: QuickAction['badge']): string {
    if (!badge) return '';
    return `action-badge--${badge.color}`;
  }

  getBadgeSeverity(badge: QuickAction['badge']): 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' | null | undefined {
    if (!badge) return 'secondary';
    
    switch (badge.color) {
      case 'primary': return 'secondary';
      case 'success': return 'success';
      case 'warning': return 'warn';
      case 'info': return 'info';
      case 'danger': return 'danger';
      default: return 'secondary';
    }
  }

  handleActionClick(action: QuickAction): void {
    if (action.disabled) return;

    this.onActionClick.emit(action);

    if (action.command) {
      action.command();
    }
  }

  handleKeyPress(event: KeyboardEvent, action: QuickAction): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleActionClick(action);
    }
  }
}
