import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login.component';
import { RegisterComponent } from './pages/auth/register.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'catalogo', component: CatalogComponent },
  { path: 'producto/:slug', component: ProductDetailComponent },
  { path: 'carrito', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'perfil', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'contactanos', component: ContactComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/productos', component: AdminProductsComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/pedidos', component: AdminOrdersComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/configuracion', redirectTo: '/admin' },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', redirectTo: '' }
];
