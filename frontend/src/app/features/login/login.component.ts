import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Email</label>
          <input type="email" formControlName="email" class="form-control">
          <div *ngIf="form.get('email')?.invalid && form.get('email')?.touched" class="error">
            Valid email required
          </div>
        </div>
        
        <div class="form-group">
          <label>Password</label>
          <input type="password" formControlName="password" class="form-control">
          <div *ngIf="form.get('password')?.invalid && form.get('password')?.touched" class="error">
            Password required
          </div>
        </div>

        <button type="submit" [disabled]="form.invalid" class="btn btn-primary">
          Login
        </button>
        
        <div *ngIf="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  `
})
export class LoginComponent {
  form: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.auth.login(email, password).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => this.errorMessage = err.message
      });
    }
  }
}
