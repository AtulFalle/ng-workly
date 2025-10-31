import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

export type ButtonSeverity = 'primary' | 'secondary' | 'success' | 'info' | 'danger';
export type ButtonSize = 'small' | 'large' | undefined;

@Component({
  selector: 'lib-button',
  imports: [CommonModule, ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  // Inputs
  label = input<string>('');
  icon = input<string>();
  iconPos = input<'left' | 'right'>('left');
  severity = input<ButtonSeverity>('primary');
  size = input<ButtonSize>('small');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  outlined = input<boolean>(false);
  text = input<boolean>(false);
  rounded = input<boolean>(false);
  raised = input<boolean>(false);
  link = input<boolean>(false);
  badge = input<string>();
  badgeClass = input<string>();
  type = input<'button' | 'submit' | 'reset'>('button');

  // Outputs
  clickEvent = output<Event>();

  onClick(event: Event): void {
    if (!this.disabled() && !this.loading()) {
      this.clickEvent.emit(event);
    }
  }

  get buttonClass(): string {
    return `lib-button lib-button-${this.severity()} lib-button-${this.size()}`;
  }
}

