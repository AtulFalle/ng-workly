import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'lib-card',
  imports: [CommonModule, CardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  // Inputs
  title = input<string>();
  subtitle = input<string>();
  header = input<string>();
  footer = input<string>();
  elevation = input<boolean>(true);
  padding = input<boolean>(true);
  shadow = input<'none' | 'sm' | 'md' | 'lg'>('md');
  border = input<boolean>(true);
  compact = input<boolean>(false);

  // Computed styles
  get cardClass(): string {
    const classes = ['lib-card'];
    if (!this.padding() && !this.compact()) classes.push('lib-card-no-padding');
    if (this.compact()) classes.push('lib-card-compact');
    if (this.elevation()) classes.push('lib-card-elevated');
    classes.push(`lib-card-shadow-${this.shadow()}`);
    if (this.border()) classes.push('lib-card-bordered');
    return classes.join(' ');
  }
}

