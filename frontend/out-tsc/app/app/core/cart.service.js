import { Injectable, computed, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class CartService {
    constructor() {
        this.storageKey = 'athletix_cart';
        this.state = signal(this.load());
        this.items = computed(() => this.state());
        this.count = computed(() => this.state().reduce((sum, item) => sum + item.quantity, 0));
        this.total = computed(() => this.state().reduce((sum, item) => sum + item.product.salePrice * item.quantity, 0));
    }
    add(product, quantity = 1) {
        const items = [...this.state()];
        const existing = items.find((item) => item.product.id === product.id);
        if (existing) {
            existing.quantity = Math.min(existing.quantity + quantity, product.stock);
        }
        else {
            items.push({ product, quantity });
        }
        this.persist(items);
    }
    update(productId, quantity) {
        const items = this.state()
            .map((item) => item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item)
            .filter((item) => item.quantity > 0);
        this.persist(items);
    }
    remove(productId) {
        this.persist(this.state().filter((item) => item.product.id !== productId));
    }
    clear() {
        this.persist([]);
    }
    persist(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
        this.state.set(items);
    }
    load() {
        const raw = localStorage.getItem(this.storageKey);
        if (!raw) {
            return [];
        }
        try {
            return JSON.parse(raw);
        }
        catch {
            localStorage.removeItem(this.storageKey);
            return [];
        }
    }
    static { this.ɵfac = function CartService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CartService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CartService, factory: CartService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CartService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=cart.service.js.map