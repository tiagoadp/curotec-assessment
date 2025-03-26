import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './products-list/products-list.component';
import { AuthGuard } from '../../core/auth/auth.guard';

const routes = [
  { 
    path: 'products',
    component: ProductsListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [ProductsListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule {}
