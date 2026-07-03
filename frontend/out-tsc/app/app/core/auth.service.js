import { Injectable, computed, signal } from '@angular/core';
import { tap } from 'rxjs';
import { API_URL } from './api.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/router";
export class AuthService {
    constructor(http, router) {
        this.http = http;
        this.router = router;
        this.storageKey = 'athletix_session';
        this.session = signal(this.loadSession());
        this.currentUser = computed(() => this.session());
        this.isLoggedIn = computed(() => !!this.session()?.token);
    }
    login(payload) {
        return this.http.post(`${API_URL}/auth/login`, payload).pipe(tap((session) => this.save(session)));
    }
    register(payload) {
        return this.http.post(`${API_URL}/auth/register`, payload).pipe(tap((session) => this.save(session)));
    }
    hasRole(role) {
        return this.session()?.role === role;
    }
    token() {
        return this.session()?.token ?? null;
    }
    logout() {
        localStorage.removeItem(this.storageKey);
        this.session.set(null);
        this.router.navigateByUrl('/login');
    }
    save(session) {
        localStorage.setItem(this.storageKey, JSON.stringify(session));
        this.session.set(session);
    }
    loadSession() {
        const raw = localStorage.getItem(this.storageKey);
        if (!raw) {
            return null;
        }
        try {
            return JSON.parse(raw);
        }
        catch {
            localStorage.removeItem(this.storageKey);
            return null;
        }
    }
    static { this.ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.Router)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }, { type: i2.Router }], null); })();
//# sourceMappingURL=auth.service.js.map