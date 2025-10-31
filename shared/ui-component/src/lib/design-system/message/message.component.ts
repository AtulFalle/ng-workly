import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

export type MessageSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
export type MessageVariant = 'default' | 'outlined' | 'simple';
export type MessageSize = 'small' | 'normal' | 'large';

@Component({
  selector: 'lib-message',
  imports: [CommonModule, MessageModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {
  // Inputs
  severity = input<MessageSeverity>('info');
  variant = input<MessageVariant>('default');
  size = input<MessageSize>('normal');
  icon = input<string | undefined>(undefined);
  text = input<string | undefined>(undefined);
  closable = input<boolean>(false);
  styleClass = input<string>('');

  // Computed properties
  get messageSeverity(): MessageSeverity {
    return this.severity();
  }

  get messageVariant(): 'outlined' | 'simple' | undefined {
    const variant = this.variant();
    if (variant === 'outlined' || variant === 'simple') {
      return variant;
    }
    return undefined;
  }

  get messageSize(): 'small' | 'large' | undefined {
    const size = this.size();
    if (size === 'small' || size === 'large') {
      return size;
    }
    return undefined;
  }
}

