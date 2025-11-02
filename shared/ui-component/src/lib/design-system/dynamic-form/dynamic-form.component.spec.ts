import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormConfig, FormControlConfig } from './dynamic-form.types';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  const mockConfig: DynamicFormConfig = {
    controls: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        validators: [{ type: 'required' }]
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        validators: [{ type: 'required' }, { type: 'email' }]
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormComponent, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA] // Ignore child components for unit testing
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('config', mockConfig);
    fixture.detectChanges(); // Trigger ngOnInit
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should build form on init', () => {
      expect(component.formGroup()).toBeTruthy();
    });

    it('should create form controls from config', () => {
      const form = component.formGroup();
      expect(form).toBeTruthy();
      expect(form?.get('name')).toBeTruthy();
      expect(form?.get('email')).toBeTruthy();
    });
  });

  describe('Form Building', () => {
    it('should create form with default values', () => {
      const config: DynamicFormConfig = {
        controls: [
          {
            name: 'field1',
            type: 'text',
            defaultValue: 'Default Value'
          }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      // Rebuild form after config change
      component['buildForm']();
      fixture.detectChanges();
      
      const form = component.formGroup();
      expect(form?.get('field1')?.value).toBe('Default Value');
    });

    it('should create form with initial values', () => {
      const config: DynamicFormConfig = {
        controls: [
          {
            name: 'field1',
            type: 'text',
            value: 'Initial Value'
          }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      // Rebuild form after config change
      component['buildForm']();
      fixture.detectChanges();
      
      const form = component.formGroup();
      expect(form?.get('field1')?.value).toBe('Initial Value');
    });

    it('should apply required validator', () => {
      const form = component.formGroup();
      const nameControl = form?.get('name');
      
      expect(nameControl?.hasError('required')).toBe(true);
    });

    it('should apply email validator', () => {
      const form = component.formGroup();
      const emailControl = form?.get('email');
      
      emailControl?.setValue('invalid');
      expect(emailControl?.hasError('email')).toBe(true);
    });

    it('should apply minLength validator', () => {
      const config: DynamicFormConfig = {
        controls: [
          {
            name: 'field1',
            type: 'text',
            validators: [{ type: 'minLength', value: 5 }]
          }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      component['buildForm']();
      fixture.detectChanges();
      
      const form = component.formGroup();
      const control = form?.get('field1');
      control?.setValue('abc');
      
      expect(control?.hasError('minlength')).toBe(true);
    });

    it('should apply maxLength validator', () => {
      const config: DynamicFormConfig = {
        controls: [
          {
            name: 'field1',
            type: 'text',
            validators: [{ type: 'maxLength', value: 5 }]
          }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      component['buildForm']();
      fixture.detectChanges();
      
      const form = component.formGroup();
      const control = form?.get('field1');
      control?.setValue('toolong');
      
      expect(control?.hasError('maxlength')).toBe(true);
    });

    it('should apply min validator', () => {
      const config: DynamicFormConfig = {
        controls: [
          {
            name: 'field1',
            type: 'number',
            validators: [{ type: 'min', value: 10 }]
          }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      component['buildForm']();
      fixture.detectChanges();
      
      const form = component.formGroup();
      const control = form?.get('field1');
      control?.setValue(5);
      
      expect(control?.hasError('min')).toBe(true);
    });

    it('should apply max validator', () => {
      const config: DynamicFormConfig = {
        controls: [
          {
            name: 'field1',
            type: 'number',
            validators: [{ type: 'max', value: 10 }]
          }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      component['buildForm']();
      fixture.detectChanges();
      
      const form = component.formGroup();
      const control = form?.get('field1');
      control?.setValue(15);
      
      expect(control?.hasError('max')).toBe(true);
    });

    it('should apply pattern validator', () => {
      const config: DynamicFormConfig = {
        controls: [
          {
            name: 'field1',
            type: 'text',
            validators: [{ type: 'pattern', value: '^[A-Z]+$' }]
          }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      component['buildForm']();
      fixture.detectChanges();
      
      const form = component.formGroup();
      const control = form?.get('field1');
      control?.setValue('abc');
      
      expect(control?.hasError('pattern')).toBe(true);
    });

    it('should apply custom validator', () => {
      const config: DynamicFormConfig = {
        controls: [
          {
            name: 'field1',
            type: 'text',
            validators: [{
              type: 'custom',
              validatorFn: (value: any) => value === 'valid'
            }]
          }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      component['buildForm']();
      fixture.detectChanges();
      
      const form = component.formGroup();
      const control = form?.get('field1');
      control?.setValue('invalid');
      
      expect(control?.hasError('custom')).toBe(true);
    });

    it('should handle null default value', () => {
      const config: DynamicFormConfig = {
        controls: [
          {
            name: 'field1',
            type: 'text',
            defaultValue: null
          }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      component['buildForm']();
      fixture.detectChanges();
      
      const form = component.formGroup();
      expect(form?.get('field1')?.value).toBeNull();
    });
  });

  describe('Form Value Changes', () => {
    it('should emit valueChange on form value change', () => {
      jest.spyOn(component.valueChange, 'emit');
      
      const form = component.formGroup();
      form?.get('name')?.setValue('New Value');
      
      // Wait for async validation
      fixture.detectChanges();
      
      expect(component.valueChange.emit).toHaveBeenCalled();
    });

    it('should validate form on value change', () => {
      const form = component.formGroup();
      
      const control = form?.get('name');
      control?.setValue('Test');
      control?.markAsTouched();
      
      // Wait for validation to complete
      fixture.detectChanges();
      
      expect(component.formErrors()).toBeDefined();
    });
  });

  describe('Form Submission', () => {
    it('should emit submit when form is valid', () => {
      const form = component.formGroup();
      
      form?.get('name')?.setValue('John Doe');
      form?.get('email')?.setValue('john@example.com');
      fixture.detectChanges();
      
      jest.spyOn(component.submit, 'emit');
      
      component.onSubmit();
      
      expect(component.submit.emit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    it('should not emit submit when form is invalid', () => {
      jest.spyOn(component.submit, 'emit');
      
      component.onSubmit();
      
      expect(component.submit.emit).not.toHaveBeenCalled();
    });

    it('should mark all fields as touched when invalid form submitted', () => {
      const form = component.formGroup();
      const nameControl = form?.get('name');
      const emailControl = form?.get('email');
      
      component.onSubmit();
      fixture.detectChanges();
      
      expect(nameControl?.touched).toBe(true);
      expect(emailControl?.touched).toBe(true);
    });
  });

  describe('Form Reset', () => {
    it('should reset form and emit reset event', () => {
      const form = component.formGroup();
      
      form?.get('name')?.setValue('Test');
      form?.get('email')?.setValue('test@example.com');
      fixture.detectChanges();
      
      jest.spyOn(component.reset, 'emit');
      
      component.onReset();
      fixture.detectChanges();
      
      expect(form?.get('name')?.value).toBeNull();
      expect(form?.get('email')?.value).toBeNull();
      expect(component.reset.emit).toHaveBeenCalled();
      expect(component.formErrors()).toEqual({});
    });
  });

  describe('Error Messages', () => {
    it('should generate required error message', () => {
      const form = component.formGroup();
      const control = form?.get('name');
      control?.markAsTouched();
      
      component.onSubmit(); // Trigger validation
      fixture.detectChanges();
      
      const errors = component.formErrors();
      expect(errors['name']).toBeTruthy();
      expect(errors['name']).toContain('required');
    });

    it('should use custom error message from validator', () => {
      const config: DynamicFormConfig = {
        controls: [
          {
            name: 'field1',
            type: 'text',
            label: 'Field 1',
            validators: [{ type: 'required', message: 'Custom required message' }]
          }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      component['buildForm']();
      fixture.detectChanges();
      
      const form = component.formGroup();
      const control = form?.get('field1');
      control?.markAsTouched();
      
      component.onSubmit();
      fixture.detectChanges();
      
      const errors = component.formErrors();
      expect(errors['field1']).toBe('Custom required message');
    });

    it('should generate minLength error message', () => {
      const config: DynamicFormConfig = {
        controls: [
          {
            name: 'field1',
            type: 'text',
            validators: [{ type: 'minLength', value: 5 }]
          }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      component['buildForm']();
      fixture.detectChanges();
      
      const form = component.formGroup();
      const control = form?.get('field1');
      control?.setValue('abc');
      control?.markAsTouched();
      
      component.onSubmit();
      fixture.detectChanges();
      
      const errors = component.formErrors();
      expect(errors['field1']).toContain('Minimum length');
    });

    it('should generate email error message', () => {
      const form = component.formGroup();
      const control = form?.get('email');
      control?.setValue('invalid-email');
      control?.markAsTouched();
      
      component.onSubmit();
      fixture.detectChanges();
      
      const errors = component.formErrors();
      expect(errors['email']).toBeTruthy();
    });
  });

  describe('Computed Properties', () => {
    it('should return title from config', () => {
      const config: DynamicFormConfig = {
        ...mockConfig,
        title: 'Form Title'
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.title).toBe('Form Title');
    });

    it('should return subtitle from config', () => {
      const config: DynamicFormConfig = {
        ...mockConfig,
        subtitle: 'Form Subtitle'
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.subtitle).toBe('Form Subtitle');
    });

    it('should return formLayoutClass', () => {
      const config: DynamicFormConfig = {
        ...mockConfig,
        layout: 'horizontal'
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.formLayoutClass).toBe('lib-dynamic-form-horizontal');
    });

    it('should return spacingClass', () => {
      const config: DynamicFormConfig = {
        ...mockConfig,
        spacing: 'compact'
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.spacingClass).toBe('lib-dynamic-form-spacing-compact');
    });

    it('should return isGridLayout correctly', () => {
      const config: DynamicFormConfig = {
        ...mockConfig,
        layout: 'grid'
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.isGridLayout).toBe(true);
    });

    it('should return gridColumns', () => {
      const config: DynamicFormConfig = {
        ...mockConfig,
        gridColumns: 6
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.gridColumns).toBe(6);
    });

    it('should return default gridColumns as 12', () => {
      expect(component.gridColumns).toBe(12);
    });

    it('should return gridTemplateColumns', () => {
      const config: DynamicFormConfig = {
        ...mockConfig,
        gridColumns: 6
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.gridTemplateColumns).toBe('repeat(6, 1fr)');
    });
  });

  describe('sortedControls', () => {
    it('should return controls sorted by order', () => {
      const config: DynamicFormConfig = {
        controls: [
          { name: 'field1', type: 'text', layout: { order: 3 } },
          { name: 'field2', type: 'text', layout: { order: 1 } },
          { name: 'field3', type: 'text', layout: { order: 2 } }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      const sorted = component.sortedControls;
      expect(sorted[0].name).toBe('field2');
      expect(sorted[1].name).toBe('field3');
      expect(sorted[2].name).toBe('field1');
    });

    it('should filter hidden controls', () => {
      const config: DynamicFormConfig = {
        controls: [
          { name: 'field1', type: 'text' },
          { name: 'field2', type: 'text', layout: { hidden: true } },
          { name: 'field3', type: 'text' }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      const sorted = component.sortedControls;
      expect(sorted.length).toBe(2);
      expect(sorted.find(c => c.name === 'field2')).toBeUndefined();
    });

    it('should handle controls without order', () => {
      const config: DynamicFormConfig = {
        controls: [
          { name: 'field1', type: 'text' },
          { name: 'field2', type: 'text', layout: { order: 1 } }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      const sorted = component.sortedControls;
      expect(sorted[0].name).toBe('field2');
      expect(sorted[1].name).toBe('field1');
    });
  });

  describe('getFormControl', () => {
    it('should return FormControl by name', () => {
      const control = component.getFormControl('name');
      
      expect(control).toBeTruthy();
      expect(control).toBeInstanceOf(FormControl);
    });

    it('should return null for non-existent control', () => {
      const control = component.getFormControl('nonexistent');
      
      expect(control).toBeNull();
    });

    it('should return null when formGroup is null', () => {
      component['formGroup'].set(null);
      
      const control = component.getFormControl('name');
      expect(control).toBeNull();
    });
  });
});
