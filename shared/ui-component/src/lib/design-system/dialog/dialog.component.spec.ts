import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default header as empty string', () => {
      expect(component.header()).toBe('');
    });

    it('should have default size as medium', () => {
      expect(component.size()).toBe('medium');
    });

    it('should have default modal as true', () => {
      expect(component.modal()).toBe(true);
    });

    it('should have default closable as true', () => {
      expect(component.closable()).toBe(true);
    });

    it('should have default dismissableMask as true', () => {
      expect(component.dismissableMask()).toBe(true);
    });

    it('should have default closeOnEscape as true', () => {
      expect(component.closeOnEscape()).toBe(true);
    });

    it('should have default visible as false', () => {
      expect(component.visible()).toBe(false);
    });

    it('should have default styleClass as empty string', () => {
      expect(component.styleClass()).toBe('');
    });
  });

  describe('Input Properties', () => {
    it('should accept header input', () => {
      fixture.componentRef.setInput('header', 'Dialog Title');
      fixture.detectChanges();
      expect(component.header()).toBe('Dialog Title');
    });

    it('should accept size input', () => {
      const sizes: Array<'small' | 'medium' | 'large' | 'fullscreen'> = ['small', 'medium', 'large', 'fullscreen'];
      sizes.forEach(size => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        expect(component.size()).toBe(size);
      });
    });

    it('should accept modal input', () => {
      fixture.componentRef.setInput('modal', false);
      fixture.detectChanges();
      expect(component.modal()).toBe(false);
    });

    it('should accept closable input', () => {
      fixture.componentRef.setInput('closable', false);
      fixture.detectChanges();
      expect(component.closable()).toBe(false);
    });

    it('should accept dismissableMask input', () => {
      fixture.componentRef.setInput('dismissableMask', false);
      fixture.detectChanges();
      expect(component.dismissableMask()).toBe(false);
    });

    it('should accept closeOnEscape input', () => {
      fixture.componentRef.setInput('closeOnEscape', false);
      fixture.detectChanges();
      expect(component.closeOnEscape()).toBe(false);
    });

    it('should accept visible input via two-way binding', () => {
      component.visible.set(true);
      fixture.detectChanges();
      expect(component.visible()).toBe(true);
    });

    it('should accept styleClass input', () => {
      fixture.componentRef.setInput('styleClass', 'custom-dialog');
      fixture.detectChanges();
      expect(component.styleClass()).toBe('custom-dialog');
    });
  });

  describe('Dialog Size', () => {
    it('should return correct dialog size class', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      expect(component.dialogSize).toBe('lib-dialog-small');
    });

    it('should return all size classes', () => {
      const sizes: Array<'small' | 'medium' | 'large' | 'fullscreen'> = ['small', 'medium', 'large', 'fullscreen'];
      sizes.forEach(size => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        expect(component.dialogSize).toBe(`lib-dialog-${size}`);
      });
    });
  });

  describe('Events', () => {
    it('should emit close event and set visible to false on hide', () => {
      component.visible.set(true);
      jest.spyOn(component.close, 'emit');
      
      component.onHide();
      
      expect(component.visible()).toBe(false);
      expect(component.close.emit).toHaveBeenCalled();
    });
  });

  describe('Component Rendering', () => {
    it('should render dialog element', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const dialogElement = compiled.querySelector('p-dialog');
      expect(dialogElement).toBeTruthy();
    });

    it('should render with header', () => {
      fixture.componentRef.setInput('header', 'Test Dialog');
      fixture.detectChanges();
      expect(component.header()).toBe('Test Dialog');
    });
  });

  describe('Combinations', () => {
    it('should work with all size and modal combinations', () => {
      const sizes: Array<'small' | 'medium' | 'large' | 'fullscreen'> = ['small', 'medium', 'large', 'fullscreen'];
      
      sizes.forEach(size => {
        fixture.componentRef.setInput('size', size);
        fixture.componentRef.setInput('modal', false);
        fixture.detectChanges();
        
        expect(component.size()).toBe(size);
        expect(component.modal()).toBe(false);
        expect(component.dialogSize).toBe(`lib-dialog-${size}`);
      });
    });

    it('should work with all visibility options', () => {
      fixture.componentRef.setInput('closable', true);
      fixture.componentRef.setInput('dismissableMask', true);
      fixture.componentRef.setInput('closeOnEscape', true);
      fixture.detectChanges();
      
      expect(component.closable()).toBe(true);
      expect(component.dismissableMask()).toBe(true);
      expect(component.closeOnEscape()).toBe(true);
    });
  });
});
