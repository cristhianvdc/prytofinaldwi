import { authGuard, adminGuard } from './core/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login.component';
import { RegisterComponent } from './pages/auth/register.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { AdminSettingsComponent } from './pages/admin-settings/admin-settings.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
export const routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'catalogo', component: CatalogComponent },
    { path: 'carrito', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
    { path: 'perfil', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'contactanos', component: ContactComponent },
    { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard, adminGuard] },
    { path: 'admin/productos', component: AdminProductsComponent, canActivate: [authGuard, adminGuard] },
    { path: 'admin/configuracion', component: AdminSettingsComponent, canActivate: [authGuard, adminGuard] },
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: '**', redirectTo: '' }
];
//# sourceMappingURL=app.routes.js.map