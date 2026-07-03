import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';
import { UserProfile } from './models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  profile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${API_URL}/me`);
  }

  update(profile: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${API_URL}/me`, profile);
  }

  changePassword(payload: { currentPassword: string; newPassword: string }): Observable<void> {
    return this.http.put<void>(`${API_URL}/me/password`, payload);
  }
}
