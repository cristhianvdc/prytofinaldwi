import { Injectable } from '@angular/core';
import { API_URL } from './api.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class UserService {
    constructor(http) {
        this.http = http;
    }
    profile() {
        return this.http.get(`${API_URL}/me`);
    }
    update(profile) {
        return this.http.put(`${API_URL}/me`, profile);
    }
    static { this.ɵfac = function UserService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UserService, factory: UserService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=user.service.js.map