import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product, ProductVariant } from './models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'athletix_cart';
  private readonly state = signal<CartItem[]>(this.load());
  readonly items = computed(() => this.state());
  readonly count = computed(() => this.state().reduce((sum, item) => sum + item.quantity, 0));
  readonly total = computed(() => this.state().reduce((sum, item) => sum + this.unitPrice(item) * item.quantity, 0));

  add(product: Product, quantity = 1, variant?: ProductVariant): void {
    const items = [...this.state()];
    const key = this.key(product.id, variant?.id);
    const existing = items.find((item) => this.key(item.product.id, item.variant?.id) === key);
    const maxStock = variant?.stock ?? product.stock;
    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, maxStock);
    } else {
      items.push({ product, variant, quantity: Math.min(quantity, maxStock) });
    }
    this.persist(items);
  }

  update(productId: number, quantity: number, variantId?: number): void {
    const items = this.state()
      .map((item) => this.itemKey(item) === this.key(productId, variantId)
        ? { ...item, quantity: Math.max(1, quantity) }
        : item)
      .filter((item) => item.quantity > 0);
    this.persist(items);
  }

  remove(productId: number, variantId?: number): void {
    this.persist(this.state().filter((item) => this.itemKey(item) !== this.key(productId, variantId)));
  }

  clear(): void {
    this.persist([]);
  }

  unitPrice(item: CartItem): number {
    return item.variant?.salePrice ?? item.product.salePrice;
  }

  itemStock(item: CartItem): number {
    return item.variant?.stock ?? item.product.stock;
  }

  itemLabel(item: CartItem): string {
    return item.variant ? `${item.variant.size} / ${item.variant.color}` : 'Producto base';
  }

  itemKey(item: CartItem): string {
    return this.key(item.product.id, item.variant?.id);
  }

  private key(productId: number, variantId?: number): string {
    return `${productId}:${variantId ?? 'base'}`;
  }

  private persist(items: CartItem[]): void {
    const cleanItems = this.sanitize(items);
    localStorage.setItem(this.storageKey, JSON.stringify(cleanItems));
    this.state.set(cleanItems);
  }

  private load(): CartItem[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return [];
    }
    try {
      const cleanItems = this.sanitize(JSON.parse(raw));
      if (JSON.stringify(cleanItems) !== raw) {
        localStorage.setItem(this.storageKey, JSON.stringify(cleanItems));
      }
      return cleanItems;
    } catch {
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }

  private sanitize(value: unknown): CartItem[] {
    if (!Array.isArray(value)) {
      return [];
    }
    return value
      .filter((item): item is CartItem => {
        const candidate = item as Partial<CartItem> | undefined;
        return !!candidate
          && !!candidate.product
          && typeof candidate.product.id === 'number'
          && typeof candidate.product.name === 'string'
          && typeof candidate.product.salePrice === 'number'
          && typeof candidate.product.stock === 'number'
          && typeof candidate.quantity === 'number'
          && candidate.quantity > 0;
      })
      .map((item) => {
        const variant = this.isValidVariant(item.variant) ? item.variant : undefined;
        const normalized = { ...item, variant };
        const stock = this.itemStock(normalized);
        return {
          ...normalized,
          quantity: Math.min(Math.max(1, Math.floor(item.quantity)), Math.max(1, stock))
        };
      });
  }

  private isValidVariant(variant: ProductVariant | undefined): variant is ProductVariant {
    return !variant || (
      typeof variant.id === 'number'
      && typeof variant.size === 'string'
      && typeof variant.color === 'string'
      && typeof variant.salePrice === 'number'
      && typeof variant.stock === 'number'
    );
  }
}
