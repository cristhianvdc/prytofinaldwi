import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="auth-shell">
      <div class="auth-panel text-center">
        <i class="bi bi-lock display-4 text-danger"></i>
        <h1>Acceso restringido</h1>
        <p class="text-secondary">Necesitas permisos de administrador para entrar a esta sección.</p>
        <a routerLink="/" class="btn btn-primary">Volver al inicio</a>
      </div>
    </section>
  `
})
export class AccessDeniedComponent {}
