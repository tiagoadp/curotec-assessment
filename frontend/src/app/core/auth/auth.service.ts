import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.api.customers}/api/auth/login`, { email, password })
      .pipe(tap(res => this.storeToken(res.token)));
  }

  private storeToken(token: string): void {
    localStorage.setItem('jwt', token);
    this.decodeToken(token);
  }

  private decodeToken(token: string): void {
    const payload = JSON.parse(atob(token.split('.')[1]));
    this.currentUserSubject.next(payload);
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.currentUserSubject.next(null);
  }

  get token(): string | null {
    return localStorage.getItem('jwt');
  }

  isAuthenticated(): boolean {
    return !!this.token && !this.isTokenExpired();
  }

  private isTokenExpired(): boolean {
    const token = this.token;
    if (!token) return true;
    
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  get currentUserId(): number | null {
    return this.currentUserValue?.id || null;
  }
}
