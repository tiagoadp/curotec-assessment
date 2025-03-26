import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from './orders.actions';

export interface OrdersState {
  orders: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.loadOrders, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false
  })),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
