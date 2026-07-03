import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "../../core/auth.service";
import * as i2 from "../../core/cart.service";
function NavbarComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 8)(1, "a", 14);
    i0.ɵɵtext(2, "Admin");
    i0.ɵɵelementEnd()();
} }
function NavbarComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 8)(1, "a", 15);
    i0.ɵɵtext(2, "Mi cuenta");
    i0.ɵɵelementEnd()();
} }
function NavbarComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.cart.count());
} }
function NavbarComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 8)(1, "button", 16);
    i0.ɵɵlistener("click", function NavbarComponent_Conditional_22_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.auth.logout()); });
    i0.ɵɵtext(2, "Salir");
    i0.ɵɵelementEnd()();
} }
function NavbarComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 8)(1, "a", 17);
    i0.ɵɵtext(2, "Ingresar");
    i0.ɵɵelementEnd()();
} }
export class NavbarComponent {
    constructor(auth, cart) {
        this.auth = auth;
        this.cart = cart;
    }
    static { this.ɵfac = function NavbarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NavbarComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.CartService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NavbarComponent, selectors: [["app-navbar"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 24, vars: 4, consts: [[1, "navbar", "navbar-expand-lg", "navbar-dark", "sticky-top", "app-nav"], [1, "container"], ["routerLink", "/", 1, "navbar-brand", "fw-bold", "d-flex", "align-items-center", "gap-2"], [1, "brand-mark"], ["type", "button", "data-bs-toggle", "collapse", "data-bs-target", "#mainNav", "aria-label", "Abrir menu", 1, "navbar-toggler"], [1, "navbar-toggler-icon"], ["id", "mainNav", 1, "collapse", "navbar-collapse"], [1, "navbar-nav", "ms-auto", "align-items-lg-center", "gap-lg-2"], [1, "nav-item"], ["routerLink", "/catalogo", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/contactanos", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/carrito", "title", "Carrito", 1, "btn", "btn-sm", "btn-outline-light", "position-relative"], [1, "bi", "bi-bag"], [1, "cart-badge"], ["routerLink", "/admin", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/perfil", "routerLinkActive", "active", 1, "nav-link"], ["type", "button", 1, "btn", "btn-sm", "btn-light", 3, "click"], ["routerLink", "/login", 1, "btn", "btn-sm", "btn-light"]], template: function NavbarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "nav", 0)(1, "div", 1)(2, "a", 2)(3, "span", 3);
            i0.ɵɵtext(4, "A");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(5, " Athletix Sports ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "button", 4);
            i0.ɵɵelement(7, "span", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 6)(9, "ul", 7)(10, "li", 8)(11, "a", 9);
            i0.ɵɵtext(12, "Cat\u00E1logo");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "li", 8)(14, "a", 10);
            i0.ɵɵtext(15, "Cont\u00E1ctanos");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(16, NavbarComponent_Conditional_16_Template, 3, 0, "li", 8)(17, NavbarComponent_Conditional_17_Template, 3, 0, "li", 8);
            i0.ɵɵelementStart(18, "li", 8)(19, "a", 11);
            i0.ɵɵelement(20, "i", 12);
            i0.ɵɵtemplate(21, NavbarComponent_Conditional_21_Template, 2, 1, "span", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(22, NavbarComponent_Conditional_22_Template, 3, 0, "li", 8)(23, NavbarComponent_Conditional_23_Template, 3, 0, "li", 8);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(16);
            i0.ɵɵconditional(ctx.auth.hasRole("ADMIN") ? 16 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.auth.isLoggedIn() ? 17 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.cart.count() > 0 ? 21 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.auth.isLoggedIn() ? 22 : 23);
        } }, dependencies: [RouterLink, RouterLinkActive], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NavbarComponent, [{
        type: Component,
        args: [{
                selector: 'app-navbar',
                standalone: true,
                imports: [RouterLink, RouterLinkActive],
                template: `
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top app-nav">
      <div class="container">
        <a class="navbar-brand fw-bold d-flex align-items-center gap-2" routerLink="/">
          <span class="brand-mark">A</span>
          Athletix Sports
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Abrir menu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li class="nav-item"><a class="nav-link" routerLink="/catalogo" routerLinkActive="active">Catálogo</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/contactanos" routerLinkActive="active">Contáctanos</a></li>
            @if (auth.hasRole('ADMIN')) {
              <li class="nav-item"><a class="nav-link" routerLink="/admin" routerLinkActive="active">Admin</a></li>
            }
            @if (auth.isLoggedIn()) {
              <li class="nav-item"><a class="nav-link" routerLink="/perfil" routerLinkActive="active">Mi cuenta</a></li>
            }
            <li class="nav-item">
              <a class="btn btn-sm btn-outline-light position-relative" routerLink="/carrito" title="Carrito">
                <i class="bi bi-bag"></i>
                @if (cart.count() > 0) {
                  <span class="cart-badge">{{ cart.count() }}</span>
                }
              </a>
            </li>
            @if (auth.isLoggedIn()) {
              <li class="nav-item">
                <button class="btn btn-sm btn-light" type="button" (click)="auth.logout()">Salir</button>
              </li>
            } @else {
              <li class="nav-item"><a class="btn btn-sm btn-light" routerLink="/login">Ingresar</a></li>
            }
          </ul>
        </div>
      </div>
    </nav>
  `
            }]
    }], () => [{ type: i1.AuthService }, { type: i2.CartService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NavbarComponent, { className: "NavbarComponent" }); })();
//# sourceMappingURL=navbar.component.js.map