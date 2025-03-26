import { OrdersState } from './features/orders/state/orders.reducer';
import { ProductsState } from './features/products/state/products.reducer';

export interface AppState {
  orders: OrdersState;
  products: ProductsState;
}
