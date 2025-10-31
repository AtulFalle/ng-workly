// Dynamic Form Types
// ===================
// Type definitions for dynamic form configuration

export type FormControlType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'textarea' 
  | 'select' 
  | 'checkbox' 
  | 'radio' 
  | 'date' 
  | 'file';

export type FormLayoutType = 'vertical' | 'horizontal' | 'grid';

export interface FormControlConfig {
  // Control identification
  name: string;
  type: FormControlType;
  label?: string;
  
  // Value & validation
  value?: any;
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  validators?: FormValidator[];
  
  // UI configuration
  placeholder?: string;
  hint?: string;
  errorMessage?: string;
  showLabel?: boolean;
  showClear?: boolean;
  
  // Layout configuration
  layout?: {
    columnSpan?: number;      // For grid layout (1-12)
    rowSpan?: number;          // For grid layout
    order?: number;            // Display order
    className?: string;        // Custom CSS class
    hidden?: boolean;          // Hide field
    visible?: boolean;         // Conditional visibility
    spacing?: 'none' | 'compact' | 'comfortable' | 'generous'; // Field-specific spacing
  };
  
  // Type-specific configuration
  options?: FormControlOption[];  // For select, radio, checkbox
  multiple?: boolean;             // For select
  min?: number;                   // For number, date
  max?: number;                   // For number, date
  step?: number;                  // For number
  rows?: number;                  // For textarea
  accept?: string;                 // For file input
}

export interface FormControlOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface FormValidator {
  type: 'required' | 'minLength' | 'maxLength' | 'min' | 'max' | 'pattern' | 'email' | 'custom';
  value?: any;
  message?: string;
  validatorFn?: (value: any) => boolean;
}

export interface DynamicFormConfig {
  title?: string;
  subtitle?: string;
  layout?: FormLayoutType;
  spacing?: 'none' | 'compact' | 'comfortable';
  showLabels?: boolean;
  showValidation?: boolean;
  gridColumns?: number;          // For grid layout (default: 12)
  className?: string;
  controls: FormControlConfig[];
}

export interface FormValue {
  [key: string]: any;
}

export interface FormError {
  [key: string]: string;
}

