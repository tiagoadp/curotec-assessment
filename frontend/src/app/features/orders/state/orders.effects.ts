import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OrdersService } from '../../../core/services/orders.service';
import { loadOrders, loadOrdersFailure, loadOrdersSuccess } from './orders.actions';

@Injectable()
export class OrdersEffects {
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrders),
      mergeMap(() =>
        this.ordersService.getOrders().pipe(
          map(orders => loadOrdersSuccess({ orders })),
          catchError(error => [loadOrdersFailure({ error: error.message })])
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ordersService: OrdersService
  ) {}
}