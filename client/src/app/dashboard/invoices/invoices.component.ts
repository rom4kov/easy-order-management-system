import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Invoice } from '../../models/invoice';
import { InvoicesService } from './invoices.service';
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
  selector: 'app-invoices',
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
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent implements OnInit {
  displayedColumns: string[] = [
    'invoiceNumber',
    'order',
    'customer',
    'items',
    'createdAt',
    'updatedAt',
    'dueDate',
    'total',
    'status',
    'edit',
    'delete',
  ];
  invoices: Invoice[] = [];
  numOfInvoices: number = 0;
  loading$ = this.loadingService.loading$;
  searchTerm: string = '';
  filterBy: string = 'id';
  filterMode: 'ASC' | 'DESC' = 'DESC';

  constructor(
    private invoicesService: InvoicesService,
    private loadingService: LoadingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    try {
      this.loadingService.loadingOn();
      this.invoicesService
        .getInvoices('', 10, 0, this.filterBy, this.filterMode)
        .subscribe((response) => {
          const invoices = response.data;
          invoices.forEach((invoice) => {
            const invoicesSanitized = invoice.items?.replace(/'/g, '"');
            if (invoicesSanitized) {
              invoice.items = JSON.parse(invoicesSanitized);
            }
          });
          this.invoices = invoices;
          console.log(this.invoices);
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

    this.invoicesService
      .getInvoices(this.searchTerm, 10, 0, this.filterBy, this.filterMode)
      .subscribe((response) => {
        this.invoices = response.data;
      });
  }

  applySortFilter(value: string): void {
    this.filterBy = value;

    this.getCount(this.searchTerm);

    this.invoicesService
      .getInvoices(this.searchTerm, 10, 0, this.filterBy, this.filterMode)
      .subscribe((response) => {
        this.invoices = response.data;
      });
  }

  applySortFilterMode(value: 'ASC' | 'DESC'): void {
    this.filterMode = value;

    this.getCount(this.searchTerm);

    this.invoicesService
      .getInvoices(this.searchTerm, 10, 0, this.filterBy, this.filterMode)
      .subscribe((response) => {
        this.invoices = response.data;
      });
  }

  deleteInvoice(id: number) {
    console.log('clicked on delete');
    this.invoicesService.deleteInvoice(id).subscribe(() => {
      this.invoicesService
        .getInvoices(this.searchTerm, 10, 0, this.filterBy, this.filterMode)
        .subscribe((response) => {
          this.invoices = response.data;
          this.getCount('');
        });
    });
  }

  getCount(query: string): void {
    this.invoicesService.getNumOfInvoices(query).subscribe((res) => {
      this.numOfInvoices = res.data;
    });
  }

  getNextPage(event: PageEvent): void {
    console.log(event);
    this.invoicesService
      .getInvoices(
        this.searchTerm,
        10,
        event.pageIndex,
        this.filterBy,
        this.filterMode,
      )
      .subscribe((response) => {
        this.invoices = response.data;
      });
  }

  goToInvoiceView(id: number) {
    this.router.navigate(['/dashboard/invoices/' + id]);
  }
}
