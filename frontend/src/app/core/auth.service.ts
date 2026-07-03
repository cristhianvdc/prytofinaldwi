import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { API_URL } from './api.config';
import { AuthResponse, Role } from './models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'athletix_session';
  private readonly session = signal<AuthResponse | null>(this.loadSession());
  readonly currentUser = computed(() => this.session());
  readonly isLoggedIn = computed(() => !!this.session()?.token);

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/login`, payload).pipe(tap((session) => this.save(session)));
  }

  register(payload: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    city?: string;
    district?: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/register`, payload).pipe(tap((session) => this.save(session)));
  }

  hasRole(role: Role): boolean {
    return this.session()?.role === role;
  }

  token(): string | null {
    return this.session()?.token ?? null;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.session.set(null);
    this.router.navigateByUrl('/login');
  }

  private save(session: AuthResponse): void {
    localStorage.setItem(this.storageKey, JSON.stringify(session));
    this.session.set(session);
  }

  private loadSession(): AuthResponse | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as AuthResponse;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }
}
