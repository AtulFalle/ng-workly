import { Component } from '@angular/core';
import { AttendanceDashboardComponent } from '../components/attendance-dashboard/attendance-dashboard.component';

@Component({
  imports: [AttendanceDashboardComponent],
  selector: 'app-attendance-entry',
  template: `<app-attendance-dashboard></app-attendance-dashboard>`,
})
export class RemoteEntry {}
