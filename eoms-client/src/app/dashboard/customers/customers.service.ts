import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../models/customer';
import { Observable } from 'rxjs';

interface ApiResponse<T> {
  data: T;
  meta?: any;
}

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private apiUrl: string = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  getCustomers(searchTerm: string, pageIdx: number): Observable<ApiResponse<Customer[]>> {
    return this.http.get<ApiResponse<Customer[]>>(this.apiUrl, {
      params: { search: searchTerm, page: pageIdx },
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
    console.log(customer);
    return this.http.post<Response>(this.apiUrl, customer);
  }

  updateCustomer(customer: Customer): Observable<Response> {
    return this.http.put<Response>(this.apiUrl, customer);
  }

  deleteCustomer(id: number): Observable<Response> {
    return this.http.delete<Response>(this.apiUrl + '/' + id);
  }
}
