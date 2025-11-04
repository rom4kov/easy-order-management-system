import { Routes } from '@angular/router';
import { DashboardViewComponent } from './dashboard/dashboard-view/dashboard-view.component';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { CustomerFormComponent } from './dashboard/customers/customer-form/customer-form.component';
import { CustomersViewComponent } from './dashboard/customers/customers-view/customers-view.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { OrderFormComponent } from './dashboard/orders/order-form/order-form.component';
import { OrderViewComponent } from './dashboard/orders/order-view/order-view.component';
import { InvoicesComponent } from './dashboard/invoices/invoices.component';
import { InvoicesFormComponent } from './dashboard/invoices/invoices-form/invoices-form.component';
import { InvoicesViewComponent } from './dashboard/invoices/invoices-view/invoices-view.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';

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
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardOverviewComponent,
      },
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
      {
        path: 'invoices',
        component: InvoicesComponent,
      },
      {
        path: 'invoices/new',
        component: InvoicesFormComponent,
      },
      {
        path: 'invoices/:id',
        component: InvoicesViewComponent,
      },
      {
        path: 'invoices/edit/:id',
        component: InvoicesFormComponent,
      },
    ],
  },
];
