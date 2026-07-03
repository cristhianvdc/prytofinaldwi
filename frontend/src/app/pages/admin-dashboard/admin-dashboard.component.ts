import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../core/contact.service';
import { DashboardStats, Order, ContactMessage } from '../../core/models';
import { OrderService } from '../../core/order.service';
import { AdminShellComponent } from '../../shared/layout/admin-shell.component';

@Component({
  standalone: true,
  imports: [RouterLink, DatePipe, AdminShellComponent],
  template: `
    <app-admin-shell title="Panel de control">
      <div class="admin-metrics">
        @for (card of cards(); track card.label) {
          <div class="admin-metric-card">
            <div>
              <span>{{ card.label }}</span>
              <strong>{{ card.value }}</strong>
              <small [class.negative]="card.negative">{{ card.delta }}</small>
            </div>
            <i [class]="card.icon"></i>
          </div>
        }
      </div>

      <div class="admin-grid dashboard-grid">
        <section class="admin-card">
          <div class="admin-card-head">
            <div>
              <h2>Pedidos</h2>
              <span>{{ orders.length }} realizados este mes</span>
            </div>
            <i class="bi bi-three-dots-vertical"></i>
          </div>
          <div class="admin-table">
            <div class="admin-table-head">
              <span>Cliente</span>
              <span>Fecha</span>
              <span>Importe</span>
              <span>Estado</span>
            </div>
            @for (order of orders.slice(0, 8); track order.id) {
              <div class="admin-table-row">
                <strong>{{ order.customerName || 'Cliente' }}</strong>
                <span>{{ order.createdAt | date:'shortDate' }}</span>
                <span>S/ {{ order.total }}</span>
                <span class="progress-status">{{ statusLabel(order.status) }}</span>
              </div>
            } @empty {
              <div class="admin-empty">Aún no hay pedidos.</div>
            }
          </div>
        </section>

        <section class="admin-card">
          <div class="admin-card-head">
            <div>
              <h2>Estado de inventario</h2>
              <span>{{ stats?.lowStock ?? 0 }} productos bajo umbral</span>
            </div>
          </div>
          <div class="admin-status-list">
            <div class="admin-status-item delivered">
              <i class="bi bi-check-circle-fill"></i>
              <div>
                <strong>Productos activos</strong>
                <span>{{ stats?.products ?? 0 }}</span>
              </div>
            </div>
            <div class="admin-status-item warning">
              <i class="bi bi-exclamation-triangle-fill"></i>
              <div>
                <strong>Bajo stock</strong>
                <span>{{ stats?.lowStock ?? 0 }}</span>
              </div>
            </div>
            <div class="admin-status-item messages">
              <i class="bi bi-chat-dots-fill"></i>
              <div>
                <strong>Mensajes pendientes</strong>
                <span>{{ stats?.messages ?? 0 }}</span>
              </div>
            </div>
            <a routerLink="/admin/productos" class="btn btn-dark mt-3">
              <i class="bi bi-box-seam"></i> Gestionar productos
            </a>
          </div>
        </section>

        <section class="admin-card messages-panel">
          <div class="admin-card-head">
            <div>
              <h2>Mensajes recientes</h2>
              <span>Formulario de contacto</span>
            </div>
          </div>
          @for (message of messages; track message.id) {
            <article class="admin-message">
              <strong>{{ message.subject }}</strong>
              <p>{{ message.fullName }} · {{ message.email }}</p>
            </article>
          } @empty {
            <div class="admin-empty">Sin mensajes.</div>
          }
        </section>
      </div>
    </app-admin-shell>
  `
})
export class AdminDashboardComponent implements OnInit {
  stats?: DashboardStats;
  orders: Order[] = [];
  messages: ContactMessage[] = [];

  constructor(private contact: ContactService, private ordersService: OrderService) {}

  ngOnInit(): void {
    this.contact.stats().subscribe((stats) => this.stats = stats);
    this.ordersService.all().subscribe((orders) => this.orders = orders);
    this.contact.messages().subscribe((messages) => this.messages = messages);
  }

  cards() {
    const stats = this.stats;
    return [
      { label: 'Ventas del mes', value: `S/ ${stats?.revenue ?? 0}`, delta: '+15%', icon: 'bi bi-currency-dollar', negative: false },
      { label: 'Pedidos', value: stats?.orders ?? 0, delta: '+3%', icon: 'bi bi-receipt-cutoff', negative: false },
      { label: 'Productos', value: stats?.products ?? 0, delta: 'activos', icon: 'bi bi-box-seam', negative: false },
      { label: 'Bajo stock', value: stats?.lowStock ?? 0, delta: 'revisar', icon: 'bi bi-exclamation-triangle', negative: true }
    ];
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
