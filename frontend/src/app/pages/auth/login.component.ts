import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="auth-shell">
      <div class="auth-panel">
        <span class="eyebrow">Bienvenido</span>
        <h1>Inicia sesión</h1>
        <p class="text-secondary">Compra, revisa pedidos o entra al panel administrativo de Athletix Sports.</p>
        @if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        }
        <form [formGroup]="form" (ngSubmit)="submit()" class="vstack gap-3">
          <div>
            <label class="form-label">Correo</label>
            <input class="form-control" type="email" formControlName="email" placeholder="admin@athletix.com">
          </div>
          <div>
            <label class="form-label">Contraseña</label>
            <input class="form-control" type="password" formControlName="password" placeholder="Admin12345">
          </div>
          <button class="btn btn-primary w-100" type="submit" [disabled]="form.invalid || loading">
            <i class="bi bi-box-arrow-in-right"></i> Ingresar
          </button>
          <a routerLink="/registro" class="auth-link text-center">Crear una cuenta nueva</a>
        </form>
      </div>
    </section>
  `
})
export class LoginComponent {
  loading = false;
  error = '';
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.error = '';
    this.auth.login(this.form.getRawValue()).subscribe({
      next: (session) => this.router.navigateByUrl(session.role === 'ADMIN' ? '/admin' : '/catalogo'),
      error: (err) => {
        this.error = err.error?.message ?? 'No se pudo iniciar sesión';
        this.loading = false;
      }
    });
  }
}
