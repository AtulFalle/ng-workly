import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default elevation as true', () => {
      expect(component.elevation()).toBe(true);
    });

    it('should have default padding as true', () => {
      expect(component.padding()).toBe(true);
    });

    it('should have default shadow as md', () => {
      expect(component.shadow()).toBe('md');
    });

    it('should have default border as true', () => {
      expect(component.border()).toBe(true);
    });
  });

  describe('Input Properties', () => {
    it('should accept title input', () => {
      fixture.componentRef.setInput('title', 'Card Title');
      fixture.detectChanges();
      expect(component.title()).toBe('Card Title');
    });

    it('should accept subtitle input', () => {
      fixture.componentRef.setInput('subtitle', 'Card Subtitle');
      fixture.detectChanges();
      expect(component.subtitle()).toBe('Card Subtitle');
    });

    it('should accept header input', () => {
      fixture.componentRef.setInput('header', 'Card Header');
      fixture.detectChanges();
      expect(component.header()).toBe('Card Header');
    });

    it('should accept footer input', () => {
      fixture.componentRef.setInput('footer', 'Card Footer');
      fixture.detectChanges();
      expect(component.footer()).toBe('Card Footer');
    });

    it('should accept elevation input', () => {
      fixture.componentRef.setInput('elevation', false);
      fixture.detectChanges();
      expect(component.elevation()).toBe(false);
    });

    it('should accept padding input', () => {
      fixture.componentRef.setInput('padding', false);
      fixture.detectChanges();
      expect(component.padding()).toBe(false);
    });

    it('should accept shadow input', () => {
      const shadows: Array<'none' | 'sm' | 'md' | 'lg'> = ['none', 'sm', 'md', 'lg'];
      shadows.forEach(shadow => {
        fixture.componentRef.setInput('shadow', shadow);
        fixture.detectChanges();
        expect(component.shadow()).toBe(shadow);
      });
    });

    it('should accept border input', () => {
      fixture.componentRef.setInput('border', false);
      fixture.detectChanges();
      expect(component.border()).toBe(false);
    });
  });

  describe('Card Class', () => {
    it('should include base lib-card class', () => {
      fixture.detectChanges();
      const cardClass = component.cardClass;
      expect(cardClass).toContain('lib-card');
    });

    it('should include no-padding class when padding is false', () => {
      fixture.componentRef.setInput('padding', false);
      fixture.detectChanges();
      const cardClass = component.cardClass;
      expect(cardClass).toContain('lib-card-no-padding');
    });

    it('should not include no-padding class when padding is true', () => {
      fixture.componentRef.setInput('padding', true);
      fixture.detectChanges();
      const cardClass = component.cardClass;
      expect(cardClass).not.toContain('lib-card-no-padding');
    });

    it('should include elevated class when elevation is true', () => {
      fixture.componentRef.setInput('elevation', true);
      fixture.detectChanges();
      const cardClass = component.cardClass;
      expect(cardClass).toContain('lib-card-elevated');
    });

    it('should not include elevated class when elevation is false', () => {
      fixture.componentRef.setInput('elevation', false);
      fixture.detectChanges();
      const cardClass = component.cardClass;
      expect(cardClass).not.toContain('lib-card-elevated');
    });

    it('should include shadow class', () => {
      fixture.componentRef.setInput('shadow', 'lg');
      fixture.detectChanges();
      const cardClass = component.cardClass;
      expect(cardClass).toContain('lib-card-shadow-lg');
    });

    it('should include all shadow variants', () => {
      const shadows: Array<'none' | 'sm' | 'md' | 'lg'> = ['none', 'sm', 'md', 'lg'];
      shadows.forEach(shadow => {
        fixture.componentRef.setInput('shadow', shadow);
        fixture.detectChanges();
        const cardClass = component.cardClass;
        expect(cardClass).toContain(`lib-card-shadow-${shadow}`);
      });
    });

    it('should include bordered class when border is true', () => {
      fixture.componentRef.setInput('border', true);
      fixture.detectChanges();
      const cardClass = component.cardClass;
      expect(cardClass).toContain('lib-card-bordered');
    });

    it('should not include bordered class when border is false', () => {
      fixture.componentRef.setInput('border', false);
      fixture.detectChanges();
      const cardClass = component.cardClass;
      expect(cardClass).not.toContain('lib-card-bordered');
    });

    it('should combine multiple classes correctly', () => {
      fixture.componentRef.setInput('elevation', true);
      fixture.componentRef.setInput('padding', false);
      fixture.componentRef.setInput('shadow', 'lg');
      fixture.componentRef.setInput('border', true);
      fixture.detectChanges();
      
      const cardClass = component.cardClass;
      expect(cardClass).toContain('lib-card');
      expect(cardClass).toContain('lib-card-elevated');
      expect(cardClass).toContain('lib-card-no-padding');
      expect(cardClass).toContain('lib-card-shadow-lg');
      expect(cardClass).toContain('lib-card-bordered');
    });
  });

  describe('Component Rendering', () => {
    it('should render with title provided', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const cardElement = compiled.querySelector('p-card');
      expect(cardElement).toBeTruthy();
      expect(component.title()).toBe('Test Title');
    });

    it('should render with subtitle when provided', () => {
      fixture.componentRef.setInput('subtitle', 'Test Subtitle');
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const subtitleElement = compiled.querySelector('.lib-card-subtitle');
      expect(subtitleElement).toBeTruthy();
      expect(component.subtitle()).toBe('Test Subtitle');
    });

    it('should render with header when provided', () => {
      fixture.componentRef.setInput('header', 'Test Header');
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const cardElement = compiled.querySelector('p-card');
      expect(cardElement).toBeTruthy();
      expect(component.header()).toBe('Test Header');
    });

    it('should render with footer when provided', () => {
      fixture.componentRef.setInput('footer', 'Test Footer');
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const footerElement = compiled.querySelector('.lib-card-footer');
      expect(footerElement).toBeTruthy();
      expect(component.footer()).toBe('Test Footer');
    });

    it('should render card element with all inputs set', () => {
      fixture.componentRef.setInput('title', 'Title');
      fixture.componentRef.setInput('subtitle', 'Subtitle');
      fixture.componentRef.setInput('header', 'Header');
      fixture.componentRef.setInput('footer', 'Footer');
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const cardElement = compiled.querySelector('p-card');
      const subtitleElement = compiled.querySelector('.lib-card-subtitle');
      const footerElement = compiled.querySelector('.lib-card-footer');
      
      expect(cardElement).toBeTruthy();
      expect(subtitleElement).toBeTruthy();
      expect(footerElement).toBeTruthy();
      expect(component.title()).toBe('Title');
      expect(component.header()).toBe('Header');
      expect(component.subtitle()).toBe('Subtitle');
      expect(component.footer()).toBe('Footer');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      fixture.componentRef.setInput('title', '');
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should handle undefined title', () => {
      fixture.componentRef.setInput('title', undefined);
      fixture.detectChanges();
      expect(component.title()).toBeUndefined();
    });

    it('should work with all boolean combinations', () => {
      const combinations = [
        { elevation: true, padding: true, border: true },
        { elevation: true, padding: true, border: false },
        { elevation: true, padding: false, border: true },
        { elevation: true, padding: false, border: false },
        { elevation: false, padding: true, border: true },
        { elevation: false, padding: true, border: false },
        { elevation: false, padding: false, border: true },
        { elevation: false, padding: false, border: false }
      ];

      combinations.forEach(combo => {
        fixture.componentRef.setInput('elevation', combo.elevation);
        fixture.componentRef.setInput('padding', combo.padding);
        fixture.componentRef.setInput('border', combo.border);
        fixture.detectChanges();
        
        const cardClass = component.cardClass;
        expect(cardClass).toContain('lib-card');
      });
    });
  });
});
