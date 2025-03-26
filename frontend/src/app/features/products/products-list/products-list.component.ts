import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts } from '../state/products.actions';
import { selectAllProducts, selectProductsLoading } from '../state/products.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-list',
  template: `
    <div *ngIf="loading$ | async">Loading...</div>
    <div *ngFor="let product of products$ | async" class="product-item">
      <h3>{{ product.name }}</h3>
      <p>Price: {{ product.price | currency }}</p>
      <p>Stock: {{ product.stock }}</p>
    </div>
  `
})
export class ProductsListComponent implements OnInit {
  products$: Observable<any[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectProductsLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
  }
}
