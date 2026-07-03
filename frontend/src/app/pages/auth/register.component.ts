import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="auth-shell">
      <div class="auth-panel wide">
        <span class="eyebrow">Cuenta cliente</span>
        <h1>Regístrate</h1>
        <p class="text-secondary">Tu cuenta permite comprar y guardar datos de entrega.</p>
        @if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        }
        <form [formGroup]="form" (ngSubmit)="submit()" class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Nombre completo</label>
            <input class="form-control" formControlName="fullName">
          </div>
          <div class="col-md-6">
            <label class="form-label">Correo</label>
            <input class="form-control" type="email" formControlName="email">
          </div>
          <div class="col-md-6">
            <label class="form-label">Contraseña</label>
            <input class="form-control" type="password" formControlName="password">
          </div>
          <div class="col-md-6">
            <label class="form-label">Teléfono</label>
            <input class="form-control" formControlName="phone">
          </div>
          <div class="col-md-6">
            <label class="form-label">Ciudad</label>
            <input class="form-control" formControlName="city">
          </div>
          <div class="col-md-6">
            <label class="form-label">Distrito</label>
            <input class="form-control" formControlName="district">
          </div>
          <div class="col-12">
            <label class="form-label">Dirección</label>
            <input class="form-control" formControlName="address">
          </div>
          <div class="col-12 d-grid">
            <button class="btn btn-primary" type="submit" [disabled]="form.invalid || loading">
              <i class="bi bi-person-plus"></i> Crear cuenta
            </button>
          </div>
          <a routerLink="/login" class="auth-link text-center">Ya tengo cuenta</a>
        </form>
      </div>
    </section>
  `
})
export class RegisterComponent {
  loading = false;
  error = '';
  form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    phone: [''],
    address: [''],
    city: [''],
    district: ['']
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.error = '';
    this.auth.register(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/catalogo'),
      error: (err) => {
        this.error = err.error?.message ?? 'No se pudo crear la cuenta';
        this.loading = false;
      }
    });
  }
}
