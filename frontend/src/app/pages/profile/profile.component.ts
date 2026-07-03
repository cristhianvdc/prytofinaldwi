import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Order, UserProfile } from '../../core/models';
import { OrderService } from '../../core/order.service';
import { UserService } from '../../core/user.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  template: `
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">Cliente</span>
        <h1>Mi cuenta</h1>
        <p>Consulta tu correo, cambia tu contraseña y revisa tus compras.</p>
      </div>
    </section>

    <section class="section-pad pt-4">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-5">
            <form class="form-panel mb-4" [formGroup]="profileForm" (ngSubmit)="saveProfile()">
              <h2>Datos personales</h2>
              @if (profileSaved) {
                <div class="alert alert-success">Datos actualizados.</div>
              }
              <div class="mb-3">
                <label class="form-label">Correo electrónico</label>
                <input class="form-control" [value]="profile?.email || ''" readonly>
              </div>
              <div class="mb-3">
                <label class="form-label">Nombre completo</label>
                <input class="form-control" formControlName="fullName">
              </div>
              <div class="mb-3">
                <label class="form-label">Teléfono</label>
                <input class="form-control" formControlName="phone">
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Ciudad</label>
                  <input class="form-control" formControlName="city">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Distrito</label>
                  <input class="form-control" formControlName="district">
                </div>
              </div>
              <div class="mt-3">
                <label class="form-label">Dirección</label>
                <textarea class="form-control" rows="3" formControlName="address"></textarea>
              </div>
              <button class="btn btn-primary mt-3" type="submit" [disabled]="profileForm.invalid || savingProfile">
                <i class="bi bi-save"></i> Guardar datos
              </button>
            </form>

            <form class="form-panel" [formGroup]="passwordForm" (ngSubmit)="changePassword()">
              <h2>Cambiar contraseña</h2>
              @if (passwordSaved) {
                <div class="alert alert-success">Contraseña actualizada.</div>
              }
              @if (passwordError) {
                <div class="alert alert-danger">{{ passwordError }}</div>
              }
              <div class="mb-3">
                <label class="form-label">Contraseña actual</label>
                <input class="form-control" type="password" formControlName="currentPassword">
              </div>
              <div class="mb-3">
                <label class="form-label">Nueva contraseña</label>
                <input class="form-control" type="password" formControlName="newPassword">
              </div>
              <div class="mb-3">
                <label class="form-label">Confirmar nueva contraseña</label>
                <input class="form-control" type="password" formControlName="confirmPassword">
              </div>
              <button class="btn btn-primary mt-2" type="submit" [disabled]="passwordForm.invalid || changingPassword">
                <i class="bi bi-shield-lock"></i> Actualizar contraseña
              </button>
            </form>
          </div>
          <div class="col-lg-7">
            <div class="list-panel">
              <h2 class="panel-title">Mis pedidos</h2>
              @for (order of orders; track order.id) {
                <article class="order-card">
                  <div class="d-flex justify-content-between gap-3">
                    <div>
                      <strong>Orden #{{ order.id }}</strong>
                      <p>{{ order.createdAt | date:'short' }} · {{ statusLabel(order.status) }}</p>
                    </div>
                    <strong>S/ {{ order.total }}</strong>
                  </div>
                  <small>{{ order.shippingAddress }}</small>
                </article>
              } @empty {
                <div class="empty-state small">Aún no tienes pedidos.</div>
              }
            </div>
            <div class="form-panel mt-4">
              <h2>Sesión</h2>
              <button class="btn btn-outline-danger w-100" type="button" (click)="auth.logout()">
                <i class="bi bi-box-arrow-right"></i> Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ProfileComponent implements OnInit {
  profile?: UserProfile;
  orders: Order[] = [];
  savingProfile = false;
  profileSaved = false;
  changingPassword = false;
  passwordSaved = false;
  passwordError = '';
  passwordForm = this.fb.nonNullable.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  });
  profileForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required]],
    phone: [''],
    address: [''],
    city: [''],
    district: ['']
  });

  constructor(private fb: FormBuilder, private userService: UserService, private orderService: OrderService, public auth: AuthService) {}

  ngOnInit(): void {
    this.userService.profile().subscribe((profile) => {
      this.profile = profile;
      this.profileForm.patchValue({
        fullName: profile.fullName,
        phone: profile.phone ?? '',
        address: profile.address ?? '',
        city: profile.city ?? '',
        district: profile.district ?? ''
      });
    });
    this.orderService.mine().subscribe((orders) => this.orders = orders);
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }
    this.savingProfile = true;
    this.profileSaved = false;
    this.userService.update(this.profileForm.getRawValue()).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.profileSaved = true;
        this.savingProfile = false;
      },
      error: () => {
        this.savingProfile = false;
      }
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) {
      return;
    }
    const value = this.passwordForm.getRawValue();
    if (value.newPassword !== value.confirmPassword) {
      this.passwordError = 'La confirmación no coincide con la nueva contraseña';
      return;
    }

    this.changingPassword = true;
    this.passwordSaved = false;
    this.passwordError = '';
    this.userService.changePassword({
      currentPassword: value.currentPassword,
      newPassword: value.newPassword
    }).subscribe({
      next: () => {
        this.passwordSaved = true;
        this.changingPassword = false;
        this.passwordForm.reset();
      },
      error: (err) => {
        this.passwordError = err.error?.message ?? 'No se pudo actualizar la contraseña';
        this.changingPassword = false;
      }
    });
  }

  statusLabel(status: string): string {
    const labels: Record<string, string> = {
      IN_REVIEW: 'En revisión',
      CONFIRMED: 'Confirmado',
      CREATED: 'En revisión',
      PAID: 'Pagado',
      SHIPPED: 'Enviado',
      DELIVERED: 'Entregado',
      CANCELLED: 'Cancelado'
    };
    return labels[status] ?? status;
  }
}
