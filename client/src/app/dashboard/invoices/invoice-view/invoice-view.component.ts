import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Invoice } from '../../../models/invoice';
import { InvoicesService } from '../invoices.service';
import { UserService } from '../../../user/user.service';

import { EMPTY_INVOICE } from '../../../models/defaults';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { generateInvoicePdf } from '../invoice-pdf/pdf-parameters';

// import jsPDFInvoiceTemplate, { jsPDF } from 'jspdf-invoice-template';
// import { props } from '../invoice-pdf/pdf-parameters';

type JsPDFReturnObject = {
  pagesNumber: number, // (always) - number of pages
  // jsPDFDocObject: jsPDF, // if (returnJsPDFDocObject: true) - the doc already created. You can use it to add new content, new  pages.
  blob: Blob, // if (outputType: 'blob') - returns the created pdf file as a Blob object. So you can upload and save it to your server. (Idea from a comment on Twitter)
  dataUriString: string, // if (outputType: 'datauristring')
  arrayBuffer: ArrayBuffer // if (outputType: 'arraybuffer')
}

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
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.invoicesService.getInvoice(id)?.subscribe(res => {
        const itemsSanitized = res.data.items?.replace(/'/g, '"');
        if (itemsSanitized) {
          res.data.items = JSON.parse(itemsSanitized);
        }
        this.invoice = res.data;

        console.log(this.invoice);

        let user = this.userService.getUser();
        // const pdf = jsPDFInvoiceTemplate(props) as JsPDFReturnObject;
        //
        // console.log(pdf.dataUriString);
        // this.invoicePdfBlob = pdf.dataUriString;
        if (!user) {
          const storedUser = localStorage.getItem("user");
          user = JSON.parse(storedUser ? storedUser : "");
        }
        if (user) {
          const pdfOject = generateInvoicePdf(this.invoice, user);
          this.pdfSrc = new Uint8Array(pdfOject.arrayBuffer);
        }
      });
    }
  }
}
