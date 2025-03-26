import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../../core/services/customers.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Customer } from 'src/app/core/models/customer.model';

@Component({
  selector: 'app-customer-info',
  template: `
    <div *ngIf="customer">
      <h2>{{ customer.name }}</h2>
      <p>Email: {{ customer.email }}</p>
      <p>Member since: {{ customer.createdAt | date }}</p>
    </div>
    <div *ngIf="!customer && !loading">No customer data available</div>
    <div *ngIf="loading">Loading customer information...</div>
  `
})
export class CustomerInfoComponent implements OnInit {
  customer?: Customer;
  loading = true;

  constructor(
    private customersService: CustomersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userId = this.authService.currentUserId;
    if (userId) {
      this.loadCustomer(userId);
    }
  }

  private loadCustomer(userId: number): void {
    this.loading = true;
    this.customersService.getCustomer(userId).subscribe({
      next: (customer) => {
        this.customer = customer;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading customer:', error);
        this.loading = false;
      }
    });
  }
}