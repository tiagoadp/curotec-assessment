import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomersService {
  private apiUrl = environment.api.customers;

  constructor(private http: HttpClient) {}

  getCustomer(id: number) {
    return this.http.get<Customer>(`${this.apiUrl}/api/customers/${id}`);
  }

  updateCustomer(id: number, customer: Partial<Customer>) {
    return this.http.put<Customer>(`${this.apiUrl}/api/customers/${id}`, customer);
  }
}
