import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { AuthGuard } from "./core/auth/auth.guard";
import { AuthService } from "./core/auth/auth.service";
import { TokenInterceptor } from "./core/auth/token.interceptor";
import { CustomersModule } from "./features/customers/customers.module";
import { ProductsModule } from "./features/products/products.module";
import { AppComponent } from "./app.component";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { OrdersModule } from "./features/orders/orders.module";
import { LoginModule } from "./features/login/login.module";
import { BrowserModule } from '@angular/platform-browser';
import { OrdersEffects } from "./features/orders/state/orders.effects";
import { ProductsEffects } from "./features/products/state/products.effects";
import { ordersReducer } from "./features/orders/state/orders.reducer";
import { productsReducer } from "./features/products/state/products.reducer";
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot([]),
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    StoreModule.forRoot({}),
    StoreModule.forRoot({
      orders: ordersReducer,
      products: productsReducer
    }),
    EffectsModule.forRoot([OrdersEffects, ProductsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    LoginModule,
    OrdersModule,
    ProductsModule,
    CustomersModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}