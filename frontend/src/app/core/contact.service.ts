import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';
import { ContactMessage, DashboardStats } from './models';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}

  send(payload: { fullName: string; email: string; subject: string; message: string }): Observable<ContactMessage> {
    return this.http.post<ContactMessage>(`${API_URL}/contact`, payload);
  }

  stats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${API_URL}/admin/stats`);
  }

  messages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(`${API_URL}/admin/messages`);
  }
}
