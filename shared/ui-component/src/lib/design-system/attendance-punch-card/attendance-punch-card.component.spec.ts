import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendancePunchCardComponent } from './attendance-punch-card.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { AttendancePunchCardData, AttendancePunchCardConfig } from './attendance-punch-card.types';

describe('AttendancePunchCardComponent', () => {
  let component: AttendancePunchCardComponent;
  let fixture: ComponentFixture<AttendancePunchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendancePunchCardComponent],
      providers: [
        provideNoopAnimations(),
        providePrimeNG({ theme: { preset: Aura } })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AttendancePunchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty state when no data', () => {
    component.data.set(null);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.lib-attendance-punch-card-empty')).toBeTruthy();
  });

  it('should display loading state', () => {
    component.loading.set(true);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.lib-attendance-punch-card-loading')).toBeTruthy();
  });

  it('should display check-in button when not checked in', () => {
    const data: AttendancePunchCardData = {
      status: 'not-checked-in'
    };
    component.data.set(data);
    component.showActions.set(true);
    fixture.detectChanges();
    
    expect(component.canCheckIn()).toBe(true);
    expect(component.canCheckOut()).toBe(false);
  });

  it('should display check-out button when checked in', () => {
    const data: AttendancePunchCardData = {
      status: 'checked-in',
      checkIn: new Date()
    };
    component.data.set(data);
    component.showActions.set(true);
    fixture.detectChanges();
    
    expect(component.canCheckIn()).toBe(false);
    expect(component.canCheckOut()).toBe(true);
  });

  it('should format time correctly', () => {
    const date = new Date('2024-01-01T09:30:00');
    const formatted = component.formatTime(date);
    expect(formatted).toContain('09:30');
  });

  it('should format duration correctly', () => {
    expect(component.formatDuration(8)).toBe('8h');
    expect(component.formatDuration(8.5)).toBe('8h 30m');
    expect(component.formatDuration(0)).toBe('0h');
  });

  it('should emit checkIn event', () => {
    spyOn(component.checkIn, 'emit');
    component.onCheckIn();
    expect(component.checkIn.emit).toHaveBeenCalled();
  });

  it('should emit checkOut event', () => {
    spyOn(component.checkOut, 'emit');
    component.onCheckOut();
    expect(component.checkOut.emit).toHaveBeenCalled();
  });

  it('should compute status chip status correctly', () => {
    component.data.set({ status: 'checked-in' });
    expect(component.statusChipStatus()).toBe('present');
    
    component.data.set({ status: 'late' });
    expect(component.statusChipStatus()).toBe('late');
    
    component.data.set({ status: 'absent' });
    expect(component.statusChipStatus()).toBe('absent');
  });
});

