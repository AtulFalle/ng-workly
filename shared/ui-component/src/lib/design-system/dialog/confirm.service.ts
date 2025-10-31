// Confirm Service
// ===============
// Service wrapper for PrimeNG ConfirmationService with standardized configuration

import { Injectable } from '@angular/core';
import { ConfirmationService, Confirmation } from 'primeng/api';

export interface ConfirmConfig {
  message?: string;
  header?: string;
  icon?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptIcon?: string;
  rejectIcon?: string;
  acceptButtonStyleClass?: string;
  rejectButtonStyleClass?: string;
  defaultFocus?: 'accept' | 'reject';
  accept?: () => void;
  reject?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  constructor(private confirmationService: ConfirmationService) {}

  /**
   * Show a confirmation dialog
   */
  confirm(config: ConfirmConfig): void {
    const confirmation: Confirmation = {
      message: config.message || 'Are you sure you want to proceed?',
      header: config.header || 'Confirmation',
      icon: config.icon || 'pi pi-exclamation-triangle',
      acceptLabel: config.acceptLabel || 'Yes',
      rejectLabel: config.rejectLabel || 'No',
      acceptIcon: config.acceptIcon,
      rejectIcon: config.rejectIcon,
      acceptButtonStyleClass: config.acceptButtonStyleClass || 'p-button-primary',
      rejectButtonStyleClass: config.rejectButtonStyleClass || 'p-button-secondary',
      defaultFocus: config.defaultFocus || 'accept',
      accept: config.accept,
      reject: config.reject
    };

    this.confirmationService.confirm(confirmation);
  }

  /**
   * Show a delete confirmation dialog
   */
  confirmDelete(config?: Omit<ConfirmConfig, 'header' | 'acceptLabel' | 'rejectLabel'>): void {
    this.confirm({
      header: 'Confirm Delete',
      message: config?.message || 'Are you sure you want to delete this item? This action cannot be undone.',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger',
      ...config
    });
  }

  /**
   * Show a save confirmation dialog
   */
  confirmSave(config?: Omit<ConfirmConfig, 'header' | 'acceptLabel' | 'rejectLabel'>): void {
    this.confirm({
      header: 'Confirm Save',
      message: config?.message || 'Are you sure you want to save these changes?',
      icon: 'pi pi-question-circle',
      acceptLabel: 'Save',
      rejectLabel: 'Cancel',
      ...config
    });
  }

  /**
   * Show a warning confirmation dialog
   */
  confirmWarning(config?: Omit<ConfirmConfig, 'header' | 'acceptLabel' | 'rejectLabel'>): void {
    this.confirm({
      header: 'Warning',
      message: config?.message || 'This action may have unintended consequences. Are you sure you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Proceed',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-warning',
      ...config
    });
  }

  /**
   * Close confirmation dialog
   */
  close(): void {
    this.confirmationService.close();
  }
}

