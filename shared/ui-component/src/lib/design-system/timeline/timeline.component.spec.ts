import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineComponent } from './timeline.component';
import { TimelineItem, TimelineAlignment, TimelineSize, TimelineVariant } from './timeline.types';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  const mockTimelineItems: TimelineItem[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      timestamp: new Date('2024-01-01'),
      status: 'completed'
    },
    {
      id: '2',
      title: 'Task 2',
      timestamp: new Date('2024-01-02'),
      status: 'in-progress'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', mockTimelineItems);
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default alignment as left', () => {
      expect(component.alignment()).toBe('left');
    });

    it('should have default size as medium', () => {
      expect(component.size()).toBe('medium');
    });

    it('should have default variant as default', () => {
      expect(component.variant()).toBe('default');
    });

    it('should have default showIcons as true', () => {
      expect(component.showIcons()).toBe(true);
    });

    it('should have default showDates as true', () => {
      expect(component.showDates()).toBe(true);
    });

    it('should have default showAvatars as false', () => {
      expect(component.showAvatars()).toBe(false);
    });

    it('should have default showActions as true', () => {
      expect(component.showActions()).toBe(true);
    });
  });

  describe('Input Properties', () => {
    it('should accept items input', () => {
      fixture.componentRef.setInput('items', mockTimelineItems);
      fixture.detectChanges();
      expect(component.items()).toEqual(mockTimelineItems);
    });

    it('should accept alignment input', () => {
      const alignments: TimelineAlignment[] = ['left', 'right', 'alternate'];
      alignments.forEach(alignment => {
        fixture.componentRef.setInput('alignment', alignment);
        fixture.detectChanges();
        expect(component.alignment()).toBe(alignment);
      });
    });

    it('should accept size input', () => {
      const sizes: TimelineSize[] = ['small', 'medium', 'large'];
      sizes.forEach(size => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        expect(component.size()).toBe(size);
      });
    });

    it('should accept variant input', () => {
      fixture.componentRef.setInput('variant', 'employee');
      fixture.detectChanges();
      expect(component.variant()).toBe('employee');
    });

    it('should accept showIcons input', () => {
      fixture.componentRef.setInput('showIcons', false);
      fixture.detectChanges();
      expect(component.showIcons()).toBe(false);
    });

    it('should accept showDates input', () => {
      fixture.componentRef.setInput('showDates', false);
      fixture.detectChanges();
      expect(component.showDates()).toBe(false);
    });

    it('should accept showAvatars input', () => {
      fixture.componentRef.setInput('showAvatars', true);
      fixture.detectChanges();
      expect(component.showAvatars()).toBe(true);
    });

    it('should accept showActions input', () => {
      fixture.componentRef.setInput('showActions', false);
      fixture.detectChanges();
      expect(component.showActions()).toBe(false);
    });

    it('should accept styleClass input', () => {
      fixture.componentRef.setInput('styleClass', 'custom-class');
      fixture.detectChanges();
      expect(component.styleClass()).toBe('custom-class');
    });
  });

  describe('Timeline Class', () => {
    it('should include base lib-timeline class', () => {
      fixture.detectChanges();
      const timelineClass = component.timelineClass;
      expect(timelineClass).toContain('lib-timeline');
    });

    it('should include alignment class', () => {
      fixture.componentRef.setInput('alignment', 'right');
      fixture.detectChanges();
      const timelineClass = component.timelineClass;
      expect(timelineClass).toContain('lib-timeline--right');
    });

    it('should include size class', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      const timelineClass = component.timelineClass;
      expect(timelineClass).toContain('lib-timeline--large');
    });

    it('should include variant class', () => {
      fixture.componentRef.setInput('variant', 'employee');
      fixture.detectChanges();
      const timelineClass = component.timelineClass;
      expect(timelineClass).toContain('lib-timeline--employee');
    });

    it('should include custom styleClass when provided', () => {
      fixture.componentRef.setInput('styleClass', 'custom-timeline');
      fixture.detectChanges();
      const timelineClass = component.timelineClass;
      expect(timelineClass).toContain('custom-timeline');
    });

    it('should combine all classes correctly', () => {
      fixture.componentRef.setInput('alignment', 'alternate');
      fixture.componentRef.setInput('size', 'large');
      fixture.componentRef.setInput('variant', 'leave');
      fixture.componentRef.setInput('styleClass', 'custom');
      fixture.detectChanges();
      
      const timelineClass = component.timelineClass;
      expect(timelineClass).toContain('lib-timeline');
      expect(timelineClass).toContain('lib-timeline--alternate');
      expect(timelineClass).toContain('lib-timeline--large');
      expect(timelineClass).toContain('lib-timeline--leave');
      expect(timelineClass).toContain('custom');
    });
  });

  describe('getItemClass', () => {
    it('should include base item class', () => {
      const item = mockTimelineItems[0];
      const itemClass = component.getItemClass(item, 0);
      expect(itemClass).toContain('lib-timeline-item');
    });

    it('should include status class when status provided', () => {
      const item: TimelineItem = {
        id: '1',
        title: 'Test',
        timestamp: new Date(),
        status: 'completed'
      };
      const itemClass = component.getItemClass(item, 0);
      expect(itemClass).toContain('lib-timeline-item--completed');
    });

    it('should include variant class when variant provided', () => {
      const item: TimelineItem = {
        id: '1',
        title: 'Test',
        timestamp: new Date(),
        variant: 'employee'
      };
      const itemClass = component.getItemClass(item, 0);
      expect(itemClass).toContain('lib-timeline-item--employee');
    });

    it('should include right class for alternate alignment with odd index', () => {
      fixture.componentRef.setInput('alignment', 'alternate');
      fixture.detectChanges();
      
      const item = mockTimelineItems[0];
      const itemClass = component.getItemClass(item, 1); // odd index
      expect(itemClass).toContain('lib-timeline-item--right');
    });

    it('should not include right class for alternate alignment with even index', () => {
      fixture.componentRef.setInput('alignment', 'alternate');
      fixture.detectChanges();
      
      const item = mockTimelineItems[0];
      const itemClass = component.getItemClass(item, 0); // even index
      expect(itemClass).not.toContain('lib-timeline-item--right');
    });
  });

  describe('getItemIcon', () => {
    it('should return custom icon when provided', () => {
      const item: TimelineItem = {
        id: '1',
        title: 'Test',
        timestamp: new Date(),
        icon: 'pi pi-custom-icon'
      };
      const icon = component.getItemIcon(item);
      expect(icon).toBe('pi pi-custom-icon');
    });

    it('should return check-circle icon for completed status', () => {
      const item: TimelineItem = {
        id: '1',
        title: 'Test',
        timestamp: new Date(),
        status: 'completed'
      };
      const icon = component.getItemIcon(item);
      expect(icon).toBe('pi pi-check-circle');
    });

    it('should return check-circle icon for approved status', () => {
      const item: TimelineItem = {
        id: '1',
        title: 'Test',
        timestamp: new Date(),
        status: 'approved'
      };
      const icon = component.getItemIcon(item);
      expect(icon).toBe('pi pi-check-circle');
    });

    it('should return times-circle icon for rejected status', () => {
      const item: TimelineItem = {
        id: '1',
        title: 'Test',
        timestamp: new Date(),
        status: 'rejected'
      };
      const icon = component.getItemIcon(item);
      expect(icon).toBe('pi pi-times-circle');
    });

    it('should return clock icon for in-progress status', () => {
      const item: TimelineItem = {
        id: '1',
        title: 'Test',
        timestamp: new Date(),
        status: 'in-progress'
      };
      const icon = component.getItemIcon(item);
      expect(icon).toBe('pi pi-clock');
    });

    it('should return clock icon for pending status', () => {
      const item: TimelineItem = {
        id: '1',
        title: 'Test',
        timestamp: new Date(),
        status: 'pending'
      };
      const icon = component.getItemIcon(item);
      expect(icon).toBe('pi pi-clock');
    });

    it('should return user icon for employee variant', () => {
      const item: TimelineItem = {
        id: '1',
        title: 'Test',
        timestamp: new Date(),
        variant: 'employee'
      };
      const icon = component.getItemIcon(item);
      expect(icon).toBe('pi pi-user');
    });

    it('should return calendar icon for leave variant', () => {
      const item: TimelineItem = {
        id: '1',
        title: 'Test',
        timestamp: new Date(),
        variant: 'leave'
      };
      const icon = component.getItemIcon(item);
      expect(icon).toBe('pi pi-calendar');
    });

    it('should return default circle icon when no status or variant', () => {
      const item: TimelineItem = {
        id: '1',
        title: 'Test',
        timestamp: new Date()
      };
      const icon = component.getItemIcon(item);
      expect(icon).toBe('pi pi-circle');
    });
  });

  describe('formatDate', () => {
    it('should return empty string when showDates is false', () => {
      fixture.componentRef.setInput('showDates', false);
      fixture.detectChanges();
      
      const date = new Date();
      const formatted = component.formatDate(date);
      expect(formatted).toBe('');
    });

    it('should return "Just now" for very recent dates', () => {
      const date = new Date(Date.now() - 10000); // 10 seconds ago
      const formatted = component.formatDate(date);
      expect(formatted).toBe('Just now');
    });

    it('should format minutes ago', () => {
      const date = new Date(Date.now() - 5 * 60000); // 5 minutes ago
      const formatted = component.formatDate(date);
      expect(formatted).toContain('m ago');
    });

    it('should format hours ago', () => {
      const date = new Date(Date.now() - 2 * 3600000); // 2 hours ago
      const formatted = component.formatDate(date);
      expect(formatted).toContain('h ago');
    });

    it('should format days ago', () => {
      const date = new Date(Date.now() - 5 * 86400000); // 5 days ago
      const formatted = component.formatDate(date);
      expect(formatted).toContain('d ago');
    });
  });

  describe('formatDateFull', () => {
    it('should format date with full format', () => {
      const date = new Date('2024-01-15T10:30:00');
      const formatted = component.formatDateFull(date);
      expect(formatted).toContain('Jan');
      expect(formatted).toContain('2024');
      expect(formatted).toContain('15');
    });
  });

  describe('getMetadataEntries', () => {
    it('should convert metadata object to entries array', () => {
      const metadata = {
        key1: 'value1',
        key2: 'value2',
        number: 123
      };
      const entries = component.getMetadataEntries(metadata);
      
      expect(entries).toHaveLength(3);
      expect(entries[0]).toEqual({ key: 'key1', value: 'value1' });
      expect(entries[1]).toEqual({ key: 'key2', value: 'value2' });
      expect(entries[2]).toEqual({ key: 'number', value: 123 });
    });

    it('should return empty array for empty metadata', () => {
      const entries = component.getMetadataEntries({});
      expect(entries).toEqual([]);
    });
  });

  describe('handleAction', () => {
    it('should stop event propagation', () => {
      const event = new Event('click', { bubbles: true });
      const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');
      
      const action = { label: 'Test', command: jest.fn() };
      component.handleAction(action, event);
      
      expect(stopPropagationSpy).toHaveBeenCalled();
    });

    it('should call action command when provided', () => {
      const event = new Event('click');
      const command = jest.fn();
      
      const action = { label: 'Test', command };
      component.handleAction(action, event);
      
      expect(command).toHaveBeenCalled();
    });

    it('should not throw when command is not provided', () => {
      const event = new Event('click');
      const action = { label: 'Test' };
      
      expect(() => component.handleAction(action as any, event)).not.toThrow();
    });
  });

  describe('Combinations', () => {
    it('should work with all alignment and size combinations', () => {
      const alignments: TimelineAlignment[] = ['left', 'right', 'alternate'];
      const sizes: TimelineSize[] = ['small', 'medium', 'large'];
      
      alignments.forEach(alignment => {
        sizes.forEach(size => {
          fixture.componentRef.setInput('alignment', alignment);
          fixture.componentRef.setInput('size', size);
          fixture.detectChanges();
          
          const timelineClass = component.timelineClass;
          expect(timelineClass).toContain(`lib-timeline--${alignment}`);
          expect(timelineClass).toContain(`lib-timeline--${size}`);
        });
      });
    });
  });
});
