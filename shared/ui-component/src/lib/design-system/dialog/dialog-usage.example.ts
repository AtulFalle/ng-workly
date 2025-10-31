// Dialog Usage Examples
// =====================
// Examples showing how to use dialog components and services

import { Component, inject } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmService } from './confirm.service';
import { LibDialogService } from './dialog.service';
import { DialogConfig } from './dialog.types';
import { signal } from '@angular/core';

/**
 * Example: Using DialogComponent with config
 */
@Component({
  selector: 'example-dialog-usage',
  imports: [DialogComponent, ConfirmDialogComponent],
  template: `
    <!-- Custom Dialog Component -->
    <lib-dialog
      [config]="dialogConfig"
      [visible]="dialogVisible()"
      (close)="onDialogClose($event)"
      (buttonClick)="onDialogButtonClick($event)">
    </lib-dialog>

    <!-- PrimeNG Confirm Dialog Component -->
    <lib-confirm-dialog></lib-confirm-dialog>

    <!-- Trigger buttons -->
    <button (click)="showDialog()">Show Dialog</button>
    <button (click)="showConfirmDialog()">Show Confirm</button>
    <button (click)="showDeleteConfirm()">Show Delete Confirm</button>
  `
})
export class DialogUsageExample {
  private confirmService = inject(ConfirmService);
  private dialogService = inject(LibDialogService);

  // Dialog state
  dialogVisible = signal(false);
  dialogConfig: DialogConfig = {
    title: 'Example Dialog',
    subtitle: 'This is an example dialog',
    size: 'medium',
    content: {
      type: 'text',
      text: 'This is a dialog with configurable content.'
    },
    footer: {
      buttons: [
        { label: 'Cancel', severity: 'secondary', action: 'cancel' },
        { label: 'OK', severity: 'primary', action: 'ok' }
      ]
    }
  };

  // Show custom dialog
  showDialog(): void {
    this.dialogVisible.set(true);
  }

  onDialogClose(result: any): void {
    this.dialogVisible.set(false);
    console.log('Dialog closed:', result);
  }

  onDialogButtonClick(result: any): void {
    console.log('Button clicked:', result);
  }

  // Show confirmation dialog using ConfirmService
  showConfirmDialog(): void {
    this.confirmService.confirm({
      header: 'Confirmation',
      message: 'Are you sure you want to proceed?',
      accept: () => {
        console.log('Accepted');
      },
      reject: () => {
        console.log('Rejected');
      }
    });
  }

  // Show delete confirmation
  showDeleteConfirm(): void {
    this.confirmService.confirmDelete({
      message: 'Are you sure you want to delete this item?',
      accept: () => {
        console.log('Item deleted');
      },
      reject: () => {
        console.log('Delete cancelled');
      }
    });
  }

  // Show save confirmation
  showSaveConfirm(): void {
    this.confirmService.confirmSave({
      accept: () => {
        console.log('Changes saved');
      }
    });
  }

  // Show warning confirmation
  showWarningConfirm(): void {
    this.confirmService.confirmWarning({
      message: 'This action may have unintended consequences.',
      accept: () => {
        console.log('Proceeding with action');
      }
    });
  }

  // Open dynamic dialog with component
  openDynamicDialog(component: any): void {
    const ref = this.dialogService.open(component, {
      header: 'Dynamic Dialog',
      width: '600px',
      data: { exampleData: 'test' }
    });

    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
    });
  }
}

