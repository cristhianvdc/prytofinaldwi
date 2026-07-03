import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/cart.service";
import * as i3 from "../../core/order.service";
import * as i4 from "@angular/router";
const _forTrack0 = ($index, $item) => $item.product.id;
function CheckoutComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "i", 7);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Pedido registrado");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "a", 8);
    i0.ɵɵtext(7, "Ver mis pedidos");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("Tu orden #", ctx_r0.success, " fue creada correctamente.");
} }
function CheckoutComponent_Conditional_11_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function CheckoutComponent_Conditional_11_For_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r3.quantity, " x ", item_r3.product.name, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("S/ ", item_r3.product.salePrice * item_r3.quantity, "");
} }
function CheckoutComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "div", 9)(2, "form", 10);
    i0.ɵɵlistener("ngSubmit", function CheckoutComponent_Conditional_11_Template_form_ngSubmit_2_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submit()); });
    i0.ɵɵelementStart(3, "h2");
    i0.ɵɵtext(4, "Datos de entrega");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, CheckoutComponent_Conditional_11_Conditional_5_Template, 2, 1, "div", 11);
    i0.ɵɵelementStart(6, "label", 12);
    i0.ɵɵtext(7, "Direcci\u00F3n completa");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "textarea", 13);
    i0.ɵɵelementStart(9, "button", 14);
    i0.ɵɵelement(10, "i", 15);
    i0.ɵɵtext(11, " Crear pedido ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 16)(13, "aside", 17)(14, "h2");
    i0.ɵɵtext(15, "Resumen");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(16, CheckoutComponent_Conditional_11_For_17_Template, 5, 3, "div", 18, _forTrack0);
    i0.ɵɵelementStart(18, "div", 19)(19, "span");
    i0.ɵɵtext(20, "Total");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "strong");
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r0.error ? 5 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r0.form.invalid || ctx_r0.loading);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r0.cart.items());
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("S/ ", ctx_r0.cart.total(), "");
} }
function CheckoutComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6)(1, "h2");
    i0.ɵɵtext(2, "No hay productos para comprar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "a", 20);
    i0.ɵɵtext(4, "Ir al cat\u00E1logo");
    i0.ɵɵelementEnd()();
} }
export class CheckoutComponent {
    constructor(fb, cart, orders, router) {
        this.fb = fb;
        this.cart = cart;
        this.orders = orders;
        this.router = router;
        this.loading = false;
        this.error = '';
        this.success = 0;
        this.form = this.fb.nonNullable.group({
            shippingAddress: ['', [Validators.required, Validators.minLength(8)]]
        });
    }
    submit() {
        if (this.form.invalid || !this.cart.items().length) {
            return;
        }
        this.loading = true;
        this.error = '';
        this.orders.checkout(this.cart.items(), this.form.getRawValue().shippingAddress).subscribe({
            next: (order) => {
                this.success = order.id;
                this.cart.clear();
            },
            error: (err) => {
                this.error = err.error?.message ?? 'No se pudo crear el pedido';
                this.loading = false;
            }
        });
    }
    static { this.ɵfac = function CheckoutComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CheckoutComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.CartService), i0.ɵɵdirectiveInject(i3.OrderService), i0.ɵɵdirectiveInject(i4.Router)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CheckoutComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 13, vars: 1, consts: [[1, "page-head"], [1, "container"], [1, "eyebrow"], [1, "section-pad", "pt-4"], [1, "success-panel"], [1, "row", "g-4"], [1, "empty-state"], [1, "bi", "bi-check-circle"], ["routerLink", "/perfil", 1, "btn", "btn-primary"], [1, "col-lg-7"], [1, "form-panel", 3, "ngSubmit", "formGroup"], [1, "alert", "alert-danger"], [1, "form-label"], ["rows", "5", "formControlName", "shippingAddress", "placeholder", "Av., n\u00FAmero, distrito, referencia", 1, "form-control"], ["type", "submit", 1, "btn", "btn-primary", "mt-3", 3, "disabled"], [1, "bi", "bi-shield-check"], [1, "col-lg-5"], [1, "summary-panel"], [1, "summary-line"], [1, "summary-line", "total"], ["routerLink", "/catalogo", 1, "btn", "btn-primary", "mt-2"]], template: function CheckoutComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3, "Checkout");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Confirma tu compra");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "La orden se guardar\u00E1 en la base de datos y descontar\u00E1 stock autom\u00E1ticamente.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "section", 3)(9, "div", 1);
            i0.ɵɵtemplate(10, CheckoutComponent_Conditional_10_Template, 8, 1, "div", 4)(11, CheckoutComponent_Conditional_11_Template, 23, 4, "div", 5)(12, CheckoutComponent_Conditional_12_Template, 5, 0, "div", 6);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵconditional(ctx.success ? 10 : ctx.cart.items().length ? 11 : 12);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CheckoutComponent, [{
        type: Component,
        args: [{
                standalone: true,
                imports: [ReactiveFormsModule, RouterLink],
                template: `
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">Checkout</span>
        <h1>Confirma tu compra</h1>
        <p>La orden se guardará en la base de datos y descontará stock automáticamente.</p>
      </div>
    </section>

    <section class="section-pad pt-4">
      <div class="container">
        @if (success) {
          <div class="success-panel">
            <i class="bi bi-check-circle"></i>
            <h2>Pedido registrado</h2>
            <p>Tu orden #{{ success }} fue creada correctamente.</p>
            <a routerLink="/perfil" class="btn btn-primary">Ver mis pedidos</a>
          </div>
        } @else if (cart.items().length) {
          <div class="row g-4">
            <div class="col-lg-7">
              <form class="form-panel" [formGroup]="form" (ngSubmit)="submit()">
                <h2>Datos de entrega</h2>
                @if (error) {
                  <div class="alert alert-danger">{{ error }}</div>
                }
                <label class="form-label">Dirección completa</label>
                <textarea class="form-control" rows="5" formControlName="shippingAddress"
                  placeholder="Av., número, distrito, referencia"></textarea>
                <button class="btn btn-primary mt-3" type="submit" [disabled]="form.invalid || loading">
                  <i class="bi bi-shield-check"></i> Crear pedido
                </button>
              </form>
            </div>
            <div class="col-lg-5">
              <aside class="summary-panel">
                <h2>Resumen</h2>
                @for (item of cart.items(); track item.product.id) {
                  <div class="summary-line">
                    <span>{{ item.quantity }} x {{ item.product.name }}</span>
                    <strong>S/ {{ item.product.salePrice * item.quantity }}</strong>
                  </div>
                }
                <div class="summary-line total"><span>Total</span><strong>S/ {{ cart.total() }}</strong></div>
              </aside>
            </div>
          </div>
        } @else {
          <div class="empty-state">
            <h2>No hay productos para comprar</h2>
            <a routerLink="/catalogo" class="btn btn-primary mt-2">Ir al catálogo</a>
          </div>
        }
      </div>
    </section>
  `
            }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.CartService }, { type: i3.OrderService }, { type: i4.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CheckoutComponent, { className: "CheckoutComponent" }); })();
//# sourceMappingURL=checkout.component.js.map