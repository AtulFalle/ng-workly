import { Route } from '@angular/router';
import { loadRemote } from '@module-federation/enhanced/runtime';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

export const appRoutes: Route[] = [
  // Auth routes (no layout)
  {
    path: 'auth',
    loadChildren: () =>
      loadRemote<typeof import('authenticationUi/Routes')>(
        'authenticationUi/Routes'
      ).then((m) => m!.remoteRoutes),
  },
  
  // Dashboard route (with layout) - will load remote apps for child routes
  {
    path: 'dashboard',
    component: DashboardLayoutComponent
  },
  
  // Default redirect
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  
  // Wildcard route
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
