import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loadProducts } from './state/products.actions';
import { selectAllProducts, selectProductsLoading } from './state/products.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  template: `
    <div *ngFor="let product of products$ | async">
      {{ product.name }} - {{ product.price }}
    </div>
  `
})
export class ProductsListComponent implements OnInit {
  products$: Observable<any[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectProductsLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
  }
}
