import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "../../core/contact.service";
import * as i2 from "../../core/order.service";
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.id;
function AdminDashboardComponent_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 19);
    i0.ɵɵelement(2, "i");
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const card_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(card_r1.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(card_r1.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(card_r1.value);
} }
function AdminDashboardComponent_For_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 15)(1, "div", 20)(2, "div")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const order_r2 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Orden #", order_r2.id, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(7, 4, order_r2.createdAt, "short"), " \u00B7 ", order_r2.status, "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("S/ ", order_r2.total, "");
} }
function AdminDashboardComponent_ForEmpty_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵtext(1, "A\u00FAn no hay pedidos.");
    i0.ɵɵelementEnd();
} }
function AdminDashboardComponent_For_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 18)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const message_r3 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(message_r3.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", message_r3.fullName, " \u00B7 ", message_r3.email, "");
} }
function AdminDashboardComponent_ForEmpty_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵtext(1, "Sin mensajes.");
    i0.ɵɵelementEnd();
} }
export class AdminDashboardComponent {
    constructor(contact, ordersService) {
        this.contact = contact;
        this.ordersService = ordersService;
        this.orders = [];
        this.messages = [];
    }
    ngOnInit() {
        this.contact.stats().subscribe((stats) => this.stats = stats);
        this.ordersService.all().subscribe((orders) => this.orders = orders);
        this.contact.messages().subscribe((messages) => this.messages = messages);
    }
    cards() {
        const stats = this.stats;
        return [
            { label: 'Productos', value: stats?.products ?? 0, icon: 'bi bi-box' },
            { label: 'Clientes', value: stats?.clients ?? 0, icon: 'bi bi-people' },
            { label: 'Pedidos', value: stats?.orders ?? 0, icon: 'bi bi-receipt' },
            { label: 'Mensajes', value: stats?.messages ?? 0, icon: 'bi bi-chat-left-text' },
            { label: 'Ventas', value: `S/ ${stats?.revenue ?? 0}`, icon: 'bi bi-cash-coin' },
            { label: 'Bajo stock', value: stats?.lowStock ?? 0, icon: 'bi bi-exclamation-triangle' }
        ];
    }
    static { this.ɵfac = function AdminDashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminDashboardComponent)(i0.ɵɵdirectiveInject(i1.ContactService), i0.ɵɵdirectiveInject(i2.OrderService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminDashboardComponent, selectors: [["ng-component"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 35, vars: 2, consts: [[1, "page-head", "admin-head"], [1, "container"], [1, "eyebrow"], [1, "d-flex", "flex-wrap", "gap-2"], ["routerLink", "/admin/productos", 1, "btn", "btn-light"], [1, "bi", "bi-box-seam"], ["routerLink", "/admin/configuracion", 1, "btn", "btn-outline-light"], [1, "bi", "bi-gear"], [1, "section-pad", "pt-4"], [1, "row", "g-3"], [1, "col-sm-6", "col-xl-2"], [1, "row", "g-4", "mt-1"], [1, "col-lg-7"], [1, "list-panel"], [1, "panel-title"], [1, "order-card"], [1, "empty-state", "small"], [1, "col-lg-5"], [1, "message-card"], [1, "metric-card"], [1, "d-flex", "justify-content-between"]], template: function AdminDashboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3, "Administrador");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Panel de control");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Resumen de ventas, stock, pedidos y mensajes de contacto.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 3)(9, "a", 4);
            i0.ɵɵelement(10, "i", 5);
            i0.ɵɵtext(11, " Productos");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "a", 6);
            i0.ɵɵelement(13, "i", 7);
            i0.ɵɵtext(14, " Configuraci\u00F3n");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(15, "section", 8)(16, "div", 1)(17, "div", 9);
            i0.ɵɵrepeaterCreate(18, AdminDashboardComponent_For_19_Template, 7, 4, "div", 10, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 11)(21, "div", 12)(22, "div", 13)(23, "h2", 14);
            i0.ɵɵtext(24, "\u00DAltimos pedidos");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(25, AdminDashboardComponent_For_26_Template, 10, 7, "article", 15, _forTrack1, false, AdminDashboardComponent_ForEmpty_27_Template, 2, 0, "div", 16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "div", 17)(29, "div", 13)(30, "h2", 14);
            i0.ɵɵtext(31, "Mensajes recientes");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(32, AdminDashboardComponent_For_33_Template, 5, 3, "article", 18, _forTrack1, false, AdminDashboardComponent_ForEmpty_34_Template, 2, 0, "div", 16);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(18);
            i0.ɵɵrepeater(ctx.cards());
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.orders.slice(0, 8));
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.messages);
        } }, dependencies: [RouterLink, DatePipe], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminDashboardComponent, [{
        type: Component,
        args: [{
                standalone: true,
                imports: [RouterLink, DatePipe],
                template: `
    <section class="page-head admin-head">
      <div class="container">
        <span class="eyebrow">Administrador</span>
        <h1>Panel de control</h1>
        <p>Resumen de ventas, stock, pedidos y mensajes de contacto.</p>
        <div class="d-flex flex-wrap gap-2">
          <a routerLink="/admin/productos" class="btn btn-light"><i class="bi bi-box-seam"></i> Productos</a>
          <a routerLink="/admin/configuracion" class="btn btn-outline-light"><i class="bi bi-gear"></i> Configuración</a>
        </div>
      </div>
    </section>

    <section class="section-pad pt-4">
      <div class="container">
        <div class="row g-3">
          @for (card of cards(); track card.label) {
            <div class="col-sm-6 col-xl-2">
              <div class="metric-card">
                <i [class]="card.icon"></i>
                <span>{{ card.label }}</span>
                <strong>{{ card.value }}</strong>
              </div>
            </div>
          }
        </div>

        <div class="row g-4 mt-1">
          <div class="col-lg-7">
            <div class="list-panel">
              <h2 class="panel-title">Últimos pedidos</h2>
              @for (order of orders.slice(0, 8); track order.id) {
                <article class="order-card">
                  <div class="d-flex justify-content-between">
                    <div>
                      <strong>Orden #{{ order.id }}</strong>
                      <p>{{ order.createdAt | date:'short' }} · {{ order.status }}</p>
                    </div>
                    <strong>S/ {{ order.total }}</strong>
                  </div>
                </article>
              } @empty {
                <div class="empty-state small">Aún no hay pedidos.</div>
              }
            </div>
          </div>
          <div class="col-lg-5">
            <div class="list-panel">
              <h2 class="panel-title">Mensajes recientes</h2>
              @for (message of messages; track message.id) {
                <article class="message-card">
                  <strong>{{ message.subject }}</strong>
                  <p>{{ message.fullName }} · {{ message.email }}</p>
                </article>
              } @empty {
                <div class="empty-state small">Sin mensajes.</div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `
            }]
    }], () => [{ type: i1.ContactService }, { type: i2.OrderService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent" }); })();
//# sourceMappingURL=admin-dashboard.component.js.map