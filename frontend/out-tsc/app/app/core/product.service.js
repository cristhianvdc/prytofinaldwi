import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { API_URL } from './api.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ProductService {
    constructor(http) {
        this.http = http;
        this.publicProductsSignal = signal([]);
        this.loaded = false;
    }
    publicProducts() {
        return this.http.get(`${API_URL}/products`).pipe(tap((products) => {
            this.publicProductsSignal.set(products);
            this.loaded = true;
        }));
    }
    ensureLoaded() {
        if (!this.loaded) {
            this.publicProducts().subscribe();
        }
    }
    adminProducts() {
        return this.http.get(`${API_URL}/admin/products`);
    }
    save(form, id) {
        if (id) {
            return this.http.put(`${API_URL}/admin/products/${id}`, form);
        }
        return this.http.post(`${API_URL}/admin/products`, form);
    }
    delete(id) {
        return this.http.delete(`${API_URL}/admin/products/${id}`);
    }
    static { this.ɵfac = function ProductService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProductService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ProductService, factory: ProductService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProductService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=product.service.js.map