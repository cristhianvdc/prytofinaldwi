import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/contact.service";
function ContactComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtext(1, "Mensaje enviado. Te responderemos pronto.");
    i0.ɵɵelementEnd();
} }
function ContactComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
export class ContactComponent {
    constructor(fb, contact) {
        this.fb = fb;
        this.contact = contact;
        this.loading = false;
        this.sent = false;
        this.error = '';
        this.form = this.fb.nonNullable.group({
            fullName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            subject: ['', [Validators.required]],
            message: ['', [Validators.required, Validators.maxLength(1800)]]
        });
    }
    submit() {
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.error = '';
        this.contact.send(this.form.getRawValue()).subscribe({
            next: () => {
                this.sent = true;
                this.loading = false;
                this.form.reset();
            },
            error: (err) => {
                this.error = err.error?.message ?? 'No se pudo enviar el mensaje';
                this.loading = false;
            }
        });
    }
    static { this.ɵfac = function ContactComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ContactComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.ContactService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ContactComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 50, vars: 4, consts: [[1, "page-head"], [1, "container"], [1, "eyebrow"], [1, "section-pad", "pt-4"], [1, "row", "g-4"], [1, "col-lg-7"], [1, "form-panel", 3, "ngSubmit", "formGroup"], [1, "alert", "alert-success"], [1, "alert", "alert-danger"], [1, "row", "g-3"], [1, "col-md-6"], [1, "form-label"], ["formControlName", "fullName", 1, "form-control"], ["type", "email", "formControlName", "email", 1, "form-control"], [1, "col-12"], ["formControlName", "subject", 1, "form-control"], ["rows", "6", "formControlName", "message", 1, "form-control"], ["type", "submit", 1, "btn", "btn-primary", "mt-3", 3, "disabled"], [1, "bi", "bi-send"], [1, "col-lg-5"], [1, "info-panel"], [1, "info-item"], [1, "bi", "bi-geo-alt"], [1, "bi", "bi-envelope"], [1, "bi", "bi-phone"]], template: function ContactComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3, "Soporte");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Cont\u00E1ctanos");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Escr\u00EDbenos por tallas, entregas, cambios o pedidos corporativos. Tu mensaje se registra en la base de datos.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "section", 3)(9, "div", 1)(10, "div", 4)(11, "div", 5)(12, "form", 6);
            i0.ɵɵlistener("ngSubmit", function ContactComponent_Template_form_ngSubmit_12_listener() { return ctx.submit(); });
            i0.ɵɵtemplate(13, ContactComponent_Conditional_13_Template, 2, 0, "div", 7)(14, ContactComponent_Conditional_14_Template, 2, 1, "div", 8);
            i0.ɵɵelementStart(15, "div", 9)(16, "div", 10)(17, "label", 11);
            i0.ɵɵtext(18, "Nombre");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(19, "input", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 10)(21, "label", 11);
            i0.ɵɵtext(22, "Correo");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(23, "input", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 14)(25, "label", 11);
            i0.ɵɵtext(26, "Asunto");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(27, "input", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div", 14)(29, "label", 11);
            i0.ɵɵtext(30, "Mensaje");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(31, "textarea", 16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(32, "button", 17);
            i0.ɵɵelement(33, "i", 18);
            i0.ɵɵtext(34, " Enviar ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(35, "div", 19)(36, "aside", 20)(37, "h2");
            i0.ɵɵtext(38, "Athletix Sports");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "p");
            i0.ɵɵtext(40, "Atenci\u00F3n de lunes a s\u00E1bado para compras online y soporte postventa.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "div", 21);
            i0.ɵɵelement(42, "i", 22);
            i0.ɵɵtext(43, " Lima, Per\u00FA");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 21);
            i0.ɵɵelement(45, "i", 23);
            i0.ɵɵtext(46, " contacto@athletix.com");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "div", 21);
            i0.ɵɵelement(48, "i", 24);
            i0.ɵɵtext(49, " +51 900 123 456");
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.sent ? 13 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.error ? 14 : -1);
            i0.ɵɵadvance(18);
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.loading);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContactComponent, [{
        type: Component,
        args: [{
                standalone: true,
                imports: [ReactiveFormsModule],
                template: `
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">Soporte</span>
        <h1>Contáctanos</h1>
        <p>Escríbenos por tallas, entregas, cambios o pedidos corporativos. Tu mensaje se registra en la base de datos.</p>
      </div>
    </section>

    <section class="section-pad pt-4">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-7">
            <form class="form-panel" [formGroup]="form" (ngSubmit)="submit()">
              @if (sent) {
                <div class="alert alert-success">Mensaje enviado. Te responderemos pronto.</div>
              }
              @if (error) {
                <div class="alert alert-danger">{{ error }}</div>
              }
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Nombre</label>
                  <input class="form-control" formControlName="fullName">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Correo</label>
                  <input class="form-control" type="email" formControlName="email">
                </div>
                <div class="col-12">
                  <label class="form-label">Asunto</label>
                  <input class="form-control" formControlName="subject">
                </div>
                <div class="col-12">
                  <label class="form-label">Mensaje</label>
                  <textarea class="form-control" rows="6" formControlName="message"></textarea>
                </div>
              </div>
              <button class="btn btn-primary mt-3" type="submit" [disabled]="form.invalid || loading">
                <i class="bi bi-send"></i> Enviar
              </button>
            </form>
          </div>
          <div class="col-lg-5">
            <aside class="info-panel">
              <h2>Athletix Sports</h2>
              <p>Atención de lunes a sábado para compras online y soporte postventa.</p>
              <div class="info-item"><i class="bi bi-geo-alt"></i> Lima, Perú</div>
              <div class="info-item"><i class="bi bi-envelope"></i> contacto&#64;athletix.com</div>
              <div class="info-item"><i class="bi bi-phone"></i> +51 900 123 456</div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  `
            }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.ContactService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ContactComponent, { className: "ContactComponent" }); })();
//# sourceMappingURL=contact.component.js.map