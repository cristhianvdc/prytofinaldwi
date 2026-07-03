import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CartService } from '../../core/cart.service';
import { ImageUrlPipe } from '../../core/image-url.pipe';
import { Product } from '../../core/models';
import { ProductService } from '../../core/product.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink, ImageUrlPipe],
  template: `
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">Tienda</span>
        <h1>Catálogo deportivo</h1>
        <p>Elige tus prendas y agrégalas al carrito. Para finalizar la compra se solicitará iniciar sesión.</p>
      </div>
    </section>

    <section class="section-pad pt-4">
      <div class="container">
        <div class="toolbar">
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
            <input class="form-control" [(ngModel)]="query" placeholder="Buscar por nombre o categoría">
          </div>
          <select class="form-select" [(ngModel)]="category">
            <option value="">Todas las categorías</option>
            @for (item of categories(); track item) {
              <option [value]="item">{{ item }}</option>
            }
          </select>
        </div>

        <div class="row g-4 mt-1">
          @for (product of filtered(); track product.id) {
            <div class="col-sm-6 col-xl-3">
              <article class="card h-100 product-card-link" [routerLink]="['/producto', product.slug]" tabindex="0">
                <img [src]="product.imageUrl | imageUrl" class="card-img-top" [alt]="product.name">
                <div class="card-body text-center">
                  <div class="d-flex justify-content-between align-items-start gap-2">
                    <span class="badge text-bg-light">{{ product.category }}</span>
                    <span class="stock-pill" [class.low]="product.stock <= 5">{{ product.stock }} uds</span>
                  </div>
                  <h5 class="card-title mt-3">{{ product.name }}</h5>
                  <p class="text-secondary">{{ product.description }}</p>
                  <div class="d-flex align-items-center justify-content-between mt-3">
                    <strong class="fs-5">{{ priceLabel(product) }}</strong>
                    @if (product.variants.length) {
                      <span class="btn btn-dark btn-sm">
                        <i class="bi bi-sliders"></i> Ver variantes
                      </span>
                    } @else {
                      <button class="btn btn-dark btn-sm" type="button" [disabled]="product.stock === 0" (click)="addBase($event, product)">
                        <i class="bi bi-bag-plus"></i> Agregar
                      </button>
                    }
                  </div>
                </div>
              </article>
            </div>
          } @empty {
            <div class="col-12">
              <div class="empty-state">No encontramos productos con ese filtro.</div>
            </div>
          }
        </div>

        @if (!auth.isLoggedIn()) {
          <div class="alert alert-info mt-4">
            Para finalizar una compra necesitarás iniciar sesión o registrarte.
          </div>
        }
      </div>
    </section>
  `
})
export class CatalogComponent {
  query = '';
  category = '';
  products = this.productService.publicProductsSignal;
  categories(): string[] {
    return [...new Set(this.products().map((product) => product.category))];
  }

  filtered() {
    const query = this.query.toLowerCase().trim();
    return this.products().filter((product) => {
      const matchesQuery = !query
        || product.name.toLowerCase().includes(query)
        || product.category.toLowerCase().includes(query)
        || product.brand.toLowerCase().includes(query)
        || product.description.toLowerCase().includes(query);
      const matchesCategory = !this.category || product.category === this.category;
      return matchesQuery && matchesCategory;
    });
  }

  priceLabel(product: Product): string {
    if (!product.variants.length) {
      return `S/ ${product.salePrice}`;
    }
    const prices = product.variants.map((variant) => variant.salePrice);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `S/ ${min}` : `S/ ${min} - S/ ${max}`;
  }

  addBase(event: Event, product: Product): void {
    event.preventDefault();
    event.stopPropagation();
    this.cart.add(product);
  }

  constructor(private productService: ProductService, public cart: CartService, public auth: AuthService, private route: ActivatedRoute) {
    this.productService.ensureLoaded();
    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('categoria') ?? '';
      this.query = params.get('q') ?? '';
    });
  }
}
