import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageUrlPipe } from '../../core/image-url.pipe';
import * as i0 from "@angular/core";
import * as i1 from "../../core/product.service";
import * as i2 from "../../core/cart.service";
import * as i3 from "../../core/auth.service";
import * as i4 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function CatalogComponent_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r1);
} }
function CatalogComponent_For_22_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13)(1, "article", 16);
    i0.ɵɵelement(2, "img", 17);
    i0.ɵɵpipe(3, "imageUrl");
    i0.ɵɵelementStart(4, "div", 18)(5, "div", 19)(6, "span", 20);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 21);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "h3");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 22)(15, "span");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 23)(20, "strong");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 24);
    i0.ɵɵlistener("click", function CatalogComponent_For_22_Template_button_click_22_listener() { const product_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.cart.add(product_r3)); });
    i0.ɵɵelement(23, "i", 25);
    i0.ɵɵtext(24, " Agregar ");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const product_r3 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", i0.ɵɵpipeBind1(3, 12, product_r3.imageUrl), i0.ɵɵsanitizeUrl)("alt", product_r3.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(product_r3.category);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("low", product_r3.stock <= 5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", product_r3.stock, " uds");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(product_r3.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(product_r3.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(product_r3.size || "Talla \u00FAnica");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(product_r3.color || "Color mixto");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("S/ ", product_r3.salePrice, "");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", product_r3.stock === 0);
} }
function CatalogComponent_ForEmpty_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "div", 26);
    i0.ɵɵtext(2, "No encontramos productos con ese filtro.");
    i0.ɵɵelementEnd()();
} }
function CatalogComponent_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵtext(1, " Para finalizar una compra necesitar\u00E1s iniciar sesi\u00F3n o registrarte. ");
    i0.ɵɵelementEnd();
} }
export class CatalogComponent {
    categories() {
        return [...new Set(this.products().map((product) => product.category))];
    }
    filtered() {
        const query = this.query.toLowerCase().trim();
        return this.products().filter((product) => {
            const matchesQuery = !query || product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
            const matchesCategory = !this.category || product.category === this.category;
            return matchesQuery && matchesCategory;
        });
    }
    constructor(productService, cart, auth) {
        this.productService = productService;
        this.cart = cart;
        this.auth = auth;
        this.query = '';
        this.category = '';
        this.products = this.productService.publicProductsSignal;
        this.productService.ensureLoaded();
    }
    static { this.ɵfac = function CatalogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CatalogComponent)(i0.ɵɵdirectiveInject(i1.ProductService), i0.ɵɵdirectiveInject(i2.CartService), i0.ɵɵdirectiveInject(i3.AuthService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CatalogComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 25, vars: 4, consts: [[1, "page-head"], [1, "container"], [1, "eyebrow"], [1, "section-pad", "pt-4"], [1, "toolbar"], [1, "input-group"], [1, "input-group-text"], [1, "bi", "bi-search"], ["placeholder", "Buscar por nombre o categor\u00EDa", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-select", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], [1, "row", "g-4", "mt-1"], [1, "col-sm-6", "col-xl-3"], [1, "col-12"], [1, "alert", "alert-info", "mt-4"], [1, "product-card", "h-100"], [3, "src", "alt"], [1, "p-3"], [1, "d-flex", "justify-content-between", "align-items-start", "gap-2"], [1, "badge", "text-bg-light"], [1, "stock-pill"], [1, "meta-line"], [1, "d-flex", "align-items-center", "justify-content-between", "mt-3"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click", "disabled"], [1, "bi", "bi-bag-plus"], [1, "empty-state"]], template: function CatalogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3, "Tienda");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Cat\u00E1logo deportivo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Elige tus prendas y agr\u00E9galas al carrito. Para finalizar la compra se solicitar\u00E1 iniciar sesi\u00F3n.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "section", 3)(9, "div", 1)(10, "div", 4)(11, "div", 5)(12, "span", 6);
            i0.ɵɵelement(13, "i", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "input", 8);
            i0.ɵɵtwoWayListener("ngModelChange", function CatalogComponent_Template_input_ngModelChange_14_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.query, $event) || (ctx.query = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "select", 9);
            i0.ɵɵtwoWayListener("ngModelChange", function CatalogComponent_Template_select_ngModelChange_15_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.category, $event) || (ctx.category = $event); return $event; });
            i0.ɵɵelementStart(16, "option", 10);
            i0.ɵɵtext(17, "Todas las categor\u00EDas");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(18, CatalogComponent_For_19_Template, 2, 2, "option", 11, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div", 12);
            i0.ɵɵrepeaterCreate(21, CatalogComponent_For_22_Template, 25, 14, "div", 13, _forTrack0, false, CatalogComponent_ForEmpty_23_Template, 3, 0, "div", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(24, CatalogComponent_Conditional_24_Template, 2, 0, "div", 15);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(14);
            i0.ɵɵtwoWayProperty("ngModel", ctx.query);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.category);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.categories());
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.filtered());
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.auth.isLoggedIn() ? 24 : -1);
        } }, dependencies: [FormsModule, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i4.DefaultValueAccessor, i4.SelectControlValueAccessor, i4.NgControlStatus, i4.NgModel, ImageUrlPipe], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CatalogComponent, [{
        type: Component,
        args: [{
                standalone: true,
                imports: [FormsModule, ImageUrlPipe],
                template: `
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">Tienda</span>
        <h1>Catálogo deportivo</h1>
        <p>Elige tus prendas y agrégalas al carrito. Para finalizar la compra se solicitará iniciar sesión.</p>
      </div>
    </section>

    <section class="section-pad pt-4">
      <div class="container">
        <div class="toolbar">
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
            <input class="form-control" [(ngModel)]="query" placeholder="Buscar por nombre o categoría">
          </div>
          <select class="form-select" [(ngModel)]="category">
            <option value="">Todas las categorías</option>
            @for (item of categories(); track item) {
              <option [value]="item">{{ item }}</option>
            }
          </select>
        </div>

        <div class="row g-4 mt-1">
          @for (product of filtered(); track product.id) {
            <div class="col-sm-6 col-xl-3">
              <article class="product-card h-100">
                <img [src]="product.imageUrl | imageUrl" [alt]="product.name">
                <div class="p-3">
                  <div class="d-flex justify-content-between align-items-start gap-2">
                    <span class="badge text-bg-light">{{ product.category }}</span>
                    <span class="stock-pill" [class.low]="product.stock <= 5">{{ product.stock }} uds</span>
                  </div>
                  <h3>{{ product.name }}</h3>
                  <p>{{ product.description }}</p>
                  <div class="meta-line">
                    <span>{{ product.size || 'Talla única' }}</span>
                    <span>{{ product.color || 'Color mixto' }}</span>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mt-3">
                    <strong>S/ {{ product.salePrice }}</strong>
                    <button class="btn btn-primary btn-sm" type="button" [disabled]="product.stock === 0" (click)="cart.add(product)">
                      <i class="bi bi-bag-plus"></i> Agregar
                    </button>
                  </div>
                </div>
              </article>
            </div>
          } @empty {
            <div class="col-12">
              <div class="empty-state">No encontramos productos con ese filtro.</div>
            </div>
          }
        </div>

        @if (!auth.isLoggedIn()) {
          <div class="alert alert-info mt-4">
            Para finalizar una compra necesitarás iniciar sesión o registrarte.
          </div>
        }
      </div>
    </section>
  `
            }]
    }], () => [{ type: i1.ProductService }, { type: i2.CartService }, { type: i3.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CatalogComponent, { className: "CatalogComponent" }); })();
//# sourceMappingURL=catalog.component.js.map