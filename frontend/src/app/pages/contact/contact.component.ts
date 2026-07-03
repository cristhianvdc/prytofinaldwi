import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/contact.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="contact-hero">
      <div class="container text-center">
        <h1 class="display-5 fw-bold">CONTÁCTANOS</h1>
        <p class="lead">¿Tienes preguntas? Escríbenos y te responderemos lo antes posible.</p>
      </div>
    </section>

    <div class="container mb-5">
      <div class="contact-form-container">
        <h2 class="form-title">FORMULARIO DE CONTACTO</h2>
        @if (sent) {
          <div class="alert alert-success">Mensaje enviado. Te responderemos pronto.</div>
        }
        @if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        }
        <form [formGroup]="form" (ngSubmit)="submit()">
          <div class="row mb-4">
            <div class="col-md-6 mb-3 mb-md-0">
              <label class="form-label">Nombre completo*</label>
              <input type="text" class="form-control" formControlName="fullName">
            </div>
            <div class="col-md-6">
              <label class="form-label">Correo electrónico*</label>
              <input type="email" class="form-control" formControlName="email">
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label">Teléfono (opcional)</label>
            <input type="tel" class="form-control" formControlName="phone">
          </div>

          <div class="mb-4">
            <label class="form-label">Asunto*</label>
            <select class="form-select" formControlName="subject">
              <option value="" disabled>Selecciona un asunto</option>
              <option value="Consulta sobre mi pedido">Consulta sobre mi pedido</option>
              <option value="Devolución o cambio">Devolución o cambio</option>
              <option value="Consulta sobre un producto">Consulta sobre un producto</option>
              <option value="Otros">Otros</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="form-label">Mensaje*</label>
            <textarea class="form-control" rows="5" formControlName="message"></textarea>
          </div>

          <div class="form-check mb-4">
            <input class="form-check-input" type="checkbox" id="checktext">
            <label class="form-check-label" for="checktext">
              Deseo recibir ofertas y novedades de ATHLETIX SPORT por correo electrónico
            </label>
          </div>

          <div class="d-grid">
            <button type="submit" class="btn btn-enviar" [disabled]="form.invalid || loading">ENVIAR MENSAJE</button>
          </div>
        </form>

        <div class="contact-info">
          <h3 class="h5 mb-3">También puedes contactarnos por:</h3>
          <p><strong>Teléfono:</strong> (01) 123-4567</p>
          <p><strong>Email:</strong> contacto&#64;athletixsport.com</p>
          <p><strong>Horario de atención:</strong> Lunes a Viernes de 10:00 am a 6:00 pm</p>
          <p><strong>Dirección:</strong> Av. Sideral Carrion 777, Lima, Perú</p>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {
  loading = false;
  sent = false;
  error = '';
  form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.maxLength(1800)]]
  });

  constructor(private fb: FormBuilder, private contact: ContactService) {}

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.error = '';
    const value = this.form.getRawValue();
    this.contact.send({
      fullName: value.fullName,
      email: value.email,
      subject: value.subject,
      message: value.phone ? `${value.message}\n\nTeléfono: ${value.phone}` : value.message
    }).subscribe({
      next: () => {
        this.sent = true;
        this.loading = false;
        this.form.reset();
      },
      error: (err) => {
        this.error = err.error?.message ?? 'No se pudo enviar el mensaje';
        this.loading = false;
      }
    });
  }
}
