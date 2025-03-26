import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loadOrders } from './state/orders.actions';
import { selectAllOrders, selectOrdersLoading } from './state/orders.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  template: `
    <div class="orders-container">
      <h2>Order List</h2>
      <div *ngIf="loading$ | async" class="loading">Loading orders...</div>
      
      <div *ngFor="let order of orders$ | async" class="order-card">
        <h3>Order #{{ order.id }}</h3>
        <p>Status: {{ order.status }}</p>
        <p>Date: {{ order.createdAt | date }}</p>
        
        <div class="order-items">
          <div *ngFor="let item of order.items" class="item">
            Product ID: {{ item.productId }} - Qty: {{ item.quantity }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrdersComponent implements OnInit {
  orders$: Observable<any[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.orders$ = this.store.select(selectAllOrders);
    this.loading$ = this.store.select(selectOrdersLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadOrders());
  }
}
