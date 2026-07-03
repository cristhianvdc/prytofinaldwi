import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { CartItem, UserProfile } from '../../core/models';
import { ImageUrlPipe } from '../../core/image-url.pipe';
import { OrderService } from '../../core/order.service';
import { UserService } from '../../core/user.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ImageUrlPipe],
  template: `
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">Checkout</span>
        <h1>Confirma tu compra</h1>
        <p>Revisa tus datos y el resumen antes de finalizar tu pedido.</p>
      </div>
    </section>

    <section class="section-pad pt-4">
      <div class="container">
        @if (success) {
          <div class="success-panel">
            <i class="bi bi-check-circle"></i>
            <h2>Pedido registrado</h2>
            <p>Tu orden #{{ success }} fue creada correctamente.</p>
            <a routerLink="/perfil" class="btn btn-primary">Ver mis pedidos</a>
          </div>
        } @else if (items.length) {
          <div class="row g-4">
            <div class="col-lg-7">
              <form class="form-panel" [formGroup]="form" (ngSubmit)="submit()">
                <h2>Datos de entrega</h2>
                @if (error) {
                  <div class="alert alert-danger">{{ error }}</div>
                }
                @if (loadingProfile) {
                  <div class="alert alert-secondary">Cargando datos de tu cuenta...</div>
                } @else if (profile) {
                  <div class="checkout-profile-box">
                    <h3>Se usará la información de tu cuenta</h3>
                    <div class="checkout-delivery-grid">
                      @for (row of deliveryRows(); track row.label) {
                        <div>
                          <span>{{ row.label }}</span>
                          <strong>{{ row.value || 'No registrado' }}</strong>
                        </div>
                      }
                    </div>
                  </div>
                  @if (!hasCompleteDeliveryData()) {
                    <div class="alert alert-warning mt-3">
                      Completa los datos faltantes en <a routerLink="/perfil">tu perfil</a> antes de confirmar.
                    </div>
                  }
                }
                <button class="btn btn-primary mt-3" type="submit" [disabled]="form.invalid || loading || loadingProfile">
                  <i class="bi bi-shield-check"></i> Confirmar compra
                </button>
              </form>
            </div>
            <div class="col-lg-5">
              <aside class="summary-panel">
                <h2>Resumen</h2>
                @for (item of items; track cart.itemKey(item)) {
                  <div class="checkout-summary-item">
                    <img [src]="item.product.imageUrl | imageUrl" [alt]="item.product.name">
                    <div>
                      <strong>{{ item.product.name }}</strong>
                      <span>{{ cart.itemLabel(item) }} · Cantidad {{ item.quantity }}</span>
                    </div>
                    <b>S/ {{ lineTotal(item) }}</b>
                  </div>
                }
                <div class="summary-line"><span>Productos</span><strong>{{ itemCount() }}</strong></div>
                <div class="summary-line total"><span>Total</span><strong>S/ {{ total() }}</strong></div>
              </aside>
            </div>
          </div>
        } @else {
          <div class="empty-state">
            <h2>No hay productos para comprar</h2>
            <a routerLink="/catalogo" class="btn btn-primary mt-2">Ir al catálogo</a>
          </div>
        }
      </div>
    </section>
  `
})
export class CheckoutComponent implements OnInit {
  profile?: UserProfile;
  items: CartItem[] = [];
  loading = false;
  loadingProfile = true;
  error = '';
  success = 0;
  form = this.fb.nonNullable.group({
    shippingAddress: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private fb: FormBuilder, public cart: CartService, private orders: OrderService, private userService: UserService) {}

  ngOnInit(): void {
    this.items = this.cart.items();
    this.userService.profile().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.form.patchValue({ shippingAddress: this.buildShippingAddress(profile) });
        this.loadingProfile = false;
      },
      error: () => {
        this.loadingProfile = false;
      }
    });
  }

  submit(): void {
    if (this.form.invalid || !this.items.length) {
      return;
    }
    this.loading = true;
    this.error = '';
    this.orders.checkout(this.items, this.form.getRawValue().shippingAddress).subscribe({
      next: (order) => {
        this.success = order.id;
        this.cart.clear();
        this.items = [];
      },
      error: (err) => {
        this.error = err.error?.message ?? 'No se pudo crear el pedido';
        this.loading = false;
      }
    });
  }

  hasCompleteDeliveryData(): boolean {
    return !!this.profile?.fullName && !!this.profile?.phone && !!this.profile?.address
      && !!this.profile?.city && !!this.profile?.district;
  }

  deliveryRows(): { label: string; value: string }[] {
    return [
      { label: 'Nombre completo', value: this.profile?.fullName ?? '' },
      { label: 'Correo electrónico', value: this.profile?.email ?? '' },
      { label: 'Teléfono', value: this.profile?.phone ?? '' },
      { label: 'Dirección', value: this.profile?.address ?? '' },
      { label: 'Distrito', value: this.profile?.district ?? '' },
      { label: 'Ciudad', value: this.profile?.city ?? '' }
    ];
  }

  lineTotal(item: CartItem): number {
    return this.cart.unitPrice(item) * item.quantity;
  }

  itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  total(): number {
    return this.items.reduce((sum, item) => sum + this.lineTotal(item), 0);
  }

  private buildShippingAddress(profile: UserProfile): string {
    const parts = [
      profile.fullName ? `Nombre: ${profile.fullName}` : '',
      profile.phone ? `Teléfono: ${profile.phone}` : '',
      profile.address ? `Dirección: ${profile.address}` : '',
      profile.district ? `Distrito: ${profile.district}` : '',
      profile.city ? `Ciudad: ${profile.city}` : ''
    ].filter(Boolean);
    return parts.join('\n');
  }
}
