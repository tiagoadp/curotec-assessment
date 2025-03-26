import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OrdersComponent } from './orders.component';
import { AuthGuard } from '../../core/auth/auth.guard';
import { ordersReducer } from './state/orders.reducer';
import { OrdersEffects } from './state/orders.effects';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: OrdersComponent,
        canActivate: [AuthGuard]
      }
    ]),
    StoreModule.forFeature('orders', ordersReducer),
    EffectsModule.forFeature([OrdersEffects])
  ]
})
export class OrdersModule {}
