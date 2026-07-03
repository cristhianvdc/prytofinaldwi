import { Injectable } from '@angular/core';
import { API_URL } from './api.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ContactService {
    constructor(http) {
        this.http = http;
    }
    send(payload) {
        return this.http.post(`${API_URL}/contact`, payload);
    }
    stats() {
        return this.http.get(`${API_URL}/admin/stats`);
    }
    messages() {
        return this.http.get(`${API_URL}/admin/messages`);
    }
    static { this.ɵfac = function ContactService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ContactService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ContactService, factory: ContactService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContactService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=contact.service.js.map