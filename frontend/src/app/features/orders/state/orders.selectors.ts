import { createSelector } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { OrdersState } from './orders.reducer';

export const selectOrdersState = (state: AppState) => state.orders;

export const selectAllOrders = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.orders
);

export const selectOrdersLoading = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.loading
);