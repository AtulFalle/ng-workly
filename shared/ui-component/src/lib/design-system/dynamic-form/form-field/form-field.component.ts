import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { InputComponent } from '../../input/input.component';
import { FormControlConfig } from '../dynamic-form.types';

@Component({
  selector: 'lib-form-field',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputComponent],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent {
  // Inputs
  config = input.required<FormControlConfig>();
  formControl = input<FormControl | null>(null);

  // Computed properties
  get isRequired(): boolean {
    return this.config().required === true || 
           (this.config().validators || []).some(v => v.type === 'required');
  }

  get shouldShowLabel(): boolean {
    return this.config().showLabel !== false && !!this.config().label;
  }

  get isInvalid(): boolean {
    const control = this.formControl();
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  get fieldValue(): string {
    const control = this.formControl();
    if (control && control.value !== undefined && control.value !== null) {
      return String(control.value);
    }
    return this.config().value ?? this.config().defaultValue ?? '';
  }

  get errorMessage(): string | undefined {
    if (!this.isInvalid) return undefined;
    const control = this.formControl();
    const config = this.config();
    
    if (control?.errors) {
      if (control.errors['required']) {
        return config.validators?.find(v => v.type === 'required')?.message 
          || `${config.label || 'This field'} is required`;
      }
      if (control.errors['minlength']) {
        const validator = config.validators?.find(v => v.type === 'minLength');
        return validator?.message || `Minimum length is ${control.errors['minlength'].requiredLength}`;
      }
      if (control.errors['maxlength']) {
        const validator = config.validators?.find(v => v.type === 'maxLength');
        return validator?.message || `Maximum length is ${control.errors['maxlength'].requiredLength}`;
      }
      if (control.errors['email']) {
        const validator = config.validators?.find(v => v.type === 'email');
        return validator?.message || 'Please enter a valid email address';
      }
    }
    
    return config.errorMessage;
  }

  onValueChange(value: string): void {
    const control = this.formControl();
    if (control) {
      control.setValue(value);
      control.markAsTouched();
    }
  }

  onBlur(): void {
    const control = this.formControl();
    if (control) {
      control.markAsTouched();
    }
  }

  get fieldClass(): string {
    const layout = this.config().layout;
    const classes = ['lib-form-field'];
    
    if (layout?.className) {
      classes.push(layout.className);
    }
    
    if (layout?.columnSpan) {
      classes.push(`lib-form-field-col-${layout.columnSpan}`);
    }
    
    // Add spacing class based on config or default to comfortable
    const spacing = layout?.spacing || 'comfortable';
    classes.push(`lib-form-field-spacing-${spacing}`);
    
    return classes.join(' ');
  }
}

