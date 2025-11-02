import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default layout as vertical', () => {
      expect(component.layout()).toBe('vertical');
    });

    it('should have default spacing as comfortable', () => {
      expect(component.spacing()).toBe('comfortable');
    });

    it('should have default showLabels as true', () => {
      expect(component.showLabels()).toBe(true);
    });

    it('should have default showValidation as true', () => {
      expect(component.showValidation()).toBe(true);
    });

    it('should have default formGroup as null', () => {
      expect(component.formGroup()).toBeNull();
    });
  });

  describe('Input Properties', () => {
    it('should accept title input', () => {
      fixture.componentRef.setInput('title', 'Form Title');
      fixture.detectChanges();
      expect(component.title()).toBe('Form Title');
    });

    it('should accept subtitle input', () => {
      fixture.componentRef.setInput('subtitle', 'Form Subtitle');
      fixture.detectChanges();
      expect(component.subtitle()).toBe('Form Subtitle');
    });

    it('should accept formGroup input', () => {
      const formGroup = new FormGroup({
        name: new FormControl('')
      });
      fixture.componentRef.setInput('formGroup', formGroup);
      fixture.detectChanges();
      expect(component.formGroup()).toBe(formGroup);
    });

    it('should accept layout input', () => {
      const layouts: Array<'vertical' | 'horizontal' | 'inline'> = ['vertical', 'horizontal', 'inline'];
      layouts.forEach(layout => {
        fixture.componentRef.setInput('layout', layout);
        fixture.detectChanges();
        expect(component.layout()).toBe(layout);
      });
    });

    it('should accept spacing input', () => {
      const spacings: Array<'none' | 'compact' | 'comfortable'> = ['none', 'compact', 'comfortable'];
      spacings.forEach(spacing => {
        fixture.componentRef.setInput('spacing', spacing);
        fixture.detectChanges();
        expect(component.spacing()).toBe(spacing);
      });
    });

    it('should accept showLabels input', () => {
      fixture.componentRef.setInput('showLabels', false);
      fixture.detectChanges();
      expect(component.showLabels()).toBe(false);
    });

    it('should accept showValidation input', () => {
      fixture.componentRef.setInput('showValidation', false);
      fixture.detectChanges();
      expect(component.showValidation()).toBe(false);
    });
  });

  describe('Form Class', () => {
    it('should include base lib-form class', () => {
      fixture.detectChanges();
      const formClass = component.formClass;
      expect(formClass).toContain('lib-form');
    });

    it('should include layout class', () => {
      fixture.componentRef.setInput('layout', 'horizontal');
      fixture.detectChanges();
      const formClass = component.formClass;
      expect(formClass).toContain('lib-form-horizontal');
    });

    it('should include all layout variants', () => {
      const layouts: Array<'vertical' | 'horizontal' | 'inline'> = ['vertical', 'horizontal', 'inline'];
      layouts.forEach(layout => {
        fixture.componentRef.setInput('layout', layout);
        fixture.detectChanges();
        const formClass = component.formClass;
        expect(formClass).toContain(`lib-form-${layout}`);
      });
    });

    it('should include spacing class', () => {
      fixture.componentRef.setInput('spacing', 'compact');
      fixture.detectChanges();
      const formClass = component.formClass;
      expect(formClass).toContain('lib-form-spacing-compact');
    });

    it('should include all spacing variants', () => {
      const spacings: Array<'none' | 'compact' | 'comfortable'> = ['none', 'compact', 'comfortable'];
      spacings.forEach(spacing => {
        fixture.componentRef.setInput('spacing', spacing);
        fixture.detectChanges();
        const formClass = component.formClass;
        expect(formClass).toContain(`lib-form-spacing-${spacing}`);
      });
    });

    it('should include no-labels class when showLabels is false', () => {
      fixture.componentRef.setInput('showLabels', false);
      fixture.detectChanges();
      const formClass = component.formClass;
      expect(formClass).toContain('lib-form-no-labels');
    });

    it('should not include no-labels class when showLabels is true', () => {
      fixture.componentRef.setInput('showLabels', true);
      fixture.detectChanges();
      const formClass = component.formClass;
      expect(formClass).not.toContain('lib-form-no-labels');
    });

    it('should combine multiple classes correctly', () => {
      fixture.componentRef.setInput('layout', 'horizontal');
      fixture.componentRef.setInput('spacing', 'compact');
      fixture.componentRef.setInput('showLabels', false);
      fixture.detectChanges();
      
      const formClass = component.formClass;
      expect(formClass).toContain('lib-form');
      expect(formClass).toContain('lib-form-horizontal');
      expect(formClass).toContain('lib-form-spacing-compact');
      expect(formClass).toContain('lib-form-no-labels');
    });
  });

  describe('Submit Event', () => {
    it('should emit submit when form is valid', () => {
      const formGroup = new FormGroup({
        name: new FormControl('John Doe', Validators.required)
      });
      fixture.componentRef.setInput('formGroup', formGroup);
      fixture.detectChanges();
      
      jest.spyOn(component.submit, 'emit');
      const event = new Event('submit');
      Object.defineProperty(event, 'preventDefault', {
        value: jest.fn(),
        enumerable: true
      });
      
      component.onSubmit(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.submit.emit).toHaveBeenCalledWith(formGroup);
    });

    it('should not emit submit when form is invalid', () => {
      const formGroup = new FormGroup({
        name: new FormControl('', Validators.required)
      });
      fixture.componentRef.setInput('formGroup', formGroup);
      fixture.detectChanges();
      
      jest.spyOn(component.submit, 'emit');
      const event = new Event('submit');
      Object.defineProperty(event, 'preventDefault', {
        value: jest.fn(),
        enumerable: true
      });
      
      component.onSubmit(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.submit.emit).not.toHaveBeenCalled();
    });

    it('should not emit submit when formGroup is null', () => {
      fixture.componentRef.setInput('formGroup', null);
      fixture.detectChanges();
      
      jest.spyOn(component.submit, 'emit');
      const event = new Event('submit');
      Object.defineProperty(event, 'preventDefault', {
        value: jest.fn(),
        enumerable: true
      });
      
      component.onSubmit(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.submit.emit).not.toHaveBeenCalled();
    });

    it('should prevent default on submit', () => {
      const formGroup = new FormGroup({
        name: new FormControl('Test')
      });
      fixture.componentRef.setInput('formGroup', formGroup);
      fixture.detectChanges();
      
      const event = new Event('submit');
      const preventDefaultSpy = jest.fn();
      Object.defineProperty(event, 'preventDefault', {
        value: preventDefaultSpy,
        enumerable: true
      });
      
      component.onSubmit(event);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Reset Event', () => {
    it('should reset form and emit reset event', () => {
      const formGroup = new FormGroup({
        name: new FormControl('Test Value')
      });
      fixture.componentRef.setInput('formGroup', formGroup);
      fixture.detectChanges();
      
      jest.spyOn(component.reset, 'emit');
      jest.spyOn(formGroup, 'reset');
      
      component.onReset();
      
      expect(formGroup.reset).toHaveBeenCalled();
      expect(component.reset.emit).toHaveBeenCalled();
    });

    it('should not reset when formGroup is null', () => {
      fixture.componentRef.setInput('formGroup', null);
      fixture.detectChanges();
      
      jest.spyOn(component.reset, 'emit');
      
      component.onReset();
      
      expect(component.reset.emit).not.toHaveBeenCalled();
    });
  });

  describe('Combinations', () => {
    it('should work with all layout and spacing combinations', () => {
      const layouts: Array<'vertical' | 'horizontal' | 'inline'> = ['vertical', 'horizontal', 'inline'];
      const spacings: Array<'none' | 'compact' | 'comfortable'> = ['none', 'compact', 'comfortable'];
      
      layouts.forEach(layout => {
        spacings.forEach(spacing => {
          fixture.componentRef.setInput('layout', layout);
          fixture.componentRef.setInput('spacing', spacing);
          fixture.detectChanges();
          
          const formClass = component.formClass;
          expect(formClass).toContain(`lib-form-${layout}`);
          expect(formClass).toContain(`lib-form-spacing-${spacing}`);
        });
      });
    });
  });
});
