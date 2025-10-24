import { Route } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';

export const remoteRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];
