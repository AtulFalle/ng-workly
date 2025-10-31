// Dialog Service
// ===============
// Service wrapper for PrimeNG DialogService with standardized configuration

import { Injectable, ComponentRef, Type } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

export interface DialogOptions {
  header?: string;
  width?: string;
  height?: string;
  modal?: boolean;
  dismissableMask?: boolean;
  closable?: boolean;
  closeOnEscape?: boolean;
  data?: any;
  styleClass?: string;
  contentStyle?: any;
  baseZIndex?: number;
  maximizable?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LibDialogService {
  constructor(private dialogService: DialogService) {}

  /**
   * Open a dialog with a component
   */
  open<T>(component: Type<T>, options?: DialogOptions): DynamicDialogRef {
    const config: DynamicDialogConfig = {
      header: options?.header || '',
      width: options?.width || '600px',
      height: options?.height,
      modal: options?.modal !== false,
      dismissableMask: options?.dismissableMask !== false,
      closable: options?.closable !== false,
      closeOnEscape: options?.closeOnEscape !== false,
      data: options?.data,
      styleClass: `lib-dynamic-dialog ${options?.styleClass || ''}`,
      contentStyle: {
        padding: '16px',
        ...options?.contentStyle
      },
      baseZIndex: options?.baseZIndex || 10000,
      maximizable: options?.maximizable || false
    };

    return this.dialogService.open(component, config);
  }

  /**
   * Open a small dialog
   */
  openSmall<T>(component: Type<T>, options?: Omit<DialogOptions, 'width'>): DynamicDialogRef {
    return this.open(component, {
      ...options,
      width: '400px'
    });
  }

  /**
   * Open a medium dialog (default)
   */
  openMedium<T>(component: Type<T>, options?: Omit<DialogOptions, 'width'>): DynamicDialogRef {
    return this.open(component, {
      ...options,
      width: '600px'
    });
  }

  /**
   * Open a large dialog
   */
  openLarge<T>(component: Type<T>, options?: Omit<DialogOptions, 'width'>): DynamicDialogRef {
    return this.open(component, {
      ...options,
      width: '900px'
    });
  }

  /**
   * Close all dialogs
   */
  closeAll(): void {
    this.dialogService.dialogComponentRefMap.forEach((ref: ComponentRef<any>) => {
      ref.destroy();
    });
  }

  /**
   * Get dialog reference
   */
  getDialogRef(): DynamicDialogRef | null {
    // This would need to be tracked per dialog instance
    // For now, return the last opened dialog
    return null;
  }
}

