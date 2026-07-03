import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
export class AdminSettingsComponent {
    static { this.ɵfac = function AdminSettingsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminSettingsComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminSettingsComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 35, vars: 0, consts: [[1, "page-head", "admin-head"], [1, "container"], [1, "eyebrow"], ["routerLink", "/admin", 1, "btn", "btn-outline-light"], [1, "bi", "bi-arrow-left"], [1, "section-pad", "pt-4"], [1, "row", "g-4"], [1, "col-md-4"], [1, "setting-card"], [1, "bi", "bi-shield-lock"], [1, "bi", "bi-database"], [1, "bi", "bi-images"]], template: function AdminSettingsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3, "Configuraci\u00F3n");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Panel admin");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Vista preparada para par\u00E1metros generales de tienda y operaciones.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "a", 3);
            i0.ɵɵelement(9, "i", 4);
            i0.ɵɵtext(10, " Volver");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "section", 5)(12, "div", 1)(13, "div", 6)(14, "div", 7)(15, "div", 8);
            i0.ɵɵelement(16, "i", 9);
            i0.ɵɵelementStart(17, "h2");
            i0.ɵɵtext(18, "Seguridad");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "p");
            i0.ɵɵtext(20, "JWT activo, rutas admin protegidas y sesiones stateless.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(21, "div", 7)(22, "div", 8);
            i0.ɵɵelement(23, "i", 10);
            i0.ɵɵelementStart(24, "h2");
            i0.ɵɵtext(25, "Base de datos");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "p");
            i0.ɵɵtext(27, "MySQL con JPA/Hibernate y tablas para usuarios, productos, pedidos y contacto.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(28, "div", 7)(29, "div", 8);
            i0.ɵɵelement(30, "i", 11);
            i0.ɵɵelementStart(31, "h2");
            i0.ɵɵtext(32, "Im\u00E1genes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "p");
            i0.ɵɵtext(34, "Subida multipart hacia la carpeta configurable de archivos del backend.");
            i0.ɵɵelementEnd()()()()()();
        } }, dependencies: [RouterLink], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminSettingsComponent, [{
        type: Component,
        args: [{
                standalone: true,
                imports: [RouterLink],
                template: `
    <section class="page-head admin-head">
      <div class="container">
        <span class="eyebrow">Configuración</span>
        <h1>Panel admin</h1>
        <p>Vista preparada para parámetros generales de tienda y operaciones.</p>
        <a routerLink="/admin" class="btn btn-outline-light"><i class="bi bi-arrow-left"></i> Volver</a>
      </div>
    </section>
    <section class="section-pad pt-4">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="setting-card">
              <i class="bi bi-shield-lock"></i>
              <h2>Seguridad</h2>
              <p>JWT activo, rutas admin protegidas y sesiones stateless.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="setting-card">
              <i class="bi bi-database"></i>
              <h2>Base de datos</h2>
              <p>MySQL con JPA/Hibernate y tablas para usuarios, productos, pedidos y contacto.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="setting-card">
              <i class="bi bi-images"></i>
              <h2>Imágenes</h2>
              <p>Subida multipart hacia la carpeta configurable de archivos del backend.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminSettingsComponent, { className: "AdminSettingsComponent" }); })();
//# sourceMappingURL=admin-settings.component.js.map