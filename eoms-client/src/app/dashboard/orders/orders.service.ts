import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../models/order';
import { Observable } from 'rxjs';

interface ApiResponse<T> {
  data: T;
  meta?: any;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = "http://localhost:3000/orders";

  constructor(private http: HttpClient) {}

  getOrders(searchTerm: string, pageIdx: number): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(this.apiUrl, {
      params: { search: searchTerm, page: pageIdx },
    });
  }

  getNumOfOrders(searchTerm: string): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(this.apiUrl + '/count', {
      params: { search: searchTerm },
    });
  }
}
