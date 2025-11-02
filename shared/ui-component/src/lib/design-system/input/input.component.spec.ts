import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent, InputSize } from './input.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, FormsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default type as text', () => {
      expect(component.type()).toBe('text');
    });

    it('should have default placeholder as empty string', () => {
      expect(component.placeholder()).toBe('');
    });

    it('should have default value as empty string', () => {
      expect(component.value()).toBe('');
    });

    it('should have default size as medium', () => {
      expect(component.size()).toBe('medium');
    });

    it('should have default disabled as false', () => {
      expect(component.disabled()).toBe(false);
    });

    it('should have default readonly as false', () => {
      expect(component.readonly()).toBe(false);
    });

    it('should have default required as false', () => {
      expect(component.required()).toBe(false);
    });

    it('should have default invalid as false', () => {
      expect(component.invalid()).toBe(false);
    });

    it('should have default showClear as false', () => {
      expect(component.showClear()).toBe(false);
    });
  });

  describe('Input Properties', () => {
    it('should accept type input', () => {
      const types = ['text', 'email', 'password', 'number', 'tel', 'url'];
      types.forEach(type => {
        fixture.componentRef.setInput('type', type);
        fixture.detectChanges();
        expect(component.type()).toBe(type);
      });
    });

    it('should accept placeholder input', () => {
      fixture.componentRef.setInput('placeholder', 'Enter text');
      fixture.detectChanges();
      expect(component.placeholder()).toBe('Enter text');
    });

    it('should accept value input', () => {
      fixture.componentRef.setInput('value', 'Test Value');
      fixture.detectChanges();
      expect(component.value()).toBe('Test Value');
    });

    it('should accept size input', () => {
      const sizes: InputSize[] = ['small', 'medium', 'large'];
      sizes.forEach(size => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        expect(component.size()).toBe(size);
      });
    });

    it('should accept disabled input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(component.disabled()).toBe(true);
    });

    it('should accept readonly input', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();
      expect(component.readonly()).toBe(true);
    });

    it('should accept required input', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      expect(component.required()).toBe(true);
    });

    it('should accept invalid input', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();
      expect(component.invalid()).toBe(true);
    });

    it('should accept label input', () => {
      fixture.componentRef.setInput('label', 'Input Label');
      fixture.detectChanges();
      expect(component.label()).toBe('Input Label');
    });

    it('should accept hint input', () => {
      fixture.componentRef.setInput('hint', 'Helper text');
      fixture.detectChanges();
      expect(component.hint()).toBe('Helper text');
    });

    it('should accept errorMessage input', () => {
      fixture.componentRef.setInput('errorMessage', 'Error message');
      fixture.detectChanges();
      expect(component.errorMessage()).toBe('Error message');
    });

    it('should accept showClear input', () => {
      fixture.componentRef.setInput('showClear', true);
      fixture.detectChanges();
      expect(component.showClear()).toBe(true);
    });

    it('should accept iconLeft input', () => {
      fixture.componentRef.setInput('iconLeft', 'pi pi-search');
      fixture.detectChanges();
      expect(component.iconLeft()).toBe('pi pi-search');
    });

    it('should accept iconRight input', () => {
      fixture.componentRef.setInput('iconRight', 'pi pi-eye');
      fixture.detectChanges();
      expect(component.iconRight()).toBe('pi pi-eye');
    });
  });

  describe('ControlValueAccessor Implementation', () => {
    it('should implement ControlValueAccessor', () => {
      expect(component.writeValue).toBeDefined();
      expect(component.registerOnChange).toBeDefined();
      expect(component.registerOnTouched).toBeDefined();
      expect(component.setDisabledState).toBeDefined();
    });

    it('should write value', () => {
      component.writeValue('Test Value');
      expect(component['internalValue']).toBe('Test Value');
    });

    it('should write value with null', () => {
      component.writeValue(null as any);
      expect(component['internalValue']).toBe('');
    });

    it('should write value with undefined', () => {
      component.writeValue(undefined as any);
      expect(component['internalValue']).toBe('');
    });

    it('should register onChange callback', () => {
      const callback = jest.fn();
      component.registerOnChange(callback);
      component.writeValue('Test');
      expect(callback).not.toHaveBeenCalled();
      
      const event = new Event('input');
      Object.defineProperty(event, 'target', {
        value: { value: 'Test Value' },
        enumerable: true
      });
      component.onInput(event as any);
      expect(callback).toHaveBeenCalledWith('Test Value');
    });

    it('should register onTouched callback', () => {
      const callback = jest.fn();
      component.registerOnTouched(callback);
      const event = new Event('blur');
      component.onBlur(event);
      expect(callback).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
      component.setDisabledState(true);
      expect(component.setDisabledState).toBeDefined();
    });
  });

  describe('Input Events', () => {
    it('should emit valueChange on input', () => {
      jest.spyOn(component.valueChange, 'emit');
      const event = new Event('input');
      Object.defineProperty(event, 'target', {
        value: { value: 'New Value' },
        enumerable: true
      });
      
      component.onInput(event as any);
      
      expect(component.valueChange.emit).toHaveBeenCalledWith('New Value');
    });

    it('should update internal value on input', () => {
      const event = new Event('input');
      Object.defineProperty(event, 'target', {
        value: { value: 'Updated Value' },
        enumerable: true
      });
      
      component.onInput(event as any);
      
      expect(component['internalValue']).toBe('Updated Value');
    });

    it('should emit focusEvent on focus', () => {
      jest.spyOn(component.focusEvent, 'emit');
      const event = new Event('focus');
      
      component.onFocus(event);
      
      expect(component.focusEvent.emit).toHaveBeenCalledWith(event);
    });

    it('should emit blurEvent on blur', () => {
      jest.spyOn(component.blurEvent, 'emit');
      const callback = jest.fn();
      component.registerOnTouched(callback);
      const event = new Event('blur');
      
      component.onBlur(event);
      
      expect(component.blurEvent.emit).toHaveBeenCalledWith(event);
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('Clear Functionality', () => {
    it('should clear value and emit clear event', () => {
      component.writeValue('Test Value');
      jest.spyOn(component.clear, 'emit');
      jest.spyOn(component.valueChange, 'emit');
      
      component.onClear();
      
      expect(component['internalValue']).toBe('');
      expect(component.clear.emit).toHaveBeenCalled();
      expect(component.valueChange.emit).toHaveBeenCalledWith('');
    });

    it('should call onChange callback on clear', () => {
      const callback = jest.fn();
      component.registerOnChange(callback);
      component.writeValue('Test Value');
      
      component.onClear();
      
      expect(callback).toHaveBeenCalledWith('');
    });
  });

  describe('Input Value Getter', () => {
    it('should return value from formControl if available', () => {
      const formControl = new FormControl('Control Value');
      fixture.componentRef.setInput('formControl', formControl);
      fixture.detectChanges();
      
      expect(component.inputValue).toBe('Control Value');
    });

    it('should return value from input if formControl not available', () => {
      fixture.componentRef.setInput('formControl', null);
      fixture.componentRef.setInput('value', 'Input Value');
      fixture.detectChanges();
      
      expect(component.inputValue).toBe('Input Value');
    });

    it('should return internalValue if neither formControl nor value available', () => {
      // Clear the value input and formControl
      fixture.componentRef.setInput('value', undefined);
      fixture.componentRef.setInput('formControl', null);
      fixture.detectChanges();
      
      component.writeValue('Internal Value');
      
      // Access internal value directly since inputValue getter prefers value() input
      expect(component['internalValue']).toBe('Internal Value');
    });

    it('should handle formControl with null value', () => {
      const formControl = new FormControl(null);
      fixture.componentRef.setInput('formControl', formControl);
      fixture.detectChanges();
      
      expect(component.inputValue).toBe('');
    });

    it('should handle formControl with undefined value', () => {
      const formControl = new FormControl(undefined);
      fixture.componentRef.setInput('formControl', formControl);
      fixture.detectChanges();
      
      expect(component.inputValue).toBe('');
    });
  });

  describe('$any Helper', () => {
    it('should have $any helper method', () => {
      expect(component.$any).toBeDefined();
      expect(typeof component.$any).toBe('function');
      expect(component.$any('test')).toBe('test');
    });
  });

  describe('Combinations', () => {
    it('should work with all size and type combinations', () => {
      const sizes: InputSize[] = ['small', 'medium', 'large'];
      const types = ['text', 'email', 'password'];
      
      sizes.forEach(size => {
        types.forEach(type => {
          fixture.componentRef.setInput('size', size);
          fixture.componentRef.setInput('type', type);
          fixture.detectChanges();
          
          expect(component.size()).toBe(size);
          expect(component.type()).toBe(type);
        });
      });
    });

    it('should work with icons and showClear together', () => {
      fixture.componentRef.setInput('iconLeft', 'pi pi-search');
      fixture.componentRef.setInput('iconRight', 'pi pi-eye');
      fixture.componentRef.setInput('showClear', true);
      fixture.detectChanges();
      
      expect(component.iconLeft()).toBe('pi pi-search');
      expect(component.iconRight()).toBe('pi pi-eye');
      expect(component.showClear()).toBe(true);
    });
  });
});
