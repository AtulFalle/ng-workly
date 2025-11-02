import { Component, input, output, ChangeDetectionStrategy, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { FormFieldComponent } from './form-field/form-field.component';
import { ButtonComponent } from '../button/button.component';
import { DynamicFormConfig, FormControlConfig, FormValue, FormError } from './dynamic-form.types';

@Component({
  selector: 'lib-dynamic-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent,
    ButtonComponent
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
  // Inputs
  config = input.required<DynamicFormConfig>();

  // Outputs
  submit = output<FormValue>();
  valueChange = output<FormValue>();
  reset = output<void>();
  formGroupReady = output<FormGroup>();

  // Internal state - exposed via getter
  private _formGroup = signal<FormGroup | null>(null);
  formErrors = signal<FormError>({});

  // Expose formGroup for parent access
  get formGroup(): FormGroup | null {
    return this._formGroup();
  }
  
  private fb = new FormBuilder();

  ngOnInit(): void {
    this.buildForm();
  }

  // Build reactive form from config
  private buildForm(): void {
    const formConfig: { [key: string]: AbstractControl } = {};
    const config = this.config();

    config.controls.forEach(control => {
      const validators = this.buildValidators(control);
      const defaultValue = control.value ?? control.defaultValue ?? null;
      
      formConfig[control.name] = this.fb.control(defaultValue, validators);
    });

    const form = this.fb.group(formConfig);
    this._formGroup.set(form);
    this.formGroupReady.emit(form);

    // Subscribe to form value changes
    form.valueChanges.subscribe(value => {
      this.valueChange.emit(value);
      this.validateForm(form);
    });
  }

  // Build validators from control config
  private buildValidators(control: FormControlConfig): any[] {
    const validators: any[] = [];

    if (control.validators && control.validators.length > 0) {
      control.validators.forEach(validator => {
        switch (validator.type) {
          case 'required':
            validators.push(Validators.required);
            break;
          case 'minLength':
            validators.push(Validators.minLength(validator.value || 0));
            break;
          case 'maxLength':
            validators.push(Validators.maxLength(validator.value || 0));
            break;
          case 'min':
            validators.push(Validators.min(validator.value || 0));
            break;
          case 'max':
            validators.push(Validators.max(validator.value || 0));
            break;
          case 'email':
            validators.push(Validators.email);
            break;
          case 'pattern':
            if (validator.value) {
              validators.push(Validators.pattern(validator.value));
            }
            break;
          case 'custom':
            if (validator.validatorFn) {
              validators.push((control: AbstractControl) => {
                return validator.validatorFn!(control.value) ? null : { custom: true };
              });
            }
            break;
        }
      });
    }

    return validators;
  }

  // Validate form and collect errors
  private validateForm(form: FormGroup): void {
    const errors: FormError = {};
    
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.invalid && (control.dirty || control.touched)) {
        const controlConfig = this.config().controls.find(c => c.name === key);
        errors[key] = this.getErrorMessage(control, controlConfig);
      }
    });

    this.formErrors.set(errors);
  }

  // Get error message for a control
  private getErrorMessage(control: AbstractControl, config?: FormControlConfig): string {
    if (control.errors) {
      if (control.errors['required']) {
        return config?.validators?.find(v => v.type === 'required')?.message 
          || `${config?.label || 'This field'} is required`;
      }
      if (control.errors['minlength']) {
        const validator = config?.validators?.find(v => v.type === 'minLength');
        return validator?.message || `Minimum length is ${control.errors['minlength'].requiredLength}`;
      }
      if (control.errors['maxlength']) {
        const validator = config?.validators?.find(v => v.type === 'maxLength');
        return validator?.message || `Maximum length is ${control.errors['maxlength'].requiredLength}`;
      }
      if (control.errors['min']) {
        const validator = config?.validators?.find(v => v.type === 'min');
        return validator?.message || `Minimum value is ${control.errors['min'].min}`;
      }
      if (control.errors['max']) {
        const validator = config?.validators?.find(v => v.type === 'max');
        return validator?.message || `Maximum value is ${control.errors['max'].max}`;
      }
      if (control.errors['email']) {
        const validator = config?.validators?.find(v => v.type === 'email');
        return validator?.message || 'Please enter a valid email address';
      }
      if (control.errors['pattern']) {
        const validator = config?.validators?.find(v => v.type === 'pattern');
        return validator?.message || 'Invalid format';
      }
      if (control.errors['custom']) {
        const validator = config?.validators?.find(v => v.type === 'custom');
        return validator?.message || 'Validation failed';
      }
    }
    return config?.errorMessage || 'Invalid value';
  }

  // Form handlers
  onSubmit(): void {
    const form = this._formGroup();
    if (form && form.valid) {
      this.submit.emit(form.value);
    } else {
      // Mark all fields as touched to show errors
      Object.keys(form!.controls).forEach(key => {
        form!.get(key)?.markAsTouched();
      });
      this.validateForm(form!);
    }
  }

  onReset(): void {
    const form = this._formGroup();
    if (form) {
      form.reset();
      this.formErrors.set({});
      this.reset.emit();
    }
  }

  // Public method to get form value
  getFormValue(): FormValue | null {
    const form = this._formGroup();
    return form ? form.value : null;
  }

  // Public method to check if form is valid
  isFormValid(): boolean {
    const form = this._formGroup();
    return form ? form.valid : false;
  }

  // Public method to submit form programmatically
  submitForm(): void {
    this.onSubmit();
  }

  // Public method to reset form programmatically
  resetForm(): void {
    this.onReset();
  }

  // Get sorted controls based on order
  get sortedControls(): FormControlConfig[] {
    return [...this.config().controls]
      .filter(control => !control.layout?.hidden)
      .sort((a, b) => {
        const orderA = a.layout?.order ?? 999;
        const orderB = b.layout?.order ?? 999;
        return orderA - orderB;
      });
  }

  // Get title and subtitle
  get title(): string | undefined {
    return this.config().title;
  }

  get subtitle(): string | undefined {
    return this.config().subtitle;
  }

  // Get form class based on layout
  get formLayoutClass(): string {
    const layout = this.config().layout || 'vertical';
    return `lib-dynamic-form-${layout}`;
  }

  // Get spacing class based on config
  get spacingClass(): string {
    const spacing = this.config().spacing || 'comfortable';
    return `lib-dynamic-form-spacing-${spacing}`;
  }

  // Check if grid layout
  get isGridLayout(): boolean {
    return this.config().layout === 'grid';
  }

  // Get grid columns
  get gridColumns(): number {
    return this.config().gridColumns || 12;
  }

  // Get grid template columns
  get gridTemplateColumns(): string {
    return `repeat(${this.gridColumns}, 1fr)`;
  }

  // Get form control by name (helper for template)
  getFormControl(name: string): FormControl | null {
    const form = this._formGroup();
    if (form) {
      const control = form.get(name);
      return control instanceof FormControl ? control : null;
    }
    return null;
  }

  // Check if actions should be shown
  get shouldShowActions(): boolean {
    return this.config().showActions !== false; // Default to true if not specified
  }
}

