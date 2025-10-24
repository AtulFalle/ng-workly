import { Route } from '@angular/router';
import { RemoteEntry } from './entry';
import { AttendanceDashboardComponent } from '../components/attendance-dashboard/attendance-dashboard.component';
import { AttendanceListComponent } from '../components/attendance-list/attendance-list.component';
import { AttendanceReportsComponent } from '../components/attendance-reports/attendance-reports.component';
import { RegularizationComponent } from '../components/regularization/regularization.component';

export const remoteRoutes: Route[] = [
  { path: '', component: RemoteEntry },
  { path: 'dashboard', component: AttendanceDashboardComponent },
  { path: 'list', component: AttendanceListComponent },
  { path: 'reports', component: AttendanceReportsComponent },
  { path: 'regularization', component: RegularizationComponent }
];
