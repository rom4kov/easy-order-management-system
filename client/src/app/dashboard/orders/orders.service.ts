import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, OrderToEdit } from '../../models/order';
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

  getOrders(
    searchTerm: string,
    amount: number,
    pageIdx: number,
    orderBy: string,
    orderMode: 'ASC' | 'DESC',
  ): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(this.apiUrl, {
      params: {
        search: searchTerm,
        page: pageIdx,
        amount: amount,
        orderBy: orderBy,
        orderMode: orderMode,
      },
    });
  }

  getNumOfOrders(searchTerm: string): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(this.apiUrl + '/count', {
      params: { search: searchTerm },
    });
  }

  getOrder(id: string): Observable<ApiResponse<Order>> | undefined {
    return this.http.get<ApiResponse<Order>>(this.apiUrl + '/' + id);
  }

  addOrder(order: Order): Observable<Response> {
    console.log(order);
    return this.http.post<Response>(this.apiUrl, order);
  }

  updateOrder(order: Order): Observable<Response> {
    return this.http.put<Response>(this.apiUrl, order);
  }

  deleteOrder(id: number): Observable<Response> {
    return this.http.delete<Response>(this.apiUrl + '/' + id);
  }

  transformOrderToEdit({ customer, ...rest }: Order): OrderToEdit {
    return {
      ...rest,
      customerId: Number(customer.id),
      customerName: customer.name,
    }
  }

  transformEditToOrder({ customer, ...rest }: Order): OrderToEdit {
    return {
      ...rest,
      customerId: Number(customer.id),
      customerName: customer.name,
    }
  }
}
