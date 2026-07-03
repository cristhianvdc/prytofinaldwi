import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/user.service";
import * as i3 from "../../core/order.service";
const _forTrack0 = ($index, $item) => $item.id;
function ProfileComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtext(1, "Datos actualizados.");
    i0.ɵɵelementEnd();
} }
function ProfileComponent_For_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 23)(1, "div", 25)(2, "div")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "small");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const order_r1 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Orden #", order_r1.id, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(7, 5, order_r1.createdAt, "short"), " \u00B7 ", order_r1.status, "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("S/ ", order_r1.total, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(order_r1.shippingAddress);
} }
function ProfileComponent_ForEmpty_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵtext(1, "A\u00FAn no tienes pedidos.");
    i0.ɵɵelementEnd();
} }
export class ProfileComponent {
    constructor(fb, userService, orderService) {
        this.fb = fb;
        this.userService = userService;
        this.orderService = orderService;
        this.orders = [];
        this.saved = false;
        this.form = this.fb.nonNullable.group({
            fullName: ['', [Validators.required]],
            phone: [''],
            address: [''],
            city: [''],
            district: ['']
        });
    }
    ngOnInit() {
        this.userService.profile().subscribe((profile) => {
            this.profile = profile;
            this.form.patchValue(profile);
        });
        this.orderService.mine().subscribe((orders) => this.orders = orders);
    }
    save() {
        if (this.form.invalid) {
            return;
        }
        this.userService.update(this.form.getRawValue()).subscribe((profile) => {
            this.profile = profile;
            this.saved = true;
        });
    }
    static { this.ɵfac = function ProfileComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProfileComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.UserService), i0.ɵɵdirectiveInject(i3.OrderService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProfileComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 47, vars: 4, consts: [[1, "page-head"], [1, "container"], [1, "eyebrow"], [1, "section-pad", "pt-4"], [1, "row", "g-4"], [1, "col-lg-5"], [1, "form-panel", 3, "ngSubmit", "formGroup"], [1, "alert", "alert-success"], [1, "mb-3"], [1, "form-label"], ["formControlName", "fullName", 1, "form-control"], ["formControlName", "phone", 1, "form-control"], [1, "row", "g-3"], [1, "col-md-6"], ["formControlName", "city", 1, "form-control"], ["formControlName", "district", 1, "form-control"], [1, "mt-3"], ["rows", "3", "formControlName", "address", 1, "form-control"], ["type", "submit", 1, "btn", "btn-primary", "mt-3", 3, "disabled"], [1, "bi", "bi-save"], [1, "col-lg-7"], [1, "list-panel"], [1, "panel-title"], [1, "order-card"], [1, "empty-state", "small"], [1, "d-flex", "justify-content-between", "gap-3"]], template: function ProfileComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3, "Cliente");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Mi cuenta");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Actualiza tus datos y consulta tus compras registradas.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "section", 3)(9, "div", 1)(10, "div", 4)(11, "div", 5)(12, "form", 6);
            i0.ɵɵlistener("ngSubmit", function ProfileComponent_Template_form_ngSubmit_12_listener() { return ctx.save(); });
            i0.ɵɵelementStart(13, "h2");
            i0.ɵɵtext(14, "Datos personales");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(15, ProfileComponent_Conditional_15_Template, 2, 0, "div", 7);
            i0.ɵɵelementStart(16, "div", 8)(17, "label", 9);
            i0.ɵɵtext(18, "Nombre");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(19, "input", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 8)(21, "label", 9);
            i0.ɵɵtext(22, "Tel\u00E9fono");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(23, "input", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 12)(25, "div", 13)(26, "label", 9);
            i0.ɵɵtext(27, "Ciudad");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(28, "input", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 13)(30, "label", 9);
            i0.ɵɵtext(31, "Distrito");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(32, "input", 15);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "div", 16)(34, "label", 9);
            i0.ɵɵtext(35, "Direcci\u00F3n");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(36, "textarea", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "button", 18);
            i0.ɵɵelement(38, "i", 19);
            i0.ɵɵtext(39, " Guardar cambios ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(40, "div", 20)(41, "div", 21)(42, "h2", 22);
            i0.ɵɵtext(43, "Mis pedidos");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(44, ProfileComponent_For_45_Template, 12, 8, "article", 23, _forTrack0, false, ProfileComponent_ForEmpty_46_Template, 2, 0, "div", 24);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.saved ? 15 : -1);
            i0.ɵɵadvance(22);
            i0.ɵɵproperty("disabled", ctx.form.invalid);
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.orders);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, DatePipe], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProfileComponent, [{
        type: Component,
        args: [{
                standalone: true,
                imports: [ReactiveFormsModule, DatePipe],
                template: `
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">Cliente</span>
        <h1>Mi cuenta</h1>
        <p>Actualiza tus datos y consulta tus compras registradas.</p>
      </div>
    </section>

    <section class="section-pad pt-4">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-5">
            <form class="form-panel" [formGroup]="form" (ngSubmit)="save()">
              <h2>Datos personales</h2>
              @if (saved) {
                <div class="alert alert-success">Datos actualizados.</div>
              }
              <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input class="form-control" formControlName="fullName">
              </div>
              <div class="mb-3">
                <label class="form-label">Teléfono</label>
                <input class="form-control" formControlName="phone">
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Ciudad</label>
                  <input class="form-control" formControlName="city">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Distrito</label>
                  <input class="form-control" formControlName="district">
                </div>
              </div>
              <div class="mt-3">
                <label class="form-label">Dirección</label>
                <textarea class="form-control" rows="3" formControlName="address"></textarea>
              </div>
              <button class="btn btn-primary mt-3" type="submit" [disabled]="form.invalid">
                <i class="bi bi-save"></i> Guardar cambios
              </button>
            </form>
          </div>
          <div class="col-lg-7">
            <div class="list-panel">
              <h2 class="panel-title">Mis pedidos</h2>
              @for (order of orders; track order.id) {
                <article class="order-card">
                  <div class="d-flex justify-content-between gap-3">
                    <div>
                      <strong>Orden #{{ order.id }}</strong>
                      <p>{{ order.createdAt | date:'short' }} · {{ order.status }}</p>
                    </div>
                    <strong>S/ {{ order.total }}</strong>
                  </div>
                  <small>{{ order.shippingAddress }}</small>
                </article>
              } @empty {
                <div class="empty-state small">Aún no tienes pedidos.</div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `
            }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.UserService }, { type: i3.OrderService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProfileComponent, { className: "ProfileComponent" }); })();
//# sourceMappingURL=profile.component.js.map