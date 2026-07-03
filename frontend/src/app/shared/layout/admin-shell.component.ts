import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="admin-shell">
      <aside class="admin-sidebar">
        <nav class="admin-nav">
          <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
            <i class="bi bi-speedometer2"></i>
            <span>Panel de control</span>
          </a>
          <a routerLink="/admin/productos" routerLinkActive="active">
            <i class="bi bi-box-seam"></i>
            <span>Productos</span>
          </a>
          <a routerLink="/admin/pedidos" routerLinkActive="active">
            <i class="bi bi-receipt"></i>
            <span>Pedidos</span>
          </a>
          <a routerLink="/catalogo">
            <i class="bi bi-shop"></i>
            <span>Ver tienda</span>
          </a>
        </nav>
        <button class="admin-profile" type="button" (click)="auth.logout()">
          <i class="bi bi-box-arrow-right"></i>
          <span>Cerrar sesión</span>
        </button>
      </aside>
      <section class="admin-main">
        <header class="admin-topbar">
          <h1>{{ title }}</h1>
          <div class="admin-actions">
            <div class="admin-search">
              <i class="bi bi-search"></i>
              <input type="search" placeholder="Buscar">
            </div>
            <button type="button" title="Notificaciones"><i class="bi bi-bell-fill"></i></button>
          </div>
        </header>
        <ng-content />
      </section>
    </div>
  `
})
export class AdminShellComponent {
  @Input({ required: true }) title = '';

  constructor(public auth: AuthService) {}
}
