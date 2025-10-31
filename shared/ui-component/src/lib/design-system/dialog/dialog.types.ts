// Dialog Types
// ===========
// Type definitions for dynamic dialog configuration

import { DynamicFormConfig } from '../dynamic-form/dynamic-form.types';

export type DialogSize = 'small' | 'medium' | 'large' | 'fullscreen';
export type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

export interface DialogButton {
  label: string;
  severity?: 'primary' | 'secondary' | 'success'  | 'danger';
  action?: string; // Custom action identifier
  disabled?: boolean;
  loading?: boolean;
}

export interface DialogConfig {
  // Basic configuration
  title?: string;
  subtitle?: string;
  size?: DialogSize;
  position?: DialogPosition;
  closable?: boolean; // Show close icon (default: true)
  dismissableMask?: boolean; // Close on backdrop click (default: true)
  modal?: boolean; // Modal dialog (default: true)
  
  // Content configuration
  content?: {
    type: 'text' | 'form' | 'component';
    text?: string; // For text type
    html?: string; // For HTML content
    formConfig?: DynamicFormConfig; // For form type
    component?: any; // For component type
  };
  
  // Footer configuration
  footer?: {
    show?: boolean; // Show footer (default: true)
    buttons?: DialogButton[]; // Action buttons
    align?: 'left' | 'center' | 'right' | 'space-between'; // Button alignment
  };
  
  // Styling
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  
  // Behavior
  closeOnEscape?: boolean; // Close on ESC key (default: true)
  showHeader?: boolean; // Show header section (default: true)
}

export interface DialogResult {
  action?: string; // Button action identifier
  data?: any; // Form data or custom data
  closed?: boolean; // Whether dialog was closed without action
}

