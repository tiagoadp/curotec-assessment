export interface Order {
    id: number;
    customerId: number;
    items: OrderItem[];
    status: string;
    createdAt: Date;
  }
  
  export interface OrderItem {
    id: number;
    productId: number;
    quantity: number;
    price: number;
  }
  