import { Component } from '@angular/core';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
