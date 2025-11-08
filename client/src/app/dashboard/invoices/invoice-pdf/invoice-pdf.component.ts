import { Component } from '@angular/core';
import jsPDFInvoiceTemplate, { OutputType } from 'jspdf-invoice-template';
import { props } from './pdf-parameters';

@Component({
  selector: 'app-invoice-pdf',
  standalone: true,
  imports: [],
  templateUrl: './invoice-pdf.component.html',
  styleUrl: './invoice-pdf.component.css'
})
export class InvoicePdfComponent {

}
