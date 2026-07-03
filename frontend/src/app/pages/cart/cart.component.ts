import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { ImageUrlPipe } from '../../core/image-url.pipe';

@Component({
  standalone: true,
  imports: [RouterLink, ImageUrlPipe],
  template: `
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">Compra</span>
        <h1>Carrito</h1>
        <p>Revisa cantidades antes de confirmar tu pedido.</p>
      </div>
    </section>

    <section class="section-pad pt-4">
      <div class="container">
        @if (cart.items().length) {
          <div class="row g-4">
            <div class="col-lg-8">
              <div class="list-panel">
                @for (item of cart.items(); track cart.itemKey(item)) {
                  <div class="cart-row">
                    <img [src]="item.product.imageUrl | imageUrl" [alt]="item.product.name">
                    <div>
                      <h2>{{ item.product.name }}</h2>
                      <p>{{ cart.itemLabel(item) }} · Stock {{ cart.itemStock(item) }}</p>
                    </div>
                    <input class="form-control qty-input" type="number" min="1" [max]="cart.itemStock(item)"
                      [value]="item.quantity" (change)="cart.update(item.product.id, quantity($event), item.variant?.id)">
                    <strong>S/ {{ cart.unitPrice(item) * item.quantity }}</strong>
                    <button class="btn btn-outline-danger btn-sm" type="button" (click)="cart.remove(item.product.id, item.variant?.id)" title="Quitar">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                }
              </div>
            </div>
            <div class="col-lg-4">
              <aside class="summary-panel">
                <h2>Resumen</h2>
                <div class="summary-line"><span>Productos</span><strong>{{ cart.count() }}</strong></div>
                <div class="summary-line total"><span>Total</span><strong>S/ {{ cart.total() }}</strong></div>
                <a routerLink="/checkout" class="btn btn-primary w-100"><i class="bi bi-credit-card"></i> Finalizar compra</a>
                <a routerLink="/catalogo" class="btn btn-outline-secondary w-100 mt-2">Seguir comprando</a>
                <button class="btn btn-outline-danger w-100 mt-2" type="button" (click)="cart.clear()">Vaciar carrito</button>
              </aside>
            </div>
          </div>
        } @else {
          <div class="empty-state">
            <h2>Tu carrito está vacío</h2>
            <a routerLink="/catalogo" class="btn btn-primary mt-2">Ver catálogo</a>
          </div>
        }
      </div>
    </section>
  `
})
export class CartComponent {
  constructor(public cart: CartService) {}

  quantity(event: Event): number {
    return Number((event.target as HTMLInputElement).value);
  }
}
