import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';
import { CartItem, Order } from './models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  checkout(items: CartItem[], shippingAddress: string): Observable<Order> {
    return this.http.post<Order>(`${API_URL}/orders`, {
      shippingAddress,
      items: items.map((item) => ({ productId: item.product.id, variantId: item.variant?.id, quantity: item.quantity }))
    });
  }

  mine(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_URL}/orders/mine`);
  }

  all(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_URL}/admin/orders`);
  }

  updateStatus(id: number, status: string): Observable<Order> {
    return this.http.patch<Order>(`${API_URL}/admin/orders/${id}/status`, { status });
  }
}
