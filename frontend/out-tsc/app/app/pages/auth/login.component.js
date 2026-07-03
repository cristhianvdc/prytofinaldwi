import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/auth.service";
import * as i3 from "@angular/router";
function LoginComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
export class LoginComponent {
    constructor(fb, auth, router) {
        this.fb = fb;
        this.auth = auth;
        this.router = router;
        this.loading = false;
        this.error = '';
        this.form = this.fb.nonNullable.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }
    submit() {
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.error = '';
        this.auth.login(this.form.getRawValue()).subscribe({
            next: (session) => this.router.navigateByUrl(session.role === 'ADMIN' ? '/admin' : '/catalogo'),
            error: (err) => {
                this.error = err.error?.message ?? 'No se pudo iniciar sesión';
                this.loading = false;
            }
        });
    }
    static { this.ɵfac = function LoginComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 23, vars: 3, consts: [[1, "auth-shell"], [1, "auth-panel"], [1, "eyebrow"], [1, "text-secondary"], [1, "alert", "alert-danger"], [1, "vstack", "gap-3", 3, "ngSubmit", "formGroup"], [1, "form-label"], ["type", "email", "formControlName", "email", "placeholder", "admin@athletix.com", 1, "form-control"], ["type", "password", "formControlName", "password", "placeholder", "Admin12345", 1, "form-control"], ["type", "submit", 1, "btn", "btn-primary", "w-100", 3, "disabled"], [1, "bi", "bi-box-arrow-in-right"], ["routerLink", "/registro", 1, "text-center"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3, "Bienvenido");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Inicia sesi\u00F3n");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 3);
            i0.ɵɵtext(7, "Compra, revisa pedidos o entra al panel administrativo de Athletix Sports.");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, LoginComponent_Conditional_8_Template, 2, 1, "div", 4);
            i0.ɵɵelementStart(9, "form", 5);
            i0.ɵɵlistener("ngSubmit", function LoginComponent_Template_form_ngSubmit_9_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(10, "div")(11, "label", 6);
            i0.ɵɵtext(12, "Correo");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(13, "input", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div")(15, "label", 6);
            i0.ɵɵtext(16, "Contrase\u00F1a");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(17, "input", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "button", 9);
            i0.ɵɵelement(19, "i", 10);
            i0.ɵɵtext(20, " Ingresar ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "a", 11);
            i0.ɵɵtext(22, "Crear una cuenta nueva");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵconditional(ctx.error ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.loading);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginComponent, [{
        type: Component,
        args: [{
                standalone: true,
                imports: [ReactiveFormsModule, RouterLink],
                template: `
    <section class="auth-shell">
      <div class="auth-panel">
        <span class="eyebrow">Bienvenido</span>
        <h1>Inicia sesión</h1>
        <p class="text-secondary">Compra, revisa pedidos o entra al panel administrativo de Athletix Sports.</p>
        @if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        }
        <form [formGroup]="form" (ngSubmit)="submit()" class="vstack gap-3">
          <div>
            <label class="form-label">Correo</label>
            <input class="form-control" type="email" formControlName="email" placeholder="admin@athletix.com">
          </div>
          <div>
            <label class="form-label">Contraseña</label>
            <input class="form-control" type="password" formControlName="password" placeholder="Admin12345">
          </div>
          <button class="btn btn-primary w-100" type="submit" [disabled]="form.invalid || loading">
            <i class="bi bi-box-arrow-in-right"></i> Ingresar
          </button>
          <a routerLink="/registro" class="text-center">Crear una cuenta nueva</a>
        </form>
      </div>
    </section>
  `
            }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginComponent, { className: "LoginComponent" }); })();
//# sourceMappingURL=login.component.js.map