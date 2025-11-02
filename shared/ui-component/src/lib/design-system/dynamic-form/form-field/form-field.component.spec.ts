import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { FormFieldComponent } from './form-field.component';
import { FormControlConfig } from '../dynamic-form.types';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  const mockConfig: FormControlConfig = {
    name: 'testField',
    type: 'text',
    label: 'Test Field',
    placeholder: 'Enter text'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('config', mockConfig);
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default formControl as null', () => {
      expect(component.formControl()).toBeNull();
    });
  });

  describe('Input Properties', () => {
    it('should accept config input', () => {
      fixture.componentRef.setInput('config', mockConfig);
      fixture.detectChanges();
      expect(component.config()).toEqual(mockConfig);
    });

    it('should accept formControl input', () => {
      const control = new FormControl('');
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      expect(component.formControl()).toBe(control);
    });
  });

  describe('isRequired', () => {
    it('should return true when required is true', () => {
      const config: FormControlConfig = {
        ...mockConfig,
        required: true
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.isRequired).toBe(true);
    });

    it('should return true when required validator is present', () => {
      const config: FormControlConfig = {
        ...mockConfig,
        validators: [{ type: 'required' }]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.isRequired).toBe(true);
    });

    it('should return false when not required and no required validator', () => {
      const config: FormControlConfig = {
        ...mockConfig,
        required: false
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.isRequired).toBe(false);
    });
  });

  describe('shouldShowLabel', () => {
    it('should return true when label is provided and showLabel is not false', () => {
      const config: FormControlConfig = {
        ...mockConfig,
        label: 'Test Label',
        showLabel: true
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.shouldShowLabel).toBe(true);
    });

    it('should return false when showLabel is false', () => {
      const config: FormControlConfig = {
        ...mockConfig,
        label: 'Test Label',
        showLabel: false
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.shouldShowLabel).toBe(false);
    });

    it('should return false when label is not provided', () => {
      const config: FormControlConfig = {
        ...mockConfig,
        label: undefined
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.shouldShowLabel).toBe(false);
    });
  });

  describe('isInvalid', () => {
    it('should return true when control is invalid and touched', () => {
      const control = new FormControl('', Validators.required);
      control.markAsTouched();
      
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      expect(component.isInvalid).toBe(true);
    });

    it('should return true when control is invalid and dirty', () => {
      const control = new FormControl('', Validators.required);
      control.markAsDirty();
      
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      expect(component.isInvalid).toBe(true);
    });

    it('should return false when control is valid', () => {
      const control = new FormControl('value');
      
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      expect(component.isInvalid).toBe(false);
    });

    it('should return false when control is invalid but not touched or dirty', () => {
      const control = new FormControl('', Validators.required);
      
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      expect(component.isInvalid).toBe(false);
    });

    it('should return false when formControl is null', () => {
      fixture.componentRef.setInput('formControl', null);
      fixture.detectChanges();
      
      expect(component.isInvalid).toBe(false);
    });
  });

  describe('fieldValue', () => {
    it('should return value from formControl when available', () => {
      const control = new FormControl('Control Value');
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      expect(component.fieldValue).toBe('Control Value');
    });

    it('should return value from config when formControl is null', () => {
      const config: FormControlConfig = {
        ...mockConfig,
        value: 'Config Value'
      };
      fixture.componentRef.setInput('config', config);
      fixture.componentRef.setInput('formControl', null);
      fixture.detectChanges();
      
      expect(component.fieldValue).toBe('Config Value');
    });

    it('should return defaultValue from config when value and formControl are not available', () => {
      const config: FormControlConfig = {
        ...mockConfig,
        defaultValue: 'Default Value'
      };
      fixture.componentRef.setInput('config', config);
      fixture.componentRef.setInput('formControl', null);
      fixture.detectChanges();
      
      expect(component.fieldValue).toBe('Default Value');
    });

    it('should return empty string when no value available', () => {
      fixture.componentRef.setInput('formControl', null);
      fixture.detectChanges();
      
      expect(component.fieldValue).toBe('');
    });

    it('should convert non-string values to string', () => {
      const control = new FormControl(123);
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      expect(component.fieldValue).toBe('123');
    });

    it('should handle null values from formControl', () => {
      const control = new FormControl(null);
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      expect(component.fieldValue).toBe('');
    });
  });

  describe('errorMessage', () => {
    it('should return undefined when field is valid', () => {
      const control = new FormControl('value');
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      expect(component.errorMessage).toBeUndefined();
    });

    it('should return required error message', () => {
      const control = new FormControl('', Validators.required);
      control.markAsTouched();
      
      const config: FormControlConfig = {
        ...mockConfig,
        validators: [{ type: 'required', message: 'Custom required message' }]
      };
      
      fixture.componentRef.setInput('config', config);
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      expect(component.errorMessage).toBe('Custom required message');
    });

    it('should return default required message when custom message not provided', () => {
      const control = new FormControl('', Validators.required);
      control.markAsTouched();
      
      const config: FormControlConfig = {
        ...mockConfig,
        label: 'Test Field',
        validators: [{ type: 'required' }]
      };
      
      fixture.componentRef.setInput('config', config);
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      expect(component.errorMessage).toBe('Test Field is required');
    });

    it('should return minLength error message', () => {
      const control = new FormControl('ab', Validators.minLength(5));
      control.markAsTouched();
      
      const config: FormControlConfig = {
        ...mockConfig,
        validators: [{ type: 'minLength', value: 5, message: 'Min length 5' }]
      };
      
      fixture.componentRef.setInput('config', config);
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      expect(component.errorMessage).toBe('Min length 5');
    });

    it('should return email error message', () => {
      const control = new FormControl('invalid', Validators.email);
      control.markAsTouched();
      
      const config: FormControlConfig = {
        ...mockConfig,
        validators: [{ type: 'email', message: 'Invalid email format' }]
      };
      
      fixture.componentRef.setInput('config', config);
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      expect(component.errorMessage).toBe('Invalid email format');
    });

    it('should return config errorMessage as fallback when no specific error', () => {
      const control = new FormControl('invalid');
      control.setErrors({ custom: true });
      control.markAsTouched();
      
      const config: FormControlConfig = {
        ...mockConfig,
        errorMessage: 'Custom error'
      };
      
      fixture.componentRef.setInput('config', config);
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      expect(component.errorMessage).toBe('Custom error');
    });
  });

  describe('onValueChange', () => {
    it('should set value on formControl', () => {
      const control = new FormControl('');
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      component.onValueChange('New Value');
      
      expect(control.value).toBe('New Value');
      expect(control.touched).toBe(true);
    });

    it('should mark control as touched', () => {
      const control = new FormControl('');
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      component.onValueChange('Value');
      
      expect(control.touched).toBe(true);
    });

    it('should not throw when formControl is null', () => {
      fixture.componentRef.setInput('formControl', null);
      fixture.detectChanges();
      
      expect(() => component.onValueChange('Value')).not.toThrow();
    });
  });

  describe('onBlur', () => {
    it('should mark control as touched', () => {
      const control = new FormControl('');
      fixture.componentRef.setInput('formControl', control);
      fixture.detectChanges();
      
      component.onBlur();
      
      expect(control.touched).toBe(true);
    });

    it('should not throw when formControl is null', () => {
      fixture.componentRef.setInput('formControl', null);
      fixture.detectChanges();
      
      expect(() => component.onBlur()).not.toThrow();
    });
  });

  describe('fieldClass', () => {
    it('should include base lib-form-field class', () => {
      fixture.detectChanges();
      const fieldClass = component.fieldClass;
      expect(fieldClass).toContain('lib-form-field');
    });

    it('should include custom className from layout', () => {
      const config: FormControlConfig = {
        ...mockConfig,
        layout: { className: 'custom-field' }
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      const fieldClass = component.fieldClass;
      expect(fieldClass).toContain('custom-field');
    });

    it('should include column span class', () => {
      const config: FormControlConfig = {
        ...mockConfig,
        layout: { columnSpan: 6 }
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      const fieldClass = component.fieldClass;
      expect(fieldClass).toContain('lib-form-field-col-6');
    });

    it('should include spacing class from layout', () => {
      const config: FormControlConfig = {
        ...mockConfig,
        layout: { spacing: 'compact' }
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      const fieldClass = component.fieldClass;
      expect(fieldClass).toContain('lib-form-field-spacing-compact');
    });

    it('should default to comfortable spacing when not specified', () => {
      fixture.detectChanges();
      const fieldClass = component.fieldClass;
      expect(fieldClass).toContain('lib-form-field-spacing-comfortable');
    });

    it('should combine all classes correctly', () => {
      const config: FormControlConfig = {
        ...mockConfig,
        layout: {
          className: 'custom',
          columnSpan: 8,
          spacing: 'generous'
        }
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      const fieldClass = component.fieldClass;
      expect(fieldClass).toContain('lib-form-field');
      expect(fieldClass).toContain('custom');
      expect(fieldClass).toContain('lib-form-field-col-8');
      expect(fieldClass).toContain('lib-form-field-spacing-generous');
    });
  });
});
