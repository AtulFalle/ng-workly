import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@Component({
  selector: 'lib-dynamic-dialog',
  imports: [CommonModule, DynamicDialogModule],
  template: `
   <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicDialogComponent {
  // This component provides the PrimeNG dynamic dialog structure
  // Use LibDialogService to open dialogs programmatically
}

