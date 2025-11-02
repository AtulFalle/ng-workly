import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../design-system/card/card.component';
import { StatCardVariant, StatCardSize, StatCardTrend } from './stat-card.types';

@Component({
  selector: 'lib-stat-card',
  imports: [CommonModule, CardComponent],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatCardComponent {
  // Inputs
  title = input.required<string>();
  value = input<string | number>('');
  icon = input<string | undefined>(undefined);
  variant = input<StatCardVariant>('primary');
  size = input<StatCardSize>('medium');
  trend = input<StatCardTrend>('none');
  trendValue = input<string | number | undefined>(undefined);
  subtitle = input<string | undefined>(undefined);
  description = input<string | undefined>(undefined);
  showIcon = input<boolean>(true);
  showTrend = input<boolean>(true);
  loading = input<boolean>(false);
  compact = input<boolean>(true);

  // Computed properties
  get cardClass(): string {
    const classes = ['lib-stat-card'];
    classes.push(`lib-stat-card--${this.variant()}`);
    classes.push(`lib-stat-card--${this.size()}`);
    if (this.compact()) {
      classes.push('lib-stat-card--compact');
    }
    if (this.loading()) {
      classes.push('lib-stat-card--loading');
    }
    return classes.join(' ');
  }

  get iconClass(): string {
    const icon = this.icon();
    if (icon) {
      return icon.startsWith('pi ') ? icon : `pi ${icon}`;
    }
    return '';
  }

  get trendIcon(): string {
    switch (this.trend()) {
      case 'up':
        return 'pi pi-arrow-up';
      case 'down':
        return 'pi pi-arrow-down';
      case 'neutral':
        return 'pi pi-minus';
      default:
        return '';
    }
  }

  get trendClass(): string {
    const classes = ['lib-stat-card-trend'];
    classes.push(`lib-stat-card-trend--${this.trend()}`);
    return classes.join(' ');
  }

  get formattedValue(): string {
    const value = this.value();
    if (typeof value === 'number') {
      // Format large numbers with commas
      return value.toLocaleString('en-US');
    }
    return String(value);
  }

  get formattedTrendValue(): string {
    const trendValue = this.trendValue();
    if (trendValue === undefined) {
      return '';
    }

    if (typeof trendValue === 'number') {
      return `${trendValue > 0 ? '+' : ''}${trendValue.toLocaleString('en-US')}`;
    }
    return String(trendValue);
  }
}
