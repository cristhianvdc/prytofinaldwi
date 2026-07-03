import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Order } from '../../core/models';
import { OrderService } from '../../core/order.service';
import { AdminShellComponent } from '../../shared/layout/admin-shell.component';

@Component({
  standalone: true,
  imports: [AdminShellComponent, DatePipe, FormsModule],
  template: `
    <app-admin-shell title="Pedidos">
      <section class="admin-card">
        <div class="admin-card-head">
          <div>
            <span>Gestión de pedidos</span>
            <h2>{{ orders.length }} pedidos registrados</h2>
          </div>
        </div>

        <div class="orders-admin-list">
          @for (order of orders; track order.id) {
            <article class="order-admin-card">
              <div>
                <strong>Pedido #{{ order.id }}</strong>
                <p>{{ order.customerName }} · {{ order.customerEmail }}</p>
                <small>{{ order.createdAt | date:'short' }}</small>
              </div>
              <div>
                <span class="admin-kicker">Entrega</span>
                <p class="order-address">{{ order.shippingAddress }}</p>
              </div>
              <div>
                <span class="admin-kicker">Total</span>
                <strong>S/ {{ order.total }}</strong>
              </div>
              <div>
                <label class="form-label">Estado</label>
                <div class="order-status-actions">
                  <select
                    class="form-select"
                    [ngModel]="draftStatuses[order.id]"
                    (ngModelChange)="setDraftStatus(order.id, $event)">
                    <option value="IN_REVIEW">En revisión</option>
                    <option value="CONFIRMED">Confirmado</option>
                    <option value="SHIPPED">Enviado</option>
                    <option value="DELIVERED">Entregado</option>
                    <option value="CANCELLED">Cancelado</option>
                  </select>
                  <button
                    class="btn btn-primary btn-sm"
                    type="button"
                    [disabled]="saving[order.id] || !hasStatusChanged(order)"
                    (click)="saveStatus(order)">
                    {{ saving[order.id] ? 'Guardando...' : 'Guardar cambios' }}
                  </button>
                </div>
                @if (saved[order.id]) {
                  <small class="order-status-feedback success">Estado actualizado.</small>
                }
                @if (errors[order.id]) {
                  <small class="order-status-feedback error">{{ errors[order.id] }}</small>
                }
              </div>
            </article>
          } @empty {
            <div class="admin-empty">Aún no hay pedidos.</div>
          }
        </div>
      </section>
    </app-admin-shell>
  `
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  draftStatuses: Record<number, string> = {};
  saving: Record<number, boolean> = {};
  saved: Record<number, boolean> = {};
  errors: Record<number, string> = {};

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.orderService.all().subscribe((orders) => {
      this.orders = orders;
      orders.forEach((order) => {
        this.draftStatuses[order.id] = this.normalizedStatus(order.status);
      });
    });
  }

  setDraftStatus(orderId: number, status: string): void {
    this.draftStatuses[orderId] = status;
    this.saved[orderId] = false;
    this.errors[orderId] = '';
  }

  saveStatus(order: Order): void {
    const status = this.draftStatuses[order.id];
    if (!status || !this.hasStatusChanged(order)) {
      return;
    }

    this.saving[order.id] = true;
    this.saved[order.id] = false;
    this.errors[order.id] = '';

    this.orderService.updateStatus(order.id, status).subscribe({
      next: (updated) => {
        this.orders = this.orders.map((item) => item.id === updated.id ? updated : item);
        this.draftStatuses[updated.id] = this.normalizedStatus(updated.status);
        this.saved[updated.id] = true;
        this.saving[updated.id] = false;
      },
      error: (error) => {
        this.errors[order.id] = error?.error?.message || 'No se pudo guardar el estado.';
        this.saving[order.id] = false;
      }
    });
  }

  hasStatusChanged(order: Order): boolean {
    return this.draftStatuses[order.id] !== this.normalizedStatus(order.status);
  }

  normalizedStatus(status: string): string {
    return status === 'CREATED' ? 'IN_REVIEW' : status;
  }
}
