import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_URL } from './api.config';
import { Product } from './models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly publicProductsSignal = signal<Product[]>([]);
  private loaded = false;

  constructor(private http: HttpClient) {}

  publicProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/products`).pipe(tap((products) => {
      this.publicProductsSignal.set(products);
      this.loaded = true;
    }));
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }

  getBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/slug/${slug}`);
  }

  ensureLoaded(): void {
    if (!this.loaded) {
      this.publicProducts().subscribe();
    }
  }

  adminProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/admin/products`);
  }

  save(form: FormData, id?: number): Observable<Product> {
    if (id) {
      return this.http.put<Product>(`${API_URL}/admin/products/${id}`, form);
    }
    return this.http.post<Product>(`${API_URL}/admin/products`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/admin/products/${id}`);
  }
}
