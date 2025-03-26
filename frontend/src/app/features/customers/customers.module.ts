import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { AuthGuard } from '../../core/auth/auth.guard';

const routes = [
  { 
    path: 'profile',
    component: CustomerInfoComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [CustomerInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomersModule {}
