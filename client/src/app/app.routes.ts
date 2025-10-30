import { Routes } from '@angular/router';
import { DashboardViewComponent } from './dashboard/dashboard-view/dashboard-view.component';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { CustomerFormComponent } from './dashboard/customers/customer-form/customer-form.component';
import { CustomersViewComponent } from './dashboard/customers/customers-view/customers-view.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { OrderFormComponent } from './dashboard/orders/order-form/order-form.component';
import { OrderViewComponent } from './dashboard/orders/order-view/order-view.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingpageComponent,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardViewComponent,
    children: [
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'customers/new',
        component: CustomerFormComponent,
      },
      {
        path: 'customers/:id',
        component: CustomersViewComponent,
      },
      {
        path: 'customers/edit/:id',
        component: CustomerFormComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'orders/new',
        component: OrderFormComponent,
      },
      {
        path: 'orders/:id',
        component: OrderViewComponent,
      },
      {
        path: 'orders/edit/:id',
        component: OrderFormComponent,
      },
    ],
  },
];
