import { Routes } from '@angular/router';
import { DashboardViewComponent } from './dashboard/dashboard-view/dashboard-view.component';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { CustomerFormComponent } from './dashboard/customers/customer-form/customer-form.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardViewComponent,
    children: [
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'customers/edit/:id',
        component: CustomerFormComponent,
      },
    ],
  },
];
