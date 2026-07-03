import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/auth.service";
import * as i3 from "@angular/router";
function RegisterComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
export class RegisterComponent {
    constructor(fb, auth, router) {
        this.fb = fb;
        this.auth = auth;
        this.router = router;
        this.loading = false;
        this.error = '';
        this.form = this.fb.nonNullable.group({
            fullName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            phone: [''],
            address: [''],
            city: [''],
            district: ['']
        });
    }
    submit() {
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.error = '';
        this.auth.register(this.form.getRawValue()).subscribe({
            next: () => this.router.navigateByUrl('/catalogo'),
            error: (err) => {
                this.error = err.error?.message ?? 'No se pudo crear la cuenta';
                this.loading = false;
            }
        });
    }
    static { this.ɵfac = function RegisterComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RegisterComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RegisterComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 44, vars: 3, consts: [[1, "auth-shell"], [1, "auth-panel", "wide"], [1, "eyebrow"], [1, "text-secondary"], [1, "alert", "alert-danger"], [1, "row", "g-3", 3, "ngSubmit", "formGroup"], [1, "col-md-6"], [1, "form-label"], ["formControlName", "fullName", 1, "form-control"], ["type", "email", "formControlName", "email", 1, "form-control"], ["type", "password", "formControlName", "password", 1, "form-control"], ["formControlName", "phone", 1, "form-control"], ["formControlName", "city", 1, "form-control"], ["formControlName", "district", 1, "form-control"], [1, "col-12"], ["formControlName", "address", 1, "form-control"], [1, "col-12", "d-grid"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "bi", "bi-person-plus"], ["routerLink", "/login", 1, "text-center"]], template: function RegisterComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3, "Cuenta cliente");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Reg\u00EDstrate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 3);
            i0.ɵɵtext(7, "Tu cuenta permite comprar y guardar datos de entrega.");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, RegisterComponent_Conditional_8_Template, 2, 1, "div", 4);
            i0.ɵɵelementStart(9, "form", 5);
            i0.ɵɵlistener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_9_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(10, "div", 6)(11, "label", 7);
            i0.ɵɵtext(12, "Nombre completo");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(13, "input", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 6)(15, "label", 7);
            i0.ɵɵtext(16, "Correo");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(17, "input", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div", 6)(19, "label", 7);
            i0.ɵɵtext(20, "Contrase\u00F1a");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(21, "input", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 6)(23, "label", 7);
            i0.ɵɵtext(24, "Tel\u00E9fono");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(25, "input", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "div", 6)(27, "label", 7);
            i0.ɵɵtext(28, "Ciudad");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(29, "input", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 6)(31, "label", 7);
            i0.ɵɵtext(32, "Distrito");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(33, "input", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 14)(35, "label", 7);
            i0.ɵɵtext(36, "Direcci\u00F3n");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(37, "input", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "div", 16)(39, "button", 17);
            i0.ɵɵelement(40, "i", 18);
            i0.ɵɵtext(41, " Crear cuenta ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "a", 19);
            i0.ɵɵtext(43, "Ya tengo cuenta");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵconditional(ctx.error ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(30);
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.loading);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RegisterComponent, [{
        type: Component,
        args: [{
                standalone: true,
                imports: [ReactiveFormsModule, RouterLink],
                template: `
    <section class="auth-shell">
      <div class="auth-panel wide">
        <span class="eyebrow">Cuenta cliente</span>
        <h1>Regístrate</h1>
        <p class="text-secondary">Tu cuenta permite comprar y guardar datos de entrega.</p>
        @if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        }
        <form [formGroup]="form" (ngSubmit)="submit()" class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Nombre completo</label>
            <input class="form-control" formControlName="fullName">
          </div>
          <div class="col-md-6">
            <label class="form-label">Correo</label>
            <input class="form-control" type="email" formControlName="email">
          </div>
          <div class="col-md-6">
            <label class="form-label">Contraseña</label>
            <input class="form-control" type="password" formControlName="password">
          </div>
          <div class="col-md-6">
            <label class="form-label">Teléfono</label>
            <input class="form-control" formControlName="phone">
          </div>
          <div class="col-md-6">
            <label class="form-label">Ciudad</label>
            <input class="form-control" formControlName="city">
          </div>
          <div class="col-md-6">
            <label class="form-label">Distrito</label>
            <input class="form-control" formControlName="district">
          </div>
          <div class="col-12">
            <label class="form-label">Dirección</label>
            <input class="form-control" formControlName="address">
          </div>
          <div class="col-12 d-grid">
            <button class="btn btn-primary" type="submit" [disabled]="form.invalid || loading">
              <i class="bi bi-person-plus"></i> Crear cuenta
            </button>
          </div>
          <a routerLink="/login" class="text-center">Ya tengo cuenta</a>
        </form>
      </div>
    </section>
  `
            }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RegisterComponent, { className: "RegisterComponent" }); })();
//# sourceMappingURL=register.component.js.map