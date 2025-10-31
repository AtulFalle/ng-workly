// Toast Service
// =============
// Service wrapper for PrimeNG MessageService with standardized configuration

import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export interface ToastMessage {
  severity?: ToastSeverity;
  summary?: string;
  detail?: string;
  life?: number;
  closable?: boolean;
  sticky?: boolean;
}

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastConfig {
  summary?: string;
  detail?: string;
  severity?: ToastSeverity;
  life?: number; // Auto-dismiss time in milliseconds (default: 3000)
  closable?: boolean; // Show close button (default: true)
  sticky?: boolean; // Don't auto-dismiss (default: false)
  position?: ToastPosition; // Toast position (default: top-right)
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  /**
   * Show a toast message
   */
  show(config: ToastConfig): void {
    const message: ToastMessage = {
      severity: config.severity || 'info',
      summary: config.summary || '',
      detail: config.detail || '',
      life: config.life ?? 3000, // Default 3 seconds
      closable: config.closable !== false,
      sticky: config.sticky || false
    };

    this.messageService.add(message);
  }

  /**
   * Show a success toast
   */
  success(summary: string, detail?: string, config?: Omit<ToastConfig, 'severity' | 'summary' | 'detail'>): void {
    this.show({
      ...config,
      severity: 'success',
      summary,
      detail
    });
  }

  /**
   * Show an info toast
   */
  info(summary: string, detail?: string, config?: Omit<ToastConfig, 'severity' | 'summary' | 'detail'>): void {
    this.show({
      ...config,
      severity: 'info',
      summary,
      detail
    });
  }

  /**
   * Show a warning toast
   */
  warn(summary: string, detail?: string, config?: Omit<ToastConfig, 'severity' | 'summary' | 'detail'>): void {
    this.show({
      ...config,
      severity: 'warn',
      summary,
      detail
    });
  }

  /**
   * Show an error toast
   */
  error(summary: string, detail?: string, config?: Omit<ToastConfig, 'severity' | 'summary' | 'detail'>): void {
    this.show({
      ...config,
      severity: 'error',
      summary,
      detail
    });
  }

  /**
   * Clear all toasts
   */
  clear(): void {
    this.messageService.clear();
  }
}

