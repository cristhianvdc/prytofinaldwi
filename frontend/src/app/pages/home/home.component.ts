import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models';
import { ProductService } from '../../core/product.service';
import { CartService } from '../../core/cart.service';
import { ImageUrlPipe } from '../../core/image-url.pipe';

@Component({
  standalone: true,
  imports: [RouterLink, ImageUrlPipe],
  template: `
    <div id="carouselEjemplo" class="carousel slide">
      <div class="carousel-inner">
        @for (banner of banners; track banner; let index = $index) {
          <div class="carousel-item" [class.active]="index === currentSlide">
            <img [src]="banner" class="d-block w-100" alt="Banner Athletix Sport">
          </div>
        }
      </div>
      <button class="carousel-control-prev" type="button" (click)="previousSlide()">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" (click)="nextSlide()">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>

    <section class="container my-5">
      <div class="featured-head">
        <h2>Productos Destacados</h2>
        @if (featuredProducts().length > pageSize) {
          <div class="featured-controls">
            <button class="btn btn-outline-dark btn-sm" type="button" (click)="previousFeaturedPage()" title="Anterior">
              <i class="bi bi-chevron-left"></i>
            </button>
            <button class="btn btn-outline-dark btn-sm" type="button" (click)="nextFeaturedPage()" title="Siguiente">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        }
      </div>
      @if (featuredProducts().length) {
        <div class="row g-4">
          @for (product of visibleFeaturedProducts(); track product.id) {
            <div class="col-md-3">
              <div class="card h-100 product-card-link" [routerLink]="['/producto', product.slug]" tabindex="0">
                <img [src]="product.imageUrl | imageUrl" class="card-img-top" [alt]="product.name">
                <div class="card-body text-center">
                  <h5 class="card-title">{{ product.name }}</h5>
                  <p class="text-secondary">{{ product.description }}</p>
                  <p class="card-text">{{ priceLabel(product) }}</p>
                  @if (product.variants.length) {
                    <span class="btn btn-dark">Ver variantes</span>
                  } @else {
                    <button class="btn btn-dark" type="button" [disabled]="product.stock === 0" (click)="addBase($event, product)">
                      Agregar al carrito
                    </button>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="empty-state small">Aún no hay productos destacados.</div>
      }
      @if (featuredProducts().length > pageSize) {
        <div class="featured-dots" aria-label="Páginas de productos destacados">
          @for (page of featuredPages(); track page) {
            <button type="button" [class.active]="page === currentFeaturedPage" (click)="currentFeaturedPage = page"></button>
          }
        </div>
      }
    </section>

    @if (selectedProduct) {
      <div class="modal fade show modal-visible" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ selectedProduct.name }}</h5>
              <button type="button" class="btn-close" (click)="selectedProduct = undefined"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="modal-product-img-container">
                    <img [src]="selectedProduct.imageUrl | imageUrl" class="modal-product-img img-fluid" [alt]="selectedProduct.name">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="modal-product-info">
                    <p>{{ selectedProduct.description }}</p>
                    <p>Tallas disponibles: {{ selectedProduct.size || 'S, M, L, XL' }}</p>
                    <p>Colores: {{ selectedProduct.color || 'Variados' }}</p>
                    <p>Stock disponible: {{ selectedProduct.stock }}</p>
                    <p>¿Deseas agregar este producto al carrito?</p>
                    <p class="h4-modal">Precio: S/ {{ selectedProduct.salePrice }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="selectedProduct = undefined">Cancelar</button>
              <button type="button" class="btn btn-dark" (click)="addSelected()">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" (click)="selectedProduct = undefined"></div>
    }

    <section class="home-style-section">
      <div class="container">
        <div class="home-section-head">
          <span>Compra por estilo</span>
          <h2>Encuentra tu próxima combinación</h2>
        </div>
        <div class="style-grid">
          @for (item of styleSections; track item.title) {
            <a class="style-tile" routerLink="/catalogo" [queryParams]="item.query">
              <img [src]="item.image" [alt]="item.title">
              <div>
                <span>{{ item.kicker }}</span>
                <strong>{{ item.title }}</strong>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <section class="home-benefits">
      <div class="container">
        <div class="benefit-grid">
          <div>
            <i class="bi bi-bag-check"></i>
            <strong>Compra rápida</strong>
            <span>Elige, revisa tu carrito y confirma en pocos pasos.</span>
          </div>
          <div>
            <i class="bi bi-person-check"></i>
            <strong>Datos guardados</strong>
            <span>Tu cuenta completa automáticamente la entrega.</span>
          </div>
          <div>
            <i class="bi bi-box-seam"></i>
            <strong>Stock actualizado</strong>
            <span>Consulta tallas, colores y disponibilidad antes de comprar.</span>
          </div>
        </div>
      </div>
    </section>

    <section class="home-cta-band">
      <div class="container">
        <div>
          <span>Athletix Sport</span>
          <h2>Ropa deportiva lista para entrenar, salir y moverte a tu ritmo.</h2>
        </div>
        <div class="home-cta-actions">
          <a routerLink="/catalogo" class="btn btn-danger btn-lg">Ver catálogo</a>
          <a routerLink="/registro" class="btn btn-outline-dark btn-lg">Crear cuenta</a>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit, OnDestroy {
  products = this.productService.publicProductsSignal;
  selectedProduct?: Product;
  currentSlide = 0;
  currentFeaturedPage = 0;
  readonly pageSize = 4;
  private heroTimer?: ReturnType<typeof setInterval>;
  banners = [
    '/assets/img/puma banner.webp',
    '/assets/img/adidas banner.avif',
    '/assets/img/banner4.jpg',
    '/assets/img/reebok banner.webp'
  ];
  styleSections = [
    {
      title: 'Deportes',
      kicker: 'Entrena con estilo',
      image: '/assets/img/nikerunning.jpeg',
      query: { categoria: 'Deportes' }
    },
    {
      title: 'Ropa Urbana',
      kicker: 'Sport casual',
      image: '/assets/img/nike sportswear2.webp',
      query: { categoria: 'Ropa Urbana' }
    },
    {
      title: 'Casacas',
      kicker: 'Para completar el outfit',
      image: '/assets/img/Casaca adidas.avif',
      query: { categoria: 'Casacas' }
    }
  ];

  constructor(private productService: ProductService, public cart: CartService) {
    this.productService.ensureLoaded();
  }

  ngOnInit(): void {
    this.startHeroAutoplay();
  }

  ngOnDestroy(): void {
    this.stopHeroAutoplay();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.banners.length;
    this.restartHeroAutoplay();
  }

  previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.banners.length) % this.banners.length;
    this.restartHeroAutoplay();
  }

  private startHeroAutoplay(): void {
    this.heroTimer = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.banners.length;
    }, 4500);
  }

  private stopHeroAutoplay(): void {
    if (this.heroTimer) {
      clearInterval(this.heroTimer);
    }
  }

  private restartHeroAutoplay(): void {
    this.stopHeroAutoplay();
    this.startHeroAutoplay();
  }

  featuredProducts(): Product[] {
    return this.products().filter((product) => product.active && product.featured);
  }

  visibleFeaturedProducts(): Product[] {
    const products = this.featuredProducts();
    const totalPages = Math.max(1, Math.ceil(products.length / this.pageSize));
    const page = this.currentFeaturedPage >= totalPages ? 0 : this.currentFeaturedPage;
    const start = page * this.pageSize;
    return products.slice(start, start + this.pageSize);
  }

  featuredPages(): number[] {
    return Array.from({ length: Math.ceil(this.featuredProducts().length / this.pageSize) }, (_, index) => index);
  }

  nextFeaturedPage(): void {
    const totalPages = Math.max(1, Math.ceil(this.featuredProducts().length / this.pageSize));
    this.currentFeaturedPage = (this.currentFeaturedPage + 1) % totalPages;
  }

  previousFeaturedPage(): void {
    const totalPages = Math.max(1, Math.ceil(this.featuredProducts().length / this.pageSize));
    this.currentFeaturedPage = (this.currentFeaturedPage - 1 + totalPages) % totalPages;
  }

  openProduct(product: Product): void {
    this.selectedProduct = product;
  }

  addSelected(): void {
    if (this.selectedProduct) {
      this.cart.add(this.selectedProduct);
      this.selectedProduct = undefined;
    }
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
}
