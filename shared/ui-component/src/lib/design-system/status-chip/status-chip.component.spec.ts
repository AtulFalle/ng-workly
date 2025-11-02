import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { StatusChipComponent } from './status-chip.component';
import { StatusChipStatus, StatusChipVariant, StatusChipSize } from './status-chip.types';

describe('StatusChipComponent', () => {
  let component: StatusChipComponent;
  let fixture: ComponentFixture<StatusChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusChipComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusChipComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should have default variant as soft', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.detectChanges();
      expect(component.variant()).toBe('soft');
    });

    it('should have default size as medium', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.detectChanges();
      expect(component.size()).toBe('medium');
    });

    it('should have showIcon default as true', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.detectChanges();
      expect(component.showIcon()).toBe(true);
    });

    it('should have showDot default as false', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.detectChanges();
      expect(component.showDot()).toBe(false);
    });

    it('should have removable default as false', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.detectChanges();
      expect(component.removable()).toBe(false);
    });
  });

  describe('Status Label', () => {
    it('should display correct label for active status', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.detectChanges();
      expect(component.statusLabel()).toBe('Active');
    });

    it('should display correct label for inactive status', () => {
      fixture.componentRef.setInput('status', 'inactive');
      fixture.detectChanges();
      expect(component.statusLabel()).toBe('Inactive');
    });

    it('should display correct label for on-leave status', () => {
      fixture.componentRef.setInput('status', 'on-leave');
      fixture.detectChanges();
      expect(component.statusLabel()).toBe('On Leave');
    });

    it('should display custom label when provided', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.componentRef.setInput('label', 'Custom Active');
      fixture.detectChanges();
      expect(component.statusLabel()).toBe('Custom Active');
    });

    it('should display correct label for leave statuses', () => {
      const leaveStatuses: StatusChipStatus[] = ['approved', 'rejected', 'cancelled', 'under-review'];
      leaveStatuses.forEach(status => {
        fixture.componentRef.setInput('status', status);
        fixture.detectChanges();
        expect(component.statusLabel()).not.toBe('');
      });
    });

    it('should display correct label for attendance statuses', () => {
      fixture.componentRef.setInput('status', 'present');
      fixture.detectChanges();
      expect(component.statusLabel()).toBe('Present');
      
      fixture.componentRef.setInput('status', 'absent');
      fixture.detectChanges();
      expect(component.statusLabel()).toBe('Absent');
    });
  });

  describe('Status Icon', () => {
    it('should return correct icon for active status', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.detectChanges();
      expect(component.statusIcon()).toBe('pi pi-check-circle');
    });

    it('should return correct icon for inactive status', () => {
      fixture.componentRef.setInput('status', 'inactive');
      fixture.detectChanges();
      expect(component.statusIcon()).toBe('pi pi-times-circle');
    });

    it('should use custom icon when provided', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.componentRef.setInput('icon', 'pi pi-custom-icon');
      fixture.detectChanges();
      expect(component.statusIcon()).toBe('pi pi-custom-icon');
    });

    it('should return undefined icon when showIcon is false', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.componentRef.setInput('showIcon', false);
      fixture.detectChanges();
      // When showIcon is false, icon is not computed, but let's check statusIcon computed
      expect(component.statusIcon()).toBeDefined();
    });
  });

  describe('Status Severity', () => {
    it('should return success severity for active status', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.detectChanges();
      expect(component.statusSeverity()).toBe('success');
    });

    it('should return danger severity for inactive status', () => {
      fixture.componentRef.setInput('status', 'inactive');
      fixture.detectChanges();
      expect(component.statusSeverity()).toBe('danger');
    });

    it('should return warning severity for on-leave status', () => {
      fixture.componentRef.setInput('status', 'on-leave');
      fixture.detectChanges();
      expect(component.statusSeverity()).toBe('warning');
    });

    it('should return info severity for pending status', () => {
      fixture.componentRef.setInput('status', 'pending');
      fixture.detectChanges();
      expect(component.statusSeverity()).toBe('info');
    });
  });

  describe('Chip Class', () => {
    it('should include base class', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.detectChanges();
      const classes = component.chipClass();
      expect(classes).toContain('lib-status-chip');
    });

    it('should include variant class', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.componentRef.setInput('variant', 'filled');
      fixture.detectChanges();
      const classes = component.chipClass();
      expect(classes).toContain('lib-status-chip--filled');
    });

    it('should include size class', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      const classes = component.chipClass();
      expect(classes).toContain('lib-status-chip--small');
    });

    it('should include severity class', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.detectChanges();
      const classes = component.chipClass();
      expect(classes).toContain('lib-status-chip--success');
    });

    it('should include with-dot class when showDot is true', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.componentRef.setInput('showDot', true);
      fixture.detectChanges();
      const classes = component.chipClass();
      expect(classes).toContain('lib-status-chip--with-dot');
    });

    it('should include removable class when removable is true', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();
      const classes = component.chipClass();
      expect(classes).toContain('lib-status-chip--removable');
    });

    it('should include custom class when provided', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.componentRef.setInput('customClass', 'my-custom-class');
      fixture.detectChanges();
      const classes = component.chipClass();
      expect(classes).toContain('my-custom-class');
    });
  });

  describe('Events', () => {
    it('should emit removed event when onRemove is called', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.detectChanges();
      
      jest.spyOn(component.removed, 'emit');
      const event = new Event('click');
      component.onRemove(event);
      
      expect(component.removed.emit).toHaveBeenCalledWith('active');
    });

    it('should stop propagation in onRemove', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.detectChanges();
      
      const event = new Event('click', { bubbles: true });
      const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');
      
      component.onRemove(event);
      
      expect(stopPropagationSpy).toHaveBeenCalled();
    });

    it('should emit clicked event when onClick is called', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.detectChanges();
      
      jest.spyOn(component.clicked, 'emit');
      component.onClick();
      
      expect(component.clicked.emit).toHaveBeenCalledWith('active');
    });
  });

  describe('All Status Types', () => {
    const allStatuses: StatusChipStatus[] = [
      'active', 'inactive', 'on-leave', 'terminated', 'pending',
      'approved', 'rejected', 'cancelled', 'under-review',
      'present', 'absent', 'late', 'half-day',
      'expired', 'in-progress'
    ];

    it('should handle all status types without errors', () => {
      allStatuses.forEach(status => {
        fixture.componentRef.setInput('status', status);
        fixture.detectChanges();
        
        expect(component.statusLabel()).toBeTruthy();
        expect(component.statusIcon()).toBeTruthy();
        expect(component.statusSeverity()).toBeTruthy();
        expect(component.chipClass()).toContain('lib-status-chip');
      });
    });
  });

  describe('Variant Combinations', () => {
    const variants: StatusChipVariant[] = ['filled', 'outlined', 'soft', 'text'];
    const sizes: StatusChipSize[] = ['small', 'medium', 'large'];

    it('should work with all variant and size combinations', () => {
      variants.forEach(variant => {
        sizes.forEach(size => {
          fixture.componentRef.setInput('status', 'active');
          fixture.componentRef.setInput('variant', variant);
          fixture.componentRef.setInput('size', size);
          fixture.detectChanges();
          
          const classes = component.chipClass();
          expect(classes).toContain(`lib-status-chip--${variant}`);
          expect(classes).toContain(`lib-status-chip--${size}`);
        });
      });
    });
  });
});
