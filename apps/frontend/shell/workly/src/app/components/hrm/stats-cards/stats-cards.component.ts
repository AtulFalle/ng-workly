import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

export interface StatCard {
  id: string;
  title: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'info' | 'danger';
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  subtitle?: string;
}

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule, CardModule, SkeletonModule],
  templateUrl: './stats-cards.component.html',
  styleUrls: ['./stats-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsCardsComponent {
  // Inputs
  cards = input<StatCard[]>([]);
  loading = input<boolean>(false);
  showTrends = input<boolean>(true);
  columns = input<number>(4); // Responsive grid columns

  // Computed properties
  get gridColumns(): string {
    const cols = this.columns();
    return `repeat(auto-fit, minmax(${100 / cols}%, 1fr))`;
  }

  getCardColorClass(card: StatCard): string {
    return `stat-card--${card.color}`;
  }

  getTrendIcon(trend: StatCard['trend']): string {
    if (!trend) return '';
    
    switch (trend.direction) {
      case 'up': return 'pi pi-arrow-up';
      case 'down': return 'pi pi-arrow-down';
      default: return 'pi pi-minus';
    }
  }

  getTrendClass(trend: StatCard['trend']): string {
    if (!trend) return '';
    
    switch (trend.direction) {
      case 'up': return 'trend-up';
      case 'down': return 'trend-down';
      default: return 'trend-neutral';
    }
  }

  getCardBorderColor(card: StatCard): string {
    switch (card.color) {
      case 'primary': return 'var(--primary-500)';
      case 'success': return 'var(--success-500)';
      case 'warning': return 'var(--warning-500)';
      case 'info': return 'var(--info-500)';
      case 'danger': return 'var(--error-500)';
      default: return 'var(--primary-500)';
    }
  }
}
