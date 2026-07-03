import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CartService } from '../../core/cart.service';
import { ProductService } from '../../core/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div class="container">
        <a class="navbar-brand" routerLink="/">
          <img src="/assets/img/logoprincipal.png" alt="Logo Athletix Sport" width="100">
        </a>
        <button class="navbar-toggler" type="button" (click)="open = !open" aria-label="Abrir menu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" [class.show]="open" id="mainNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item"><a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/catalogo" routerLinkActive="active">Tienda</a></li>
            <li class="nav-item dropdown category-dropdown">
              <a class="nav-link dropdown-toggle" href="#" (click)="$event.preventDefault()">Categorías</a>
              <ul class="dropdown-menu">
                @for (category of categories(); track category) {
                  <li><a class="dropdown-item" routerLink="/catalogo" [queryParams]="{ categoria: category }">{{ category }}</a></li>
                }
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" routerLink="/catalogo">Ver todos los productos</a></li>
              </ul>
            </li>
            <li class="nav-item"><a class="nav-link" routerLink="/contactanos" routerLinkActive="active">Contáctanos</a></li>
            @if (auth.hasRole('ADMIN')) {
              <li class="nav-item"><a class="nav-link" routerLink="/admin" routerLinkActive="active">Admin</a></li>
            }
            @if (auth.isLoggedIn()) {
              <li class="nav-item"><a class="nav-link" routerLink="/perfil" routerLinkActive="active">Mi cuenta</a></li>
            }
          </ul>
          <div class="nav-actions d-flex align-items-center gap-2">
            <form class="nav-search-form d-flex d-none d-xl-flex" (ngSubmit)="search()">
              <input class="form-control me-2" type="search" name="searchQuery" [(ngModel)]="searchQuery" placeholder="Busca productos...">
              <button class="btn btn-danger nav-action-button" type="submit">Buscar</button>
            </form>
            <div>
              <a class="btn btn-outline-dark position-relative nav-icon-button" routerLink="/carrito" title="Carrito">
                <i class="bi bi-bag"></i>
                @if (cart.count() > 0) {
                  <span class="cart-badge">{{ cart.count() }}</span>
                }
              </a>
            </div>
            @if (auth.isLoggedIn()) {
              <a class="btn btn-dark nav-icon-button" routerLink="/perfil" title="Mi cuenta">
                <i class="bi bi-person"></i>
              </a>
            } @else {
              <a class="btn btn-dark nav-icon-button" routerLink="/login" title="Ingresar">
                <i class="bi bi-person"></i>
              </a>
            }
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  open = false;
  searchQuery = '';

  constructor(public auth: AuthService, public cart: CartService, private productService: ProductService, private router: Router) {
    this.productService.ensureLoaded();
  }

  categories(): string[] {
    return [...new Set(this.productService.publicProductsSignal()
      .filter((product) => product.active)
      .map((product) => product.category))];
  }

  search(): void {
    const query = this.searchQuery.trim();
    this.open = false;
    this.router.navigate(['/catalogo'], {
      queryParams: query ? { q: query } : {}
    });
  }
}
