import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent, ButtonSeverity, ButtonSize } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default label as empty string', () => {
      expect(component.label()).toBe('');
    });

    it('should have default iconPos as left', () => {
      expect(component.iconPos()).toBe('left');
    });

    it('should have default severity as primary', () => {
      expect(component.severity()).toBe('primary');
    });

    it('should have default size as small', () => {
      expect(component.size()).toBe('small');
    });

    it('should have default disabled as false', () => {
      expect(component.disabled()).toBe(false);
    });

    it('should have default loading as false', () => {
      expect(component.loading()).toBe(false);
    });

    it('should have default type as button', () => {
      expect(component.type()).toBe('button');
    });
  });

  describe('Input Properties', () => {
    it('should accept label input', () => {
      fixture.componentRef.setInput('label', 'Click Me');
      fixture.detectChanges();
      expect(component.label()).toBe('Click Me');
    });

    it('should accept icon input', () => {
      fixture.componentRef.setInput('icon', 'pi pi-check');
      fixture.detectChanges();
      expect(component.icon()).toBe('pi pi-check');
    });

    it('should accept iconPos input', () => {
      fixture.componentRef.setInput('iconPos', 'right');
      fixture.detectChanges();
      expect(component.iconPos()).toBe('right');
    });

    it('should accept severity input', () => {
      const severities: ButtonSeverity[] = ['primary', 'secondary', 'success', 'info', 'danger'];
      severities.forEach(severity => {
        fixture.componentRef.setInput('severity', severity);
        fixture.detectChanges();
        expect(component.severity()).toBe(severity);
      });
    });

    it('should accept size input', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      expect(component.size()).toBe('large');
    });

    it('should accept disabled input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(component.disabled()).toBe(true);
    });

    it('should accept loading input', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      expect(component.loading()).toBe(true);
    });

    it('should accept outlined input', () => {
      fixture.componentRef.setInput('outlined', true);
      fixture.detectChanges();
      expect(component.outlined()).toBe(true);
    });

    it('should accept text input', () => {
      fixture.componentRef.setInput('text', true);
      fixture.detectChanges();
      expect(component.text()).toBe(true);
    });

    it('should accept rounded input', () => {
      fixture.componentRef.setInput('rounded', true);
      fixture.detectChanges();
      expect(component.rounded()).toBe(true);
    });

    it('should accept raised input', () => {
      fixture.componentRef.setInput('raised', true);
      fixture.detectChanges();
      expect(component.raised()).toBe(true);
    });

    it('should accept link input', () => {
      fixture.componentRef.setInput('link', true);
      fixture.detectChanges();
      expect(component.link()).toBe(true);
    });

    it('should accept badge input', () => {
      fixture.componentRef.setInput('badge', '5');
      fixture.detectChanges();
      expect(component.badge()).toBe('5');
    });

    it('should accept badgeClass input', () => {
      fixture.componentRef.setInput('badgeClass', 'custom-badge');
      fixture.detectChanges();
      expect(component.badgeClass()).toBe('custom-badge');
    });

    it('should accept type input', () => {
      const types: Array<'button' | 'submit' | 'reset'> = ['button', 'submit', 'reset'];
      types.forEach(type => {
        fixture.componentRef.setInput('type', type);
        fixture.detectChanges();
        expect(component.type()).toBe(type);
      });
    });
  });

  describe('Button Class', () => {
    it('should generate correct button class', () => {
      fixture.componentRef.setInput('severity', 'primary');
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      
      const buttonClass = component.buttonClass;
      expect(buttonClass).toContain('lib-button');
      expect(buttonClass).toContain('lib-button-primary');
      expect(buttonClass).toContain('lib-button-small');
    });

    it('should include severity in button class', () => {
      const severities: ButtonSeverity[] = ['primary', 'secondary', 'success', 'info', 'danger'];
      severities.forEach(severity => {
        fixture.componentRef.setInput('severity', severity);
        fixture.detectChanges();
        expect(component.buttonClass).toContain(`lib-button-${severity}`);
      });
    });

    it('should include size in button class', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      expect(component.buttonClass).toContain('lib-button-large');
    });
  });

  describe('Click Events', () => {
    it('should emit click event when onClick is called and not disabled', () => {
      jest.spyOn(component.clickEvent, 'emit');
      const event = new Event('click');
      
      component.onClick(event);
      
      expect(component.clickEvent.emit).toHaveBeenCalledWith(event);
    });

    it('should not emit click event when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      
      jest.spyOn(component.clickEvent, 'emit');
      const event = new Event('click');
      
      component.onClick(event);
      
      expect(component.clickEvent.emit).not.toHaveBeenCalled();
    });

    it('should not emit click event when loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      
      jest.spyOn(component.clickEvent, 'emit');
      const event = new Event('click');
      
      component.onClick(event);
      
      expect(component.clickEvent.emit).not.toHaveBeenCalled();
    });

    it('should not emit click event when both disabled and loading', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      
      jest.spyOn(component.clickEvent, 'emit');
      const event = new Event('click');
      
      component.onClick(event);
      
      expect(component.clickEvent.emit).not.toHaveBeenCalled();
    });
  });

  describe('Component Rendering', () => {
    it('should render with label', () => {
      fixture.componentRef.setInput('label', 'Test Button');
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('Test Button');
    });

    it('should render with icon', () => {
      fixture.componentRef.setInput('icon', 'pi pi-check');
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const icon = compiled.querySelector('[class*="pi-check"]');
      expect(icon).toBeTruthy();
    });

    it('should have correct type attribute', () => {
      fixture.componentRef.setInput('type', 'submit');
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('button');
      expect(button?.getAttribute('type')).toBe('submit');
    });
  });

  describe('Combinations', () => {
    it('should work with icon and label together', () => {
      fixture.componentRef.setInput('label', 'Save');
      fixture.componentRef.setInput('icon', 'pi pi-save');
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('Save');
      const icon = compiled.querySelector('[class*="pi-save"]');
      expect(icon).toBeTruthy();
    });

    it('should work with all severity and size combinations', () => {
      const severities: ButtonSeverity[] = ['primary', 'secondary', 'success', 'info', 'danger'];
      const sizes: ButtonSize[] = ['small', 'large'];
      
      severities.forEach(severity => {
        sizes.forEach(size => {
          fixture.componentRef.setInput('severity', severity);
          fixture.componentRef.setInput('size', size);
          fixture.detectChanges();
          
          const buttonClass = component.buttonClass;
          expect(buttonClass).toContain(`lib-button-${severity}`);
          expect(buttonClass).toContain(`lib-button-${size}`);
        });
      });
    });
  });
});
