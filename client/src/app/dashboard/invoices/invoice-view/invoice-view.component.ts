import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Invoice } from '../../../models/invoice';
import { InvoicesService } from '../invoices.service';
import { UserService } from '../../../user/user.service';
import { LoadingService } from '../../../loading/loading.service';
import { LoadingComponent } from '../../../loading/loading.component';

import { EMPTY_INVOICE } from '../../../models/defaults';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { generateInvoicePdf } from '../invoice-pdf/pdf-parameters';

@Component({
  selector: 'app-invoice-view',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    DatePipe,
    RouterLink,
    PdfViewerModule,
    LoadingComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './invoice-view.component.html',
  styleUrl: './invoice-view.component.css',
})
export class InvoiceViewComponent implements OnInit {
  invoice: Invoice = {
    ...EMPTY_INVOICE
  };

  invoicePdfBlob: string = "";
  pdfSrc: Uint8Array = new Uint8Array();

  constructor(
    private invoicesService: InvoicesService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      try {
        this.loadingService.loadingOn();
        this.invoicesService.getInvoice(id)?.subscribe(res => {
          const itemsSanitized = res.data.items?.replace(/'/g, '"');
          if (itemsSanitized) {
            res.data.items = JSON.parse(itemsSanitized);
          }
          this.invoice = res.data;

          console.log(this.invoice);

          let user = this.userService.getUser();

          if (!user) {
            const storedUser = localStorage.getItem("user");
            user = JSON.parse(storedUser ? storedUser : "");
          }
          if (user) {
            const pdfOject = generateInvoicePdf(this.invoice, user, false);
            this.pdfSrc = new Uint8Array(pdfOject.arrayBuffer);
          }
          this.loadingService.loadingOff();
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  downloadInvoicePdf(): void {
    let user = this.userService.getUser();

    if (!user) {
      const storedUser = localStorage.getItem("user");
      user = JSON.parse(storedUser ? storedUser : "");
    }
    if (user) {
      generateInvoicePdf(this.invoice, user, true);
    }
  }
}
