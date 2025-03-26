import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private apiUrl = `${environment.api.orders}/api/orders`;

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<Order[]>(this.apiUrl);
  }
}
