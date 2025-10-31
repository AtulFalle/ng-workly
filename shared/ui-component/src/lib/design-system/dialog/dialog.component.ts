import { Component, input, output, model, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'lib-dialog',
  imports: [
    CommonModule,
    DialogModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
  // Inputs
  header = input<string>('');
  size = input<'small' | 'medium' | 'large' | 'fullscreen'>('medium');
  modal = input<boolean>(true);
  closable = input<boolean>(true);
  dismissableMask = input<boolean>(true);
  closeOnEscape = input<boolean>(true);
  styleClass = input<string>('');

  // Two-way binding for visible
  visible = model<boolean>(false);

  // Outputs
  close = output<void>();

  // Computed properties
  get dialogSize(): string {
    const size = this.size();
    return `lib-dialog-${size}`;
  }

  // Event handlers
  onHide(): void {
    this.visible.set(false);
    this.close.emit();
  }
}
