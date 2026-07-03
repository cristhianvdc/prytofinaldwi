import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { ImageUrlPipe } from '../../core/image-url.pipe';
import { Product, ProductVariant } from '../../core/models';
import { ProductService } from '../../core/product.service';

interface PurchaseOption {
  type: 'base' | 'variant';
  size: string;
  color: string;
  price: number;
  stock: number;
  sku?: string;
  variant?: ProductVariant;
}

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink, ImageUrlPipe],
  template: `
    <section class="product-detail-shell">
      <div class="container">
        @if (product()) {
          <a routerLink="/catalogo" class="btn btn-outline-dark mb-4"><i class="bi bi-arrow-left"></i> Volver a tienda</a>
          <div class="product-detail-card">
            <div class="product-gallery">
              <img [src]="product()!.imageUrl | imageUrl" [alt]="product()!.name">
            </div>
            <div class="product-detail-info">
              <span class="badge text-bg-light">{{ product()!.category }}</span>
              <h1>{{ product()!.name }}</h1>
              <p class="lead">{{ product()!.description }}</p>

              <div class="detail-price">
                S/ {{ currentPrice() }}
              </div>

              @if (product()!.variants.length) {
                <div class="variant-picker">
                  <h2>Selecciona talla</h2>
                  <select class="form-select" [ngModel]="selectedSize()" (ngModelChange)="selectSize($event)">
                    <option value="" disabled>Elige una talla</option>
                    @for (size of sizes(); track size) {
                      <option [value]="size">{{ size }}</option>
                    }
                  </select>

                  <h2 class="mt-3">Selecciona color</h2>
                  <select class="form-select" [disabled]="!selectedSize()" [ngModel]="selectedColor()" (ngModelChange)="selectColor($event)">
                    <option value="" disabled>Elige un color</option>
                    @for (color of colorsForSelectedSize(); track color) {
                      <option [value]="color">{{ color }}</option>
                    }
                  </select>

                  @if (selectedOption()) {
                    <div class="selected-variant-info">
                      <strong>{{ selectedOption()?.size }} / {{ selectedOption()?.color }}</strong>
                      <span>{{ selectedOption()?.type === 'base' ? 'Producto original' : 'SKU ' + (selectedOption()?.sku || 'N/A') }}</span>
                      <small>Stock {{ selectedOption()?.stock }}</small>
                    </div>
                  }
                </div>
              } @else {
                <div class="base-product-info">
                  <h2>Información del producto</h2>
                  <div class="detail-meta compact">
                    <div>
                      <span>Talla</span>
                      <strong>{{ product()!.size || 'Talla única' }}</strong>
                    </div>
                    <div>
                      <span>Color</span>
                      <strong>{{ product()!.color || 'Color único' }}</strong>
                    </div>
                  </div>
                </div>
              }

              <div class="detail-meta">
                <div>
                  <span>Marca</span>
                  <strong>{{ product()!.brand }}</strong>
                </div>
                <div>
                  <span>Stock disponible</span>
                  <strong>{{ stockAvailable() }}</strong>
                </div>
                <div>
                  <span>Presentación</span>
                  <strong>{{ presentationLabel() }}</strong>
                </div>
              </div>

              <div class="purchase-row">
                <input class="form-control" type="number" min="1" [max]="stockAvailable()" [(ngModel)]="quantity">
                <button class="btn btn-dark btn-lg" type="button" [disabled]="!canAddToCart()" (click)="addToCart()">
                  <i class="bi bi-bag-plus"></i> Agregar al carrito
                </button>
              </div>

              @if (added) {
                <div class="alert alert-success mt-3">
                  Producto agregado al carrito.
                  <a routerLink="/carrito" class="alert-link">Ver carrito</a>
                </div>
              }
            </div>
          </div>
        } @else {
          <div class="empty-state">Cargando producto...</div>
        }
      </div>
    </section>
  `
})
export class ProductDetailComponent implements OnInit {
  product = signal<Product | undefined>(undefined);
  selectedSize = signal('');
  selectedColor = signal('');
  quantity = 1;
  added = false;
  purchaseOptions = computed<PurchaseOption[]>(() => {
    const product = this.product();
    if (!product) {
      return [];
    }
    return [
      {
        type: 'base',
        size: product.size || 'Talla única',
        color: product.color || 'Color único',
        price: product.salePrice,
        stock: product.stock
      },
      ...product.variants.map((variant) => ({
        type: 'variant' as const,
        size: variant.size,
        color: variant.color,
        price: variant.salePrice,
        stock: variant.stock,
        sku: variant.sku,
        variant
      }))
    ];
  });
  selectedOption = computed(() => {
    if (!this.selectedSize() || !this.selectedColor()) {
      return undefined;
    }
    return this.purchaseOptions().find((option) => option.size === this.selectedSize() && option.color === this.selectedColor());
  });
  selectedVariant = computed(() => this.selectedOption()?.variant);
  stockAvailable = computed(() => this.selectedOption()?.stock ?? this.product()?.stock ?? 0);
  currentPrice = computed(() => this.selectedOption()?.price ?? this.product()?.salePrice ?? 0);

  constructor(private route: ActivatedRoute, private products: ProductService, private cart: CartService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.products.getBySlug(slug).subscribe((product) => {
      this.product.set(product);
      this.selectedSize.set('');
      this.selectedColor.set('');
    });
  }

  sizes(): string[] {
    return [...new Set(this.purchaseOptions().map((option) => option.size))];
  }

  colorsForSelectedSize(): string[] {
    return [...new Set(this.purchaseOptions()
      .filter((option) => option.size === this.selectedSize())
      .map((option) => option.color))];
  }

  selectSize(size: string): void {
    this.selectedSize.set(size);
    this.selectedColor.set('');
    this.quantity = 1;
    this.added = false;
  }

  selectColor(color: string): void {
    this.selectedColor.set(color);
    this.quantity = 1;
    this.added = false;
  }

  presentationLabel(): string {
    const product = this.product();
    if (!product?.variants.length) {
      return `${product?.size || 'Talla única'} / ${product?.color || 'Color único'}`;
    }
    return this.selectedOption()
      ? `${this.selectedOption()!.size} / ${this.selectedOption()!.color}`
      : 'Selecciona talla y color';
  }

  canAddToCart(): boolean {
    const product = this.product();
    if (!product) {
      return false;
    }
    if (product.variants.length && !this.selectedOption()) {
      return false;
    }
    return this.stockAvailable() > 0;
  }

  addToCart(): void {
    const product = this.product();
    if (!product || !this.canAddToCart()) {
      return;
    }
    const quantity = Math.min(Math.max(1, this.quantity), this.stockAvailable());
    this.cart.add(product, quantity, this.selectedVariant());
    this.quantity = quantity;
    this.added = true;
  }
}
