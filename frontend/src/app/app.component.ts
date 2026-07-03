import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/layout/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent],
  template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
    @if (!router.url.startsWith('/admin')) {
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <img src="/assets/img/logoprincipal.png" alt="Athletix Sport">
              <p>Ropa deportiva moderna para entrenar, moverte y vestir con estilo dentro y fuera de la cancha.</p>
              <div class="footer-social">
                <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                <a href="#" aria-label="TikTok"><i class="bi bi-tiktok"></i></a>
              </div>
            </div>

            <div>
              <h3>Tienda</h3>
              <a routerLink="/catalogo">Todos los productos</a>
              <a routerLink="/catalogo" [queryParams]="{ categoria: 'Deportes' }">Deportes</a>
              <a routerLink="/catalogo" [queryParams]="{ categoria: 'Ropa Urbana' }">Ropa urbana</a>
              <a routerLink="/catalogo" [queryParams]="{ categoria: 'Casacas' }">Casacas</a>
            </div>

            <div>
              <h3>Cuenta</h3>
              <a routerLink="/login">Iniciar sesión</a>
              <a routerLink="/registro">Crear cuenta</a>
              <a routerLink="/perfil">Mi perfil</a>
              <a routerLink="/carrito">Carrito</a>
            </div>

            <div>
              <h3>Contacto</h3>
              <p><i class="bi bi-envelope"></i> contacto&#64;athletixsport.com</p>
              <p><i class="bi bi-geo-alt"></i> Lima, Perú</p>
              <p><i class="bi bi-clock"></i> Lun - Sáb: 9:00 a.m. - 7:00 p.m.</p>
              <a class="footer-contact-link" routerLink="/contactanos">Enviar mensaje</a>
            </div>
          </div>

          <div class="footer-bottom">
            <span>&copy; 2025 ATHLETIX SPORT. Todos los derechos reservados.</span>
          </div>
        </div>
      </footer>
    }
  `
})
export class AppComponent {
  constructor(public router: Router) {}
}
