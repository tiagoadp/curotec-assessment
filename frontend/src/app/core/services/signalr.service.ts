import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { stockUpdated } from '../store/products/products.actions';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor(private store: Store) {
    this.buildConnection();
    this.startConnection();
  }

  private buildConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.api.orders}/orderhub`)
      .withAutomaticReconnect()
      .build();
  }

  private startConnection(): void {
    this.hubConnection.start()
      .then(() => {
        console.log('SignalR Connected');
        this.registerEvents();
      })
      .catch(err => console.error(err));
  }

  private registerEvents(): void {
    this.hubConnection.on('StockUpdated', (productId: number, newStock: number) => {
      this.store.dispatch(stockUpdated({ productId, newStock }));
    });
  }
}
