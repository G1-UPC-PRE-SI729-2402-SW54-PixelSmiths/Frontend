import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { InvoicesComponent } from './dashboard/pages/invoices/invoices.component';
import { SupportComponent } from './dashboard/pages/support/support.component';
import { ProfileComponent } from './dashboard/pages/profile/profile.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { DashComponent } from './dashboard/pages/dash/dash.component';
import { authGuard } from './auth/guard/auth.guard';
import { VehicleDetailComponent } from './vehicles/pages/vehicle-detail/vehicle-detail.component';
import { VehiclesListComponent } from './vehicles/pages/vehicles-list/vehicles-list.component';

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
        component: HomeComponent,
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
        children: [
          {
            path: '',
            component: VehiclesListComponent,
          },
          {
            path: ':id',
            component: VehicleDetailComponent,
          },
        ],
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '**',
        redirectTo: './home',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/sign-in',
  },
];
