import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiUrl: string = "http://localhost:3000";
  private customers: Customer[] = [];

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl + "/customers");
  }

  getCustomer(id: string): Customer | undefined {
    return this.customers.find(res => res.id === id);
  }

  addCustomer(customer: Customer): void {
    this.customers.push(customer);
  }
}
