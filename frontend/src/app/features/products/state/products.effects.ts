import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductsService } from '../../../core/services/products.service';
import { loadProducts, loadProductsFailure, loadProductsSuccess } from './products.actions';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productsService.getProducts().pipe(
          map(products => loadProductsSuccess({ products })),
          catchError(error => [loadProductsFailure({ error: error.message })])
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
