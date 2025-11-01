import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Customer } from '../../models/customer';
import { CustomersService } from './customers.service';
import { LoadingService } from '../../loading/loading.service';
import { RouterLink, Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClickStopPropagationDirective } from '../../directives/click-stop-propagation.directive';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    FormsModule,
    MatPaginatorModule,
    AngularSvgIconModule,
    AsyncPipe,
    ClickStopPropagationDirective,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'contactName',
    'phone',
    'email',
    'orders',
    'status',
    'edit',
    'delete',
  ];
  customers: Customer[] = [];
  numOfCustomers: number = 0;
  deletedCustomerId: number = -1;
  loading$ = this.loadingService.loading$;
  searchTerm: string = '';
  filterBy: string = 'id';
  filterMode: 'ASC' | 'DESC' = 'DESC';

  constructor(
    private customerService: CustomersService,
    private loadingService: LoadingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    try {
      this.loadingService.loadingOn();
      this.customerService
        .getCustomers('', 10, 0, this.filterBy, this.filterMode)
        .subscribe((response) => {
          this.customers = response.data;
          this.getCount('');
        });
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.loadingOff();
    }
  }

  applySearchFilter(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;

    this.getCount(this.searchTerm);

    this.customerService
      .getCustomers(this.searchTerm, 10, 0, this.filterBy, this.filterMode)
      .subscribe((response) => {
        this.customers = response.data;
      });
  }

  applySortFilter(value: string): void {
    this.filterBy = value;

    this.getCount(this.searchTerm);

    this.customerService
      .getCustomers(this.searchTerm, 10, 0, this.filterBy, this.filterMode)
      .subscribe((response) => {
        this.customers = response.data;
      });
  }

  applySortFilterMode(value: 'ASC' | 'DESC'): void {
    this.filterMode = value;

    this.getCount(this.searchTerm);

    this.customerService
      .getCustomers(this.searchTerm, 10, 0, this.filterBy, this.filterMode)
      .subscribe((response) => {
        this.customers = response.data;
      });
  }

  deleteCustomer(id: number) {
    this.deletedCustomerId = id;
    console.log('clicked on delete');
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.customerService
        .getCustomers(this.searchTerm, 10, 0, this.filterBy, this.filterMode)
        .subscribe((response) => {
          this.customers = response.data;
          this.getCount('');
        });
    });
  }

  getCount(query: string): void {
    this.customerService.getNumOfCustomers(query).subscribe((res) => {
      this.numOfCustomers = res.data;
    });
  }

  getNextPage(event: PageEvent): void {
    console.log(event);
    this.customerService
      .getCustomers(
        this.searchTerm,
        10,
        event.pageIndex,
        this.filterBy,
        this.filterMode,
      )
      .subscribe((response) => {
        this.customers = response.data;
      });
  }

  goToCustomerView(id: number) {
    if (this.deletedCustomerId !== id) {
      this.router.navigate(['/dashboard/customers/' + id]);
      this.deletedCustomerId = -1;
    }
  }
}
