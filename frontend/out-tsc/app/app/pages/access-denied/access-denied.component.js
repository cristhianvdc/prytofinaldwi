import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
export class AccessDeniedComponent {
    static { this.ɵfac = function AccessDeniedComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AccessDeniedComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AccessDeniedComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 9, vars: 0, consts: [[1, "auth-shell"], [1, "auth-panel", "text-center"], [1, "bi", "bi-lock", "display-4", "text-danger"], [1, "text-secondary"], ["routerLink", "/", 1, "btn", "btn-primary"]], template: function AccessDeniedComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1);
            i0.ɵɵelement(2, "i", 2);
            i0.ɵɵelementStart(3, "h1");
            i0.ɵɵtext(4, "Acceso restringido");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, "Necesitas permisos de administrador para entrar a esta secci\u00F3n.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "a", 4);
            i0.ɵɵtext(8, "Volver al inicio");
            i0.ɵɵelementEnd()()();
        } }, dependencies: [RouterLink], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AccessDeniedComponent, [{
        type: Component,
        args: [{
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
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AccessDeniedComponent, { className: "AccessDeniedComponent" }); })();
//# sourceMappingURL=access-denied.component.js.map