import { Route } from '@angular/router';
import { RemoteEntry } from './entry';
import { AttendanceDashboardComponent } from '../components/attendance-dashboard/attendance-dashboard.component';
import { AttendanceListComponent } from '../components/attendance-list/attendance-list.component';
import { AttendanceReportsComponent } from '../components/attendance-reports/attendance-reports.component';
import { RegularizationComponent } from '../components/regularization/regularization.component';
import { LeaveRequestComponent } from '../components/leave-request/leave-request.component';
import { LeaveApprovalComponent } from '../components/leave-approval/leave-approval.component';

export const remoteRoutes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AttendanceDashboardComponent },
  { path: 'list', component: AttendanceListComponent },
  { path: 'reports', component: AttendanceReportsComponent },
  { path: 'regularization', component: RegularizationComponent },
  { path: 'leave-request', component: LeaveRequestComponent },
  { path: 'leave-approval', component: LeaveApprovalComponent }
];
