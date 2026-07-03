import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageUrlPipe } from '../../core/image-url.pipe';
import * as i0 from "@angular/core";
import * as i1 from "../../core/cart.service";
const _forTrack0 = ($index, $item) => $item.product.id;
function CartComponent_Conditional_10_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵelement(1, "img", 16);
    i0.ɵɵpipe(2, "imageUrl");
    i0.ɵɵelementStart(3, "div")(4, "h2");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "input", 17);
    i0.ɵɵlistener("change", function CartComponent_Conditional_10_For_4_Template_input_change_8_listener($event) { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.cart.update(item_r2.product.id, ctx_r2.quantity($event))); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 18);
    i0.ɵɵlistener("click", function CartComponent_Conditional_10_For_4_Template_button_click_11_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.cart.remove(item_r2.product.id)); });
    i0.ɵɵelement(12, "i", 19);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", i0.ɵɵpipeBind1(2, 8, item_r2.product.imageUrl), i0.ɵɵsanitizeUrl)("alt", item_r2.product.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r2.product.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r2.product.category, " \u00B7 Stock ", item_r2.product.stock, "");
    i0.ɵɵadvance();
    i0.ɵɵproperty("max", item_r2.product.stock)("value", item_r2.quantity);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("S/ ", item_r2.product.salePrice * item_r2.quantity, "");
} }
function CartComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "div", 6)(2, "div", 7);
    i0.ɵɵrepeaterCreate(3, CartComponent_Conditional_10_For_4_Template, 13, 10, "div", 8, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 9)(6, "aside", 10)(7, "h2");
    i0.ɵɵtext(8, "Resumen");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 11)(10, "span");
    i0.ɵɵtext(11, "Productos");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 12)(15, "span");
    i0.ɵɵtext(16, "Total");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "a", 13);
    i0.ɵɵelement(20, "i", 14);
    i0.ɵɵtext(21, " Finalizar compra");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "a", 15);
    i0.ɵɵtext(23, "Seguir comprando");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.cart.items());
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r2.cart.count());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("S/ ", ctx_r2.cart.total(), "");
} }
function CartComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5)(1, "h2");
    i0.ɵɵtext(2, "Tu carrito est\u00E1 vac\u00EDo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "a", 20);
    i0.ɵɵtext(4, "Ver cat\u00E1logo");
    i0.ɵɵelementEnd()();
} }
export class CartComponent {
    constructor(cart) {
        this.cart = cart;
    }
    quantity(event) {
        return Number(event.target.value);
    }
    static { this.ɵfac = function CartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CartComponent)(i0.ɵɵdirectiveInject(i1.CartService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CartComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 12, vars: 1, consts: [[1, "page-head"], [1, "container"], [1, "eyebrow"], [1, "section-pad", "pt-4"], [1, "row", "g-4"], [1, "empty-state"], [1, "col-lg-8"], [1, "list-panel"], [1, "cart-row"], [1, "col-lg-4"], [1, "summary-panel"], [1, "summary-line"], [1, "summary-line", "total"], ["routerLink", "/checkout", 1, "btn", "btn-primary", "w-100"], [1, "bi", "bi-credit-card"], ["routerLink", "/catalogo", 1, "btn", "btn-outline-secondary", "w-100", "mt-2"], [3, "src", "alt"], ["type", "number", "min", "1", 1, "form-control", "qty-input", 3, "change", "max", "value"], ["type", "button", "title", "Quitar", 1, "btn", "btn-outline-danger", "btn-sm", 3, "click"], [1, "bi", "bi-trash"], ["routerLink", "/catalogo", 1, "btn", "btn-primary", "mt-2"]], template: function CartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3, "Compra");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Carrito");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Revisa cantidades antes de confirmar tu pedido.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "section", 3)(9, "div", 1);
            i0.ɵɵtemplate(10, CartComponent_Conditional_10_Template, 24, 2, "div", 4)(11, CartComponent_Conditional_11_Template, 5, 0, "div", 5);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵconditional(ctx.cart.items().length ? 10 : 11);
        } }, dependencies: [RouterLink, ImageUrlPipe], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CartComponent, [{
        type: Component,
        args: [{
                standalone: true,
                imports: [RouterLink, ImageUrlPipe],
                template: `
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">Compra</span>
        <h1>Carrito</h1>
        <p>Revisa cantidades antes de confirmar tu pedido.</p>
      </div>
    </section>

    <section class="section-pad pt-4">
      <div class="container">
        @if (cart.items().length) {
          <div class="row g-4">
            <div class="col-lg-8">
              <div class="list-panel">
                @for (item of cart.items(); track item.product.id) {
                  <div class="cart-row">
                    <img [src]="item.product.imageUrl | imageUrl" [alt]="item.product.name">
                    <div>
                      <h2>{{ item.product.name }}</h2>
                      <p>{{ item.product.category }} · Stock {{ item.product.stock }}</p>
                    </div>
                    <input class="form-control qty-input" type="number" min="1" [max]="item.product.stock"
                      [value]="item.quantity" (change)="cart.update(item.product.id, quantity($event))">
                    <strong>S/ {{ item.product.salePrice * item.quantity }}</strong>
                    <button class="btn btn-outline-danger btn-sm" type="button" (click)="cart.remove(item.product.id)" title="Quitar">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                }
              </div>
            </div>
            <div class="col-lg-4">
              <aside class="summary-panel">
                <h2>Resumen</h2>
                <div class="summary-line"><span>Productos</span><strong>{{ cart.count() }}</strong></div>
                <div class="summary-line total"><span>Total</span><strong>S/ {{ cart.total() }}</strong></div>
                <a routerLink="/checkout" class="btn btn-primary w-100"><i class="bi bi-credit-card"></i> Finalizar compra</a>
                <a routerLink="/catalogo" class="btn btn-outline-secondary w-100 mt-2">Seguir comprando</a>
              </aside>
            </div>
          </div>
        } @else {
          <div class="empty-state">
            <h2>Tu carrito está vacío</h2>
            <a routerLink="/catalogo" class="btn btn-primary mt-2">Ver catálogo</a>
          </div>
        }
      </div>
    </section>
  `
            }]
    }], () => [{ type: i1.CartService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CartComponent, { className: "CartComponent" }); })();
//# sourceMappingURL=cart.component.js.map