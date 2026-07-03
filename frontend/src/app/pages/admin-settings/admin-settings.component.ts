import { Component } from '@angular/core';
import { AdminShellComponent } from '../../shared/layout/admin-shell.component';

@Component({
  standalone: true,
  imports: [AdminShellComponent],
  template: `
    <app-admin-shell title="Configuración">
      <div class="admin-grid settings-grid">
        <div class="admin-card setting-card">
          <i class="bi bi-shield-lock"></i>
          <h2>Seguridad</h2>
          <p>JWT activo, rutas admin protegidas y sesiones stateless.</p>
        </div>
        <div class="admin-card setting-card">
          <i class="bi bi-database"></i>
          <h2>Base de datos</h2>
          <p>MySQL con JPA/Hibernate y tablas para usuarios, productos, variantes, pedidos y contacto.</p>
        </div>
        <div class="admin-card setting-card">
          <i class="bi bi-images"></i>
          <h2>Imágenes</h2>
          <p>Subida multipart hacia la carpeta configurable de archivos del backend.</p>
        </div>
        <div class="admin-card setting-card">
          <i class="bi bi-clipboard-data"></i>
          <h2>Inventario</h2>
          <p>Umbral mínimo configurable por producto y variantes por talla, color y precio.</p>
        </div>
      </div>
    </app-admin-shell>
  `
})
export class AdminSettingsComponent {}
