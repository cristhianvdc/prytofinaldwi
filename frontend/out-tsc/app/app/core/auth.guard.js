import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
export const authGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (auth.isLoggedIn()) {
        return true;
    }
    router.navigateByUrl('/login');
    return false;
};
export const adminGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (auth.hasRole('ADMIN')) {
        return true;
    }
    router.navigateByUrl('/access-denied');
    return false;
};
//# sourceMappingURL=auth.guard.js.map