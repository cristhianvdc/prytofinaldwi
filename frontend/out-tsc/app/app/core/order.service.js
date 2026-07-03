import { Injectable } from '@angular/core';
import { API_URL } from './api.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class OrderService {
    constructor(http) {
        this.http = http;
    }
    checkout(items, shippingAddress) {
        return this.http.post(`${API_URL}/orders`, {
            shippingAddress,
            items: items.map((item) => ({ productId: item.product.id, quantity: item.quantity }))
        });
    }
    mine() {
        return this.http.get(`${API_URL}/orders/mine`);
    }
    all() {
        return this.http.get(`${API_URL}/admin/orders`);
    }
    static { this.ɵfac = function OrderService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OrderService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OrderService, factory: OrderService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OrderService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=order.service.js.map