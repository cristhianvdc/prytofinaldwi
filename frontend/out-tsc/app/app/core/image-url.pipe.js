import { Pipe } from '@angular/core';
import { API_ORIGIN } from './api.config';
import * as i0 from "@angular/core";
export class ImageUrlPipe {
    transform(value) {
        if (!value) {
            return '/assets/product-placeholder.svg';
        }
        if (value.startsWith('http') || value.startsWith('/assets')) {
            return value;
        }
        return `${API_ORIGIN}${value}`;
    }
    static { this.ɵfac = function ImageUrlPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ImageUrlPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "imageUrl", type: ImageUrlPipe, pure: true, standalone: true }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ImageUrlPipe, [{
        type: Pipe,
        args: [{ name: 'imageUrl', standalone: true }]
    }], null, null); })();
//# sourceMappingURL=image-url.pipe.js.map