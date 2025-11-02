import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { StatusChipComponent } from '../status-chip/status-chip.component';
import { CardComponent } from '../card/card.component';
import { AttendancePunchCardData, AttendancePunchCardConfig, AttendancePunchCardVariant, AttendancePunchCardSize, AttendancePunchCardStatus } from './attendance-punch-card.types';
import { StatusChipStatus } from '../status-chip/status-chip.types';

@Component({
  selector: 'lib-attendance-punch-card',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    StatusChipComponent,
    CardComponent
  ],
  templateUrl: './attendance-punch-card.component.html',
  styleUrl: './attendance-punch-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendancePunchCardComponent {
  // Inputs
  data = input<AttendancePunchCardData | null>(null);
  config = input<AttendancePunchCardConfig>({});
  loading = input<boolean>(false);
  showActions = input<boolean>(true);

  // Outputs
  checkIn = output<void>();
  checkOut = output<void>();
  breakStart = output<void>();
  breakEnd = output<void>();

  // Computed config with defaults
  cardConfig = computed<AttendancePunchCardConfig>(() => {
    const defaults: AttendancePunchCardConfig = {
      variant: 'default',
      size: 'medium',
      showLocation: true,
      showDevice: true,
      showBreakInfo: false,
      showOvertime: false,
      showScheduledTime: false,
      compactActions: false,
      allowCheckIn: true,
      allowCheckOut: true,
      allowBreakActions: false
    };
    return { ...defaults, ...this.config() };
  });

  // Computed card class
  cardClass = computed(() => {
    const config = this.cardConfig();
    const classes = ['lib-attendance-punch-card'];
    classes.push(`lib-attendance-punch-card--${config.variant}`);
    classes.push(`lib-attendance-punch-card--${config.size}`);
    if (this.data()?.status === 'checked-in' || this.data()?.status === 'on-break') {
      classes.push('lib-attendance-punch-card--active');
    }
    return classes.join(' ');
  });

  // Status chip status mapping
  statusChipStatus = computed<StatusChipStatus>(() => {
    const data = this.data();
    if (!data) return 'pending';
    
    switch (data.status) {
      case 'checked-in':
      case 'on-break':
        return 'present';
      case 'checked-out':
        return data.isLate ? 'late' : 'present';
      case 'late':
        return 'late';
      case 'absent':
        return 'absent';
      case 'not-checked-in':
      default:
        return 'pending';
    }
  });

  // Status label
  statusLabel = computed(() => {
    const data = this.data();
    if (!data) return 'Not Started';
    
    switch (data.status) {
      case 'checked-in': return 'Checked In';
      case 'checked-out': return 'Checked Out';
      case 'on-break': return 'On Break';
      case 'late': return 'Late';
      case 'absent': return 'Absent';
      case 'not-checked-in':
      default:
        return 'Not Checked In';
    }
  });

  // Check if can check in
  canCheckIn = computed(() => {
    const data = this.data();
    const config = this.cardConfig();
    return config.allowCheckIn && (!data || data.status === 'not-checked-in' || data.status === 'checked-out');
  });

  // Check if can check out
  canCheckOut = computed(() => {
    const data = this.data();
    const config = this.cardConfig();
    return config.allowCheckOut && data && (data.status === 'checked-in' || data.status === 'on-break');
  });

  // Format time
  formatTime(date: Date | null | undefined): string {
    if (!date) return '--:--';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }

  // Format duration
  formatDuration(hours: number | undefined): string {
    if (!hours && hours !== 0) return '0h 0m';
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  }

  // Format late by
  formatLateBy(minutes: number | undefined): string {
    if (!minutes) return '';
    if (minutes < 60) return `${minutes}m late`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m late`;
  }

  // Handle check in
  onCheckIn(): void {
    this.checkIn.emit();
  }

  // Handle check out
  onCheckOut(): void {
    this.checkOut.emit();
  }

  // Handle break start
  onBreakStart(): void {
    this.breakStart.emit();
  }

  // Handle break end
  onBreakEnd(): void {
    this.breakEnd.emit();
  }
}

