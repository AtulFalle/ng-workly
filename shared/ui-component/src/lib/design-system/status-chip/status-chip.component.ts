import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusChipStatus, StatusChipVariant, StatusChipSize } from './status-chip.types';

@Component({
  selector: 'lib-status-chip',
  imports: [CommonModule],
  templateUrl: './status-chip.component.html',
  styleUrl: './status-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusChipComponent {
  // Inputs
  status = input.required<StatusChipStatus>();
  label = input<string>();
  variant = input<StatusChipVariant>('soft'); // Soft variant is preferred for HRM applications
  size = input<StatusChipSize>('medium');
  showIcon = input<boolean>(true);
  showDot = input<boolean>(false);
  removable = input<boolean>(false);
  icon = input<string>();
  customClass = input<string>('');

  // Outputs
  removed = output<StatusChipStatus>();
  clicked = output<StatusChipStatus>();

  // Computed properties
  statusLabel = computed(() => {
    const customLabel = this.label();
    if (customLabel) return customLabel;
    return this.getStatusLabel(this.status());
  });

  statusIcon = computed(() => {
    const customIcon = this.icon();
    if (customIcon) return customIcon;
    return this.getStatusIcon(this.status());
  });

  statusSeverity = computed(() => {
    return this.getStatusSeverity(this.status());
  });

  chipClass = computed(() => {
    const classes = ['lib-status-chip'];
    classes.push(`lib-status-chip--${this.variant()}`);
    classes.push(`lib-status-chip--${this.size()}`);
    classes.push(`lib-status-chip--${this.statusSeverity()}`);
    
    if (this.showDot()) {
      classes.push('lib-status-chip--with-dot');
    }
    
    if (this.removable()) {
      classes.push('lib-status-chip--removable');
    }
    
    if (this.customClass()) {
      classes.push(this.customClass());
    }
    
    return classes.join(' ');
  });

  // Status label mapping
  private getStatusLabel(status: StatusChipStatus): string {
    const labels: Record<StatusChipStatus, string> = {
      // Employee Statuses
      'active': 'Active',
      'inactive': 'Inactive',
      'on-leave': 'On Leave',
      'terminated': 'Terminated',
      'pending': 'Pending',
      
      // Leave Statuses
      'approved': 'Approved',
      'rejected': 'Rejected',
      'cancelled': 'Cancelled',
      'under-review': 'Under Review',
      
      // Attendance Statuses
      'present': 'Present',
      'absent': 'Absent',
      'late': 'Late',
      'half-day': 'Half Day',
      
      // Document Statuses
      'expired': 'Expired',
      
      // Request Statuses
      'in-progress': 'In Progress'
    };
    
    return labels[status] || status.charAt(0).toUpperCase() + status.slice(1);
  }

  // Status icon mapping
  private getStatusIcon(status: StatusChipStatus): string {
    const icons: Record<StatusChipStatus, string> = {
      // Employee Statuses
      'active': 'pi pi-check-circle',
      'inactive': 'pi pi-times-circle',
      'on-leave': 'pi pi-calendar-times',
      'terminated': 'pi pi-ban',
      'pending': 'pi pi-clock',
      
      // Leave Statuses
      'approved': 'pi pi-check',
      'rejected': 'pi pi-times',
      'cancelled': 'pi pi-times-circle',
      'under-review': 'pi pi-eye',
      
      // Attendance Statuses
      'present': 'pi pi-check',
      'absent': 'pi pi-times',
      'late': 'pi pi-exclamation-triangle',
      'half-day': 'pi pi-calendar-minus',
      
      // Document Statuses
      'expired': 'pi pi-clock',
      
      // Request Statuses
      'in-progress': 'pi pi-spin pi-spinner'
    };
    
    return icons[status] || 'pi pi-circle';
  }

  // Status severity mapping (for PrimeNG Tag)
  private getStatusSeverity(status: StatusChipStatus): 'success' | 'info' | 'warning' | 'danger' | 'secondary' {
    const severityMap: Record<StatusChipStatus, 'success' | 'info' | 'warning' | 'danger' | 'secondary'> = {
      // Employee Statuses
      'active': 'success',
      'inactive': 'danger',
      'on-leave': 'warning',
      'terminated': 'danger',
      'pending': 'info',
      
      // Leave Statuses
      'approved': 'success',
      'rejected': 'danger',
      'cancelled': 'secondary',
      'under-review': 'info',
      
      // Attendance Statuses
      'present': 'success',
      'absent': 'danger',
      'late': 'warning',
      'half-day': 'info',
      
      // Document Statuses
      'expired': 'warning',
      
      // Request Statuses
      'in-progress': 'info'
    };
    
    return severityMap[status] || 'secondary';
  }

  // Methods
  onRemove(event: Event): void {
    event.stopPropagation();
    this.removed.emit(this.status());
  }

  onClick(): void {
    this.clicked.emit(this.status());
  }
}

