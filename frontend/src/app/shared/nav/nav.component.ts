import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-nav',
  template: `
    <nav>
      <a routerLink="/products" *ngIf="auth.isAuthenticated()">Products</a>
      <a routerLink="/orders" *ngIf="auth.isAuthenticated()">Orders</a>
      <a routerLink="/profile" *ngIf="auth.isAuthenticated()">Profile</a>
      <button (click)="logout()" *ngIf="auth.isAuthenticated()">Logout</button>
    </nav>
  `
})
export class NavComponent {
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}