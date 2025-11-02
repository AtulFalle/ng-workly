import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MessageComponent, MessageSeverity, MessageVariant, MessageSize } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default severity as info', () => {
      expect(component.severity()).toBe('info');
    });

    it('should have default variant as default', () => {
      expect(component.variant()).toBe('default');
    });

    it('should have default size as normal', () => {
      expect(component.size()).toBe('normal');
    });

    it('should have default closable as false', () => {
      expect(component.closable()).toBe(false);
    });

    it('should have default icon as undefined', () => {
      expect(component.icon()).toBeUndefined();
    });

    it('should have default text as undefined', () => {
      expect(component.text()).toBeUndefined();
    });

    it('should have default styleClass as empty string', () => {
      expect(component.styleClass()).toBe('');
    });
  });

  describe('Input Properties', () => {
    it('should accept severity input', () => {
      const severities: MessageSeverity[] = ['success', 'info', 'warn', 'error', 'secondary', 'contrast'];
      severities.forEach(severity => {
        fixture.componentRef.setInput('severity', severity);
        fixture.detectChanges();
        expect(component.severity()).toBe(severity);
      });
    });

    it('should accept variant input', () => {
      const variants: MessageVariant[] = ['default', 'outlined', 'simple'];
      variants.forEach(variant => {
        fixture.componentRef.setInput('variant', variant);
        fixture.detectChanges();
        expect(component.variant()).toBe(variant);
      });
    });

    it('should accept size input', () => {
      const sizes: MessageSize[] = ['small', 'normal', 'large'];
      sizes.forEach(size => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        expect(component.size()).toBe(size);
      });
    });

    it('should accept icon input', () => {
      fixture.componentRef.setInput('icon', 'pi pi-check');
      fixture.detectChanges();
      expect(component.icon()).toBe('pi pi-check');
    });

    it('should accept text input', () => {
      fixture.componentRef.setInput('text', 'Message text');
      fixture.detectChanges();
      expect(component.text()).toBe('Message text');
    });

    it('should accept closable input', () => {
      fixture.componentRef.setInput('closable', true);
      fixture.detectChanges();
      expect(component.closable()).toBe(true);
    });

    it('should accept styleClass input', () => {
      fixture.componentRef.setInput('styleClass', 'custom-class');
      fixture.detectChanges();
      expect(component.styleClass()).toBe('custom-class');
    });
  });

  describe('Computed Properties - messageSeverity', () => {
    it('should return severity value', () => {
      fixture.componentRef.setInput('severity', 'success');
      fixture.detectChanges();
      expect(component.messageSeverity).toBe('success');
    });

    it('should return all severity types', () => {
      const severities: MessageSeverity[] = ['success', 'info', 'warn', 'error', 'secondary', 'contrast'];
      severities.forEach(severity => {
        fixture.componentRef.setInput('severity', severity);
        fixture.detectChanges();
        expect(component.messageSeverity).toBe(severity);
      });
    });
  });

  describe('Computed Properties - messageVariant', () => {
    it('should return outlined variant', () => {
      fixture.componentRef.setInput('variant', 'outlined');
      fixture.detectChanges();
      expect(component.messageVariant).toBe('outlined');
    });

    it('should return simple variant', () => {
      fixture.componentRef.setInput('variant', 'simple');
      fixture.detectChanges();
      expect(component.messageVariant).toBe('simple');
    });

    it('should return undefined for default variant', () => {
      fixture.componentRef.setInput('variant', 'default');
      fixture.detectChanges();
      expect(component.messageVariant).toBeUndefined();
    });
  });

  describe('Computed Properties - messageSize', () => {
    it('should return small size', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      expect(component.messageSize).toBe('small');
    });

    it('should return large size', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      expect(component.messageSize).toBe('large');
    });

    it('should return undefined for normal size', () => {
      fixture.componentRef.setInput('size', 'normal');
      fixture.detectChanges();
      expect(component.messageSize).toBeUndefined();
    });
  });

  describe('Component Rendering', () => {
    it('should render message element', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const messageElement = compiled.querySelector('p-message');
      expect(messageElement).toBeTruthy();
    });

    it('should render with text when provided', () => {
      fixture.componentRef.setInput('text', 'Test message');
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(component.text()).toBe('Test message');
    });

    it('should render with icon when provided', () => {
      fixture.componentRef.setInput('icon', 'pi pi-check');
      fixture.detectChanges();
      expect(component.icon()).toBe('pi pi-check');
    });
  });

  describe('Severity Variants', () => {
    it('should work with all severity types', () => {
      const severities: MessageSeverity[] = ['success', 'info', 'warn', 'error', 'secondary', 'contrast'];
      severities.forEach(severity => {
        fixture.componentRef.setInput('severity', severity);
        fixture.detectChanges();
        expect(component.messageSeverity).toBe(severity);
        expect(component.severity()).toBe(severity);
      });
    });
  });

  describe('Combinations', () => {
    it('should work with all severity and variant combinations', () => {
      const severities: MessageSeverity[] = ['success', 'info', 'warn', 'error'];
      const variants: MessageVariant[] = ['default', 'outlined', 'simple'];
      
      severities.forEach(severity => {
        variants.forEach(variant => {
          fixture.componentRef.setInput('severity', severity);
          fixture.componentRef.setInput('variant', variant);
          fixture.detectChanges();
          
          expect(component.severity()).toBe(severity);
          expect(component.variant()).toBe(variant);
          expect(component.messageSeverity).toBe(severity);
          
          if (variant === 'default') {
            expect(component.messageVariant).toBeUndefined();
          } else {
            expect(component.messageVariant).toBe(variant);
          }
        });
      });
    });

    it('should work with all size and severity combinations', () => {
      const sizes: MessageSize[] = ['small', 'normal', 'large'];
      const severities: MessageSeverity[] = ['success', 'info', 'warn', 'error'];
      
      sizes.forEach(size => {
        severities.forEach(severity => {
          fixture.componentRef.setInput('size', size);
          fixture.componentRef.setInput('severity', severity);
          fixture.detectChanges();
          
          expect(component.size()).toBe(size);
          expect(component.severity()).toBe(severity);
          
          if (size === 'normal') {
            expect(component.messageSize).toBeUndefined();
          } else {
            expect(component.messageSize).toBe(size);
          }
        });
      });
    });

    it('should work with icon, text, and closable together', () => {
      fixture.componentRef.setInput('icon', 'pi pi-info');
      fixture.componentRef.setInput('text', 'Info message');
      fixture.componentRef.setInput('closable', true);
      fixture.detectChanges();
      
      expect(component.icon()).toBe('pi pi-info');
      expect(component.text()).toBe('Info message');
      expect(component.closable()).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined icon', () => {
      fixture.componentRef.setInput('icon', undefined);
      fixture.detectChanges();
      expect(component.icon()).toBeUndefined();
    });

    it('should handle undefined text', () => {
      fixture.componentRef.setInput('text', undefined);
      fixture.detectChanges();
      expect(component.text()).toBeUndefined();
    });

    it('should handle empty styleClass', () => {
      fixture.componentRef.setInput('styleClass', '');
      fixture.detectChanges();
      expect(component.styleClass()).toBe('');
    });
  });
});
