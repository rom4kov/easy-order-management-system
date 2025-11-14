import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../models/customer';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> {
  data: T;
  meta?: any;
}

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private apiUrl: string = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {}

  getCustomers(
    searchTerm: string,
    amount: number,
    pageIdx: number,
    orderBy: string,
    orderMode: 'ASC' | 'DESC',
  ): Observable<ApiResponse<Customer[]>> {
    return this.http.get<ApiResponse<Customer[]>>(this.apiUrl, {
      params: {
        search: searchTerm,
        page: pageIdx,
        amount: amount,
        orderBy: orderBy,
        orderMode: orderMode,
      },
    });
  }

  getNumOfCustomers(searchTerm: string): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(this.apiUrl + '/count', {
      params: { search: searchTerm },
    });
  }

  getCustomer(id: string): Observable<ApiResponse<Customer>> | undefined {
    return this.http.get<ApiResponse<Customer>>(this.apiUrl + '/' + id);
  }

  addCustomer(customer: Customer): Observable<Response> {
    return this.http.post<Response>(this.apiUrl, customer);
  }

  uploadCustomerImage(file: File): Observable<Response> {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<Response>(
      'http://localhost:3000/api/upload',
      formData,
    );
  }

  updateCustomer(customer: Customer): Observable<Response> {
    return this.http.put<Response>(this.apiUrl, customer);
  }

  deleteCustomer(id: number): Observable<Response> {
    return this.http.delete<Response>(this.apiUrl + '/' + id);
  }
}
