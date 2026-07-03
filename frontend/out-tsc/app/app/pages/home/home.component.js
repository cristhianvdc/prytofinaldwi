import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageUrlPipe } from '../../core/image-url.pipe';
import * as i0 from "@angular/core";
import * as i1 from "../../core/product.service";
import * as i2 from "../../core/cart.service";
const _forTrack0 = ($index, $item) => $item.id;
function HomeComponent_For_27_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15)(1, "article", 16);
    i0.ɵɵelement(2, "img", 17);
    i0.ɵɵpipe(3, "imageUrl");
    i0.ɵɵelementStart(4, "div", 18)(5, "span", 19);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "h3");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 20)(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 21);
    i0.ɵɵlistener("click", function HomeComponent_For_27_Template_button_click_14_listener() { const product_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.cart.add(product_r2)); });
    i0.ɵɵelement(15, "i", 22);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const product_r2 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", i0.ɵɵpipeBind1(3, 6, product_r2.imageUrl), i0.ɵɵsanitizeUrl)("alt", product_r2.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(product_r2.category);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(product_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(product_r2.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("S/ ", product_r2.salePrice, "");
} }
export class HomeComponent {
    constructor(productService, cart) {
        this.productService = productService;
        this.cart = cart;
        this.products = this.productService.publicProductsSignal;
        this.productService.ensureLoaded();
    }
    static { this.ɵfac = function HomeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomeComponent)(i0.ɵɵdirectiveInject(i1.ProductService), i0.ɵɵdirectiveInject(i2.CartService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HomeComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 28, vars: 0, consts: [[1, "hero-section"], [1, "container", "hero-grid"], [1, "hero-copy"], [1, "eyebrow"], [1, "d-flex", "flex-wrap", "gap-2"], ["routerLink", "/catalogo", 1, "btn", "btn-primary", "btn-lg"], [1, "bi", "bi-lightning-charge"], ["routerLink", "/registro", 1, "btn", "btn-outline-light", "btn-lg"], [1, "bi", "bi-person-plus"], [1, "hero-media"], ["src", "/assets/hero-athletix.svg", "alt", "Athletix Sports outfit"], [1, "section-pad"], [1, "container"], [1, "section-title"], [1, "row", "g-4"], [1, "col-md-6", "col-xl-3"], [1, "product-card", "h-100"], [3, "src", "alt"], [1, "p-3"], [1, "badge", "text-bg-light"], [1, "d-flex", "align-items-center", "justify-content-between"], ["type", "button", 1, "btn", "btn-dark", "btn-sm", 3, "click"], [1, "bi", "bi-plus-lg"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
            i0.ɵɵtext(4, "Performance wear");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Athletix Sports");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p");
            i0.ɵɵtext(8, "Ropa deportiva moderna para entrenar fuerte, moverte c\u00F3modo y comprar sin vueltas.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 4)(10, "a", 5);
            i0.ɵɵelement(11, "i", 6);
            i0.ɵɵtext(12, " Comprar ahora");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "a", 7);
            i0.ɵɵelement(14, "i", 8);
            i0.ɵɵtext(15, " Crear cuenta");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(16, "div", 9);
            i0.ɵɵelement(17, "img", 10);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(18, "section", 11)(19, "div", 12)(20, "div", 13)(21, "span");
            i0.ɵɵtext(22, "Nuevo stock");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "h2");
            i0.ɵɵtext(24, "Equipamiento listo para tu pr\u00F3xima rutina");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 14);
            i0.ɵɵrepeaterCreate(26, HomeComponent_For_27_Template, 16, 8, "div", 15, _forTrack0);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(26);
            i0.ɵɵrepeater(ctx.products().slice(0, 4));
        } }, dependencies: [RouterLink, ImageUrlPipe], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomeComponent, [{
        type: Component,
        args: [{
                standalone: true,
                imports: [RouterLink, ImageUrlPipe],
                template: `
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">Performance wear</span>
          <h1>Athletix Sports</h1>
          <p>Ropa deportiva moderna para entrenar fuerte, moverte cómodo y comprar sin vueltas.</p>
          <div class="d-flex flex-wrap gap-2">
            <a routerLink="/catalogo" class="btn btn-primary btn-lg"><i class="bi bi-lightning-charge"></i> Comprar ahora</a>
            <a routerLink="/registro" class="btn btn-outline-light btn-lg"><i class="bi bi-person-plus"></i> Crear cuenta</a>
          </div>
        </div>
        <div class="hero-media">
          <img src="/assets/hero-athletix.svg" alt="Athletix Sports outfit">
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container">
        <div class="section-title">
          <span>Nuevo stock</span>
          <h2>Equipamiento listo para tu próxima rutina</h2>
        </div>
        <div class="row g-4">
          @for (product of products().slice(0, 4); track product.id) {
            <div class="col-md-6 col-xl-3">
              <article class="product-card h-100">
                <img [src]="product.imageUrl | imageUrl" [alt]="product.name">
                <div class="p-3">
                  <span class="badge text-bg-light">{{ product.category }}</span>
                  <h3>{{ product.name }}</h3>
                  <p>{{ product.description }}</p>
                  <div class="d-flex align-items-center justify-content-between">
                    <strong>S/ {{ product.salePrice }}</strong>
                    <button class="btn btn-dark btn-sm" type="button" (click)="cart.add(product)">
                      <i class="bi bi-plus-lg"></i>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          }
        </div>
      </div>
    </section>
  `
            }]
    }], () => [{ type: i1.ProductService }, { type: i2.CartService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HomeComponent, { className: "HomeComponent" }); })();
//# sourceMappingURL=home.component.js.map