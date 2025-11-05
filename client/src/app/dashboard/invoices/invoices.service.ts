import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice, InvoiceToEdit } from '../../models/invoice';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> {
  data: T;
  meta?: any;
}

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private apiUrl: string = `${environment.apiUrl}/invoices`;

  constructor(private http: HttpClient) {}

  getInvoices(
    searchTerm: string,
    amount: number,
    pageIdx: number,
    orderBy: string,
    orderMode: 'ASC' | 'DESC',
  ): Observable<ApiResponse<Invoice[]>> {
    return this.http.get<ApiResponse<Invoice[]>>(this.apiUrl, {
      params: {
        search: searchTerm,
        page: pageIdx,
        amount: amount,
        orderBy: orderBy,
        orderMode: orderMode,
      },
    });
  }

  getNumOfInvoices(searchTerm: string): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(this.apiUrl + '/count', {
      params: { search: searchTerm },
    });
  }

  getInvoice(id: string): Observable<ApiResponse<Invoice>> | undefined {
    return this.http.get<ApiResponse<Invoice>>(this.apiUrl + '/' + id);
  }

  addInvoice(invoice: Invoice): Observable<Response> {
    console.log(invoice);
    return this.http.post<Response>(this.apiUrl, invoice);
  }

  updateInvoice(invoice: Invoice): Observable<Response> {
    console.log("invoice service frontend:", invoice);
    return this.http.put<Response>(this.apiUrl, invoice);
  }

  deleteInvoice(id: number): Observable<Response> {
    return this.http.delete<Response>(this.apiUrl + '/' + id);
  }

  transformInvoiceToEdit({ order, ...rest }: Invoice): InvoiceToEdit {
    return {
      ...rest,
      order,
      orderTitle: order.title,
      customer: order.customer,
      customerName: order.customer.name,
    }
  }
}
