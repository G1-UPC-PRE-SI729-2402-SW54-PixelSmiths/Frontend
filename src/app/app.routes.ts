import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { InvoicesComponent } from './dashboard/pages/invoices/invoices.component';
import { SupportComponent } from './dashboard/pages/support/support.component';
import { VehiclesComponent } from './dashboard/pages/vehicles/vehicles.component';
import { ProfileComponent } from './dashboard/pages/profile/profile.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { DashComponent } from './dashboard/pages/dash/dash.component';
import { authGuard } from './auth/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: LoginComponent,
    data: {
      mode: 'sign-in',
    },
  },
  {
    path: 'sign-up',
    component: LoginComponent,
    data: {
      mode: 'sign-up',
    },
  },
  {
    path: 'dashboard',
    component: DashComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
      },
      {
        path: 'support',
        component: SupportComponent,
      },
      {
        path: 'vehicles',
        component: VehiclesComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '**',
        redirectTo: './home'
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/sign-in',
  },
];
